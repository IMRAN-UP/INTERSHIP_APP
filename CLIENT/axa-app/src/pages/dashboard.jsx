import { useNavigate } from "react-router-dom";
import { Nav_bar } from "../components";
import { user_3d_icon } from "../assets/icons";
import { useState, useEffect } from "react";
import { car_icon, tractors_icon, bicykle_icon, truck_icon } from "../assets/icons";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [Vehicles, setVehicles] = useState([]);
    const [insurances, setInsurances] = useState([]);
    const [expiringInsurances, setExpiringInsurances] = useState([]);

    if (!user) {
        navigate('/register&login');
        return null;
    }

    const navigateTo = (e) => {
        e.preventDefault();
        navigate(e.target.id);
    }


    useEffect(() => {
        getVehicles();
        getInsurances();
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

    const getInsurances = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/insurance/findInsurance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ clientId: user._id })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Sort by price and get top 3
            const sortedInsurances = data.Insurances.sort((a, b) => b.price - a.price).slice(0, 3);
            setInsurances(sortedInsurances);

            // Filter expiring insurances
            const currentDate = new Date();
            const expiring = data.Insurances.filter(insurance => {
                const expDate = new Date(insurance.expirationDate);
                return expDate.getMonth() === currentDate.getMonth() && expDate.getFullYear() === currentDate.getFullYear();
            });
            setExpiringInsurances(expiring);

        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const getVehicleIcon = (type) => {
        switch (type) {
            case 'car':
                return car_icon;
            case 'truck':
                return truck_icon;
            case 'bicycle':
                return bicykle_icon;
            case 'tractor':
                return tractors_icon;
            default:
                return car_icon; // Fallback icon if type doesn't match
        }
    };



    return (
        <section className="dashboard-container">
            <Nav_bar situation={true} />
            <section className="dashboard">

                <div className="lastVehicles-container">
                    {
                        Vehicles.length == 0 ?
                            <h1>No Vehicles</h1> :
                            <h1>Lastest Vehicles</h1>
                    }
                    {Vehicles.length > 0 && Vehicles.slice(0, 3).map((vehicle, index) => (
                        <div key={index} className="vehicle-data-container">
                            <img
                                src={getVehicleIcon(vehicle.type)}
                                alt={vehicle.type}
                                style={{ width: '50px', height: '50px' }}
                            />
                            <h2> {vehicle.licensePlate}  </h2>
                            <h3>{vehicle.model}</h3>
                            <div>
                                <h3>Color : </h3>
                                <span style={{
                                    width: '25px',
                                    aspectRatio: '1/1',
                                    background: vehicle.color,
                                }}></span>
                            </div>
                            <button id="/vehicle" onClick={navigateTo}>Details</button>
                        </div>
                    ))}

                </div>

                <div className="deteminated-insurance">
                    {
                        insurances.length == 0 ?
                            <h1>No Insurance Plans</h1> :
                            <h1>Last Insurance Plans</h1>
                    }
                    {
                        expiringInsurances.length > 0 && 
                        <div className="insurance-list">
                            {insurances.map((insurance, index) => (
                                <div key={index} className="insurance-item">
                                    <h3>{insurance.price}</h3>
                                </div>
                            ))}
                        </div>
                    }

                    {
                        insurances.length == 0 ?
                            '' :
                            <button id="/insurance" onClick={navigateTo}>Add Insurance Plan</button>
                    }
                </div>

                <div className="profil-container">
                    <img src={user_3d_icon} alt={user.first_name} style={{
                        width: '10%',
                        aspectRatio: '1/1',
                        borderRadius: '50%',
                        objectFit: 'cover'
                    }} />
                    <h2>{user.first_name} {user.last_name}</h2>
                    <p>{user.email}</p>
                    <button id="/" onClick={navigateTo}>Logout</button>
                    <button id="" onClick={navigateTo}>Profil</button>
                </div>

                <div className="notifications-container">
                    {
                        expiringInsurances.length == 0 ?
                            <h1>No Notifications</h1> :
                            <h1>Notifications</h1>
                    }
                    {
                        expiringInsurances.length > 0 &&
                        <div className="notifications-list">
                            {expiringInsurances.map((insurance, index) => (
                                <div key={index} className="notification-item">
                                    <h3>{insurance.make} {insurance.model}</h3>
                                </div>
                            ))}
                        </div>
                    }

                </div>

            </section>
        </section>
    );
}

export default Dashboard;
