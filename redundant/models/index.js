const Sequelize = require("sequelize");

//Pete TODO I don't think this is needed

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
  }
);

// const models = {
//   User: sequelize.import('./user'),
//   Message: sequelize.import('./message'),
// };

// Object.keys(models).forEach(key => {
//   if ('associate' in models[key]) {
//     models[key].associate(models);
//   }
// });

// export { sequelize };

// export default models;
