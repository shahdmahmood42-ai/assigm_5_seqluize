import  { Sequelize } from 'sequelize';
 export const sequelize = new Sequelize('assign_5', 'root', '', {
  port:"3306",
  host: '127.0.0.1',
  dialect: 'mysql'
});


  export const connectionDB = async ()=>{
  try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}

 export const asyncDB = async ()=>{
  try {
  await sequelize.async();
  console.log('async has been established successfully.');
} catch (error) {
  console.error('Unable to async to the database:', error);
}
}