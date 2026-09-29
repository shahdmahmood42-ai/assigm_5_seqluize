import userModel from "../../DB/models/user.model.js";
export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await userModel.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const user = userModel.build({ name, email, password, role });
    await user.save(); 

    return res.status(201).json({ message: "User added successfully." });
  } catch (err) {
    
    const errors = err.errors ? err.errors.map((e) => e.message) : [err.message];
    return res.status(400).json({ message: "Validation error", errors });
  }
};

export const upsertUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.upsert({ id, ...req.body }, { validate: false });

    return res
      .status(200)
      .json({ message: "User created or updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await userModel.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "no user found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByPk(id, {
      attributes: { exclude: ["role", "password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "no user found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};