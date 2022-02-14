INSTALLATION INSTRUCTION
# ==========================

1. Clone the project into your computer
2. Create database and named it with "aichat"
3. Recommendation "Please Clone and Running Laravel Project First"
4. Run command "npm install"
5. Run command "npm start"


API Documentation
===========================
1. Check the customer eligible to get the voucher
    URL : http://127.0.0.1:1337/transaction/check-customer/2
    Method : GET
    Params : customer_id
    
    If the customer eligible
    ===========================
    Response : 
    {
        "message": "You get one voucher, Please upload your selfie photo within 10 minutes."
    }

    If the customer not eligible
    ===========================
    Response : 
    {
        "message": "Your transaction not eligible."
    }

    If the customer eligible but the quota is full
    ===========================
    Response : 
    {
        "message": "Oops.. The quota is full"
    }

2. Upload photo and get voucher code
    URL : http://127.0.0.1:1337/transaction/upload_photo/2
    Method : POST
    Headers Params : customer_id

    If the customer upload selfie photo within 10 minutes
    ===========================
    Response : 
    {
        "message": "Your voucher is claimed successfully",
        "Voucher Code": "PjkJW1QDHi"
    }

    If the customer upload selfie photo over 10 minutes
    ===========================
    Response : 
    {
        "message": "you have passed the time limit"
    }
