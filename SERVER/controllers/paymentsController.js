const Payments = require('../models/paymentsModel');

const createPayments = async (req, res) => {
    const {
        clientId,
        insuranceId,
        amount,
        paymentMethod,
        cardDetails
    } = req.body;

    if (!clientId || !insuranceId || !amount || !paymentMethod) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }
    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({
            message: "Amount must be a positive number"
        });
    }

    const allowedPaymentMethods = ['masterCard', 'paypal', 'visa', 'cash'];
    if (!allowedPaymentMethods.includes(paymentMethod)) {
        return res.status(400).json({
            message: "Invalid payment method"
        });
    }

    try {
        const existingPayment = await Payments.findOne({ clientId, insuranceId });
        if (existingPayment) {
            return res.status(409).json({
                message: "Payment already exists"
            });
        }

        const newPayment = new Payments({
            clientId,
            insuranceId,
            amount,
            paymentMethod,
            cardDetails 
        });

        await newPayment.save();

        res.status(201).json(newPayment);
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({
            message: "Internal Server Error: " + error.message
        });
    }
};

module.exports = { createPayment: createPayments };
