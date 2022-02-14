import { Sequelize } from 'sequelize';
import conn from '../config/db.js';

const sequelize = new Sequelize('sqlite::memory:');
const { DataTypes } = Sequelize;

const Purchase = conn.define('purchase_transaction', {
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
    total_spent : {
        type : DataTypes.DECIMAL(10, 2),
        allowNull : false
    },
    total_saving : {
        type : DataTypes.DECIMAL(10, 2),
        allowNull : false
    }, 
    transaction_at : {
        type : DataTypes.DATE,
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

Purchase.removeAttribute('id');
export default Purchase;