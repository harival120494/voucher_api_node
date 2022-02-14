import express from 'express';
import {
    check_customer,
    upload_photo
} from '../controllers/TransactionController.js'
const Transaction = express.Router();

Transaction.get('/check-customer/:id', check_customer);
Transaction.post('/upload_photo/:id', upload_photo);

export default Transaction;