const Vehicle = require('../models/vehicleModel');

const createVehicle = async (req, res) => {
    const {
        clientId,
        ownerName ,
        type,
        name,
        color,
        model,
        year,
        licensePlate,
        seats,
        fuelType ,
        assured,
    } = req.body;

    if (
        !clientId ||
        !ownerName ||
        !type ||
        !name ||
        !color ||
        !model ||
        !year ||
        !licensePlate ||
        !seats ||
        !fuelType
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {
        const existingVehicle = await Vehicle.findOne({
            $or: [{ licensePlate }]
        });

        if ( existingVehicle ) {
            return res.status(404).json({
                message: "Vehicle already exists"
            });
        }

        const newVehicle = new Vehicle({
            clientId,
            ownerName,
            type,
            name,
            color,
            model,
            year,
            licensePlate,
            seats,
            fuelType,
            assured
        });

        await newVehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }

};


const findVehicle = async ( req , res ) => {
    const { clientId , licensePlate } = req.body ;

    try {
        const vehicles = await Vehicle.find({ clientId });

        if (!vehicles) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        res.status(200).json({ message: "Vehicle found" , vehicles });
    }catch ( error ) {
        res.status(500).json({ message: error.message });
    }
} ;

const updateVehicle = async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    // Check if at least one field is provided
    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({
            message: "At least one field is required to update"
        });
    }

    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            id,
            updateFields,
            { new: true, runValidators: true } // Ensure validation runs for updated fields
        );

        if (!updatedVehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


const deleteVehicle = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedVehicle = await Vehicle.findByIdAndDelete(id);

        if (!deletedVehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        res.status(200).json({ message: "Vehicle deleted successfully" });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};



module.exports = { createVehicle , findVehicle , updateVehicle , deleteVehicle } ;