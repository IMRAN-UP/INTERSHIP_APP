// controllers/insuranceController.js

const Insurance = require('../models/insuranceModel');

const createInsurance = async (req, res) => {
    const {
        policyNumber,
        clientId,
        ownerName,
        vehicleId,
        fire,
        theft,
        glass,
        roadsideAssistance,
        price,
        usageType,
        liability,
        collision,
        comprehensive,
        personalInjury,
        status,
        uninsuredMotorist,
        duration,
    } = req.body;

    if (
        !clientId ||
        !ownerName ||
        !vehicleId ||
        !status ||
        price === undefined || 
        !duration ||
        !usageType
    ) {
        return res.status(400).json({
            message: "Client ID, owner name, vehicle ID, price, and usage type are required."
        });
    }
    if (
        fire === undefined ||
        theft === undefined ||
        glass === undefined ||
        roadsideAssistance === undefined ||
        liability === undefined ||
        collision === undefined ||
        comprehensive === undefined ||
        personalInjury === undefined ||
        uninsuredMotorist === undefined
    ) {
        return res.status(400).json({
            message: "Boolean fields (fire, theft, glass, roadsideAssistance, liability, collision, comprehensive, personalInjury, uninsuredMotorist) are required."
        });
    }

    try {
        const existingInsurance = await Insurance.findOne({
            clientId,
            vehicleId,
            status,
        });

        if (existingInsurance) {
            return res.status(409).json({
                message: "Insurance already exists"
            });
        }

        const newInsurance = new Insurance({
            policyNumber,
            clientId,
            ownerName,
            vehicleId,
            fire,
            theft,
            glass,
            roadsideAssistance,
            price,
            usageType,
            liability,
            collision,
            comprehensive,
            personalInjury,
            uninsuredMotorist,
            status,
            duration,
        });

        await newInsurance.save();
        res.status(201).json(newInsurance);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const findInsurance = async (req, res) => {
    const { clientId } = req.body;

    try {
        const Insurances = await Insurance.find({ clientId });

        if (!Insurances || Insurances.length === 0) {
            return res.status(404).json({ message: "Insurance not found" });
        }

        res.status(200).json({ Insurances });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const findOneInsurance = async (req, res) => {
    const { clientId, vehicleId } = req.body;

    if (!clientId || !vehicleId) {
        return res.status(400).json({ message: "clientId and vehicleId are required" });
    }
    try {
        const insurance = await Insurance.findOne({ clientId, vehicleId });
        if (!insurance) {
            return res.status(404).json({ message: "Insurance not found" });
        }
        res.status(200).json(insurance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const handleDialogflowRequest = async (req, res) => {
    const intentName = req.body.queryResult.intent.displayName;

    if (intentName === 'GetInsurancePlan') {
        try {
            const insurancePlans = await Insurance.find({});
            const responseText = insurancePlans.map(plan => 
                `Policy Number: ${plan.policyNumber}, Price: $${plan.price}`).join('\n');

            return res.json({
                fulfillmentText: `Here are the available insurance plans:\n${responseText}`,
            });
        } catch (error) {
            console.error('Error fetching insurance plans:', error);
            return res.json({
                fulfillmentText: 'Sorry, I couldn’t fetch the insurance plans at the moment.',
            });
        }
    }

    return res.json({
        fulfillmentText: 'I didn’t understand that. Can you repeat?',
    });
};

module.exports = { createInsurance, findInsurance, findOneInsurance, handleDialogflowRequest };
