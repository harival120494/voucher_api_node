import { Sequelize } from 'sequelize';
import conn from '../config/db.js';

const sequelize = new Sequelize('sqlite::memory:');
const { DataTypes } = Sequelize;

const Voucher = conn.define('vouchers', {
    id : {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    customer_id : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    status : {
        type : DataTypes.STRING,
        allowNull : false
    },
    voucher_code : {
        type : DataTypes.STRING,
        allowNull : false
    }, 
    created_at : {
        type : DataTypes.DATE,
        allowNull : true
    },
    updated_at : {
        type : DataTypes.DATE,
        allowNull : true
    }
}, {
    freezeTableName : true,
    timestamps: false
});

Voucher.removeAttribute('id');
export default Voucher;