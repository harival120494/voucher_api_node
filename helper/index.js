import Voucher from "../models/VoucherModel.js";
import Purchase from "../models/PurchaseModel.js";
import { Sequelize } from 'sequelize';



export const check_transaction = async(id) => {
    const options = {
        attributes : [
            [Sequelize.fn("COUNT", Sequelize.col("customer_id")), "transaction_complete"],
            [Sequelize.fn("SUM", Sequelize.col("total_spent")), "total_transaction"],
            [Sequelize.literal(`CASE WHEN( COUNT(customer_id) >= 3  AND SUM(total_spent) >= 100) THEN 'Eligible' ELSE 'Not Eligible' END`), 'eligible_status']
        ],
        where : {
            customer_id : id,
            transaction_at :{ [Sequelize.Op.gte] : Sequelize.literal(`DATE_SUB(CURDATE(), INTERVAL 30 DAY)`)}
        },
        raw : true,
        group : ['customer_id'],
    }
    return await Purchase.findOne(options).then((result) => {return result})
}

export const checkVoucherQuota = async() => {
    const options = {
        attributes : {
            include: [[Sequelize.fn("COUNT", Sequelize.col("id")), "num_quota"]] 
        },
        where : {status : { [Sequelize.Op.ne]: 'Claimed' }},
        raw : true
    }
    return Voucher.findOne(options).then((result) => {return result})
}

export const timeRangeUpload = async(id) => {
    const options = {
        attributes : ["*"],
        where : {
            customer_id : id,
            created_at :{ [Sequelize.Op.gte] : Sequelize.literal(`NOW() - INTERVAL 10 MINUTE`)}
        },
        raw : true,
        group : ['customer_id'],
    }
    return await Voucher.findAll(options).then((result) => {return result})
}