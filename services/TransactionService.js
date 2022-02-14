import VoucherModel from '../models/VoucherModel.js'
import { checkVoucherQuota, check_transaction, timeRangeUpload } from '../helper/index.js'
import moment from 'moment'

export const check_customer_service = async(id) => {
    const check = await check_transaction(id)
    if(check.eligible_status == 'Eligible')
    {
        const check_quota = await checkVoucherQuota();
        if(check_quota.num_quota < 1000){           //check if quota has been exceeded
            // Check if the user is claimed voucher
            const check_user = await VoucherModel.findAll({where : {customer_id : id}, raw : true}).then((result) => {return result})
            if(check_user.length == 0){
                return await VoucherModel.create(
                    {
                    customer_id : id,
                    status : 'Booked',
                    voucher_code : (Math.random() + 1).toString(36).substring(2,12),
                    created_at : moment().format('YYYY-MM-DD HH:mm:ss'),
                    updated_at : moment().format('YYYY-MM-DD HH:mm:ss')
                }
                )
                .then((result) => {
                    return ({message:"You get one voucher, Please upload your selfie photo within 10 minutes."})
                })
            }
            else{
                return ({message:"you have one voucher booked."})
            }
        }
        else {
            return ({message:"Oops.. The quota is full"})
        }
    }
    else{
        return ({message:"Your transaction not eligible."})
    }
}

export const upload_photo_service = async (id) => {
    const timeRange = await timeRangeUpload(id)
    if(timeRange.length == 1){
        const voucher = VoucherModel.update({status : 'Claimed'},{where : {customer_id: id}})
        const voucher_code = VoucherModel.findOne({where : {customer_id : id}, raw : true}).then((result) => {return result})
        return ({message:"Your voucher is claimed successfully", voucher_code : voucher_code.voucher_code})
    }
    else{
        const release = VoucherModel.destroy({where : {customer_id : id}})
        return ({message:"you have passed the time limit"})
    }
    return timeRange;
}