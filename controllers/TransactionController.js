import { check_customer_service, upload_photo_service } from "../services/TransactionService.js"

export const check_customer = async (req, res) => {
    return res.status(200).json(await check_customer_service(req.params.id))
}

export const upload_photo = async (req, res) => {
    return res.status(200).json(await upload_photo_service(req.params.id))
}