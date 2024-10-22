import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { car_icon, bicykle_icon, down_icon, up_icon, tractors_icon, truck_icon } from "../assets/icons";

function Vehicle({ UserId, handleAddVehicle, updateVehicle }) {
    const [Vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();
    const vehicleTypes = {
        car: car_icon,
        bicycle: bicykle_icon,
        tractor: tractors_icon,
        truck : truck_icon
    };
    const [openDropdowns, setOpenDropdowns] = useState({});

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        getVehicles();
    }, []);

    const getVehicles = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/vehicle/findVehicle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ clientId: user._id }),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch vehicles');
            }

            const vehicleRes = await response.json();
            setVehicles(vehicleRes.vehicles);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const deleteVehicle = async (id) => {
        try {
            const response = await fetch('http://localhost:5000/api/vehicle/deleteVehicle/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to delete vehicle');
            }

            window.location.reload();

        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleDropdown = (index) => {
        setOpenDropdowns(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };


    const navigateToInsurance = ( vehicleId , vehicleType ) => {
        navigate(`/insurance`, { state: { vehicleId , vehicleType} });
    };

    return (
        <section className="vehicles-list-container">
            <div className="vehicles-list-definition">
                <button onClick={handleAddVehicle}>Add Vehicle</button>
                <label htmlFor="">Vehicle List</label>
            </div>

            {Vehicles.length === 0 ? (
                <div className="no-vehicles-container">
                    <p>No vehicles found</p>
                </div>
            ) : (
                Vehicles.map((vehicle, index) => (
                    <div className="vehicle-data-container" key={index}>
                        <div className="vehicle-definition-container">
                            <img src={vehicleTypes[vehicle.type]} alt="" />
                            <div>
                                <label htmlFor="vehicle-type">Vehicle Type</label>
                                <h4>{vehicle.type}</h4>
                            </div>
                            <div>
                                <button onClick={() => handleDropdown(index)}>
                                    <img src={openDropdowns[index] ? up_icon : down_icon} alt="" />
                                </button>
                                <button
                                    onClick={() =>
                                        vehicle.assured
                                            ? null
                                            : navigateToInsurance(vehicle._id , vehicle.type ) 
                                    }
                                    style={{
                                        background: vehicle.assured ? 'green' : '',
                                        color: vehicle.assured ? 'white' : '',
                                    }}
                                >
                                    {vehicle.assured ? 'Assured' : 'Not Assured'}
                                </button>
                                <button>Details</button>
                            </div>
                        </div>
                        {openDropdowns[index] && (
                            <div className="dropdown-vehicle-data-container">
                                <label htmlFor="vehicle-name">Vehicle Name</label>
                                <h6>{vehicle.name ? vehicle.name : 'undefined'}</h6>
                                <label htmlFor="vehicle-owner">Owner Name</label>
                                <h6>{vehicle.ownerName}</h6>
                                <label htmlFor="vehicle-color">Vehicle Color</label>
                                <span
                                    style={{
                                        width: '25px',
                                        aspectRatio: '1/1',
                                        background: vehicle.color,
                                    }}
                                ></span>
                                <label htmlFor="vehicle-license">Vehicle License</label>
                                <h6>{vehicle.licensePlate}</h6>
                                <label htmlFor="vehicle-model">Vehicle Model</label>
                                <h6>{vehicle.model ? vehicle.model : 'undefined'}</h6>
                                <label htmlFor="vehicle-year">Vehicle Invented Year</label>
                                <h6>{vehicle.year ? vehicle.year : 'undefined'}</h6>
                                <label htmlFor="vehicle-seats">Vehicle Seats</label>
                                <h6>{vehicle.seats ? vehicle.seats : 'undefined'}</h6>
                                <label htmlFor="vehicle-fuel-type">Vehicle Fuel</label>
                                <h6>{vehicle.fuelType ? vehicle.fuelType : 'undefined'}</h6>
                                <div>
                                    <button onClick={() => deleteVehicle(vehicle._id)}>Remove</button>
                                    <button onClick={() => updateVehicle(vehicle)}>Edit</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}
        </section>
    );
}

export default Vehicle;
