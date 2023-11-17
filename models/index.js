const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};
require("dotenv").config();

// Database trên vercel

const sequelize = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: process.env.POSTGRES_DIALECT ,
    operatorsAliases: false,
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
    pool: {
        max: parseInt(process.env.POOL_MAX),
        min: parseInt(process.env.POOL_MIN),
        acquire: parseInt(process.env.POOL_ACQUIRE),
        idle: parseInt(process.env.POOL_IDLE),
    },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Chỉ sử dụng trong môi trường phát triển hoặc kiểm tra, không nên sử dụng trong môi trường sản xuất.
        },
    },
});

// Database trên local

// const sequelize = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,
//     {
//         host: process.env.POSTGRES_HOST,
//         dialect: process.env.POSTGRES_DIALECT,
//         operatorsAliases: false,

//         pool: {
//             max: parseInt(process.env.POOL_MAX),
//             min: parseInt(process.env.POOL_MIN),
//             acquire: parseInt(process.env.POOL_ACQUIRE),
//             idle: parseInt(process.env.POOL_IDLE),
//         },
//     }
// );

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
