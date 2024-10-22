import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Nav_bar  , Vehicle_container , Vehicle_form , Success , Error } from "../components";

function vehicle() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [ addVehicle , setAddVehicle ] = useState(false);
  const [ addVehicleSuccess  , setAddVehicleSuccess ] = useState(false);
  const [ addVehicleError  , setAddVehicleError ] = useState(false);
  const [ isUpdateVehicle , setIsUpdateVehicle ] = useState(false);

  const handleIsVehicle = () => {
    setAddVehicle(!addVehicle);
  }

  useEffect( () => {
    if (!user) {
      navigate('/register&login');
    } 
  } , []) ;

  const handleAddVehicleSuccess = () => {
    setAddVehicleSuccess(true);
    setTimeout(() => {
      setAddVehicleSuccess(false);
    }, 5000);
  }

  const handleAddVehicleError = () => {
    setAddVehicleError(true);
    setTimeout(() => {
      setAddVehicleError(false);
    }, 5000);
  }

  const handleUpdateVehicle = (vehicle) => {
    localStorage.setItem( 'vehicle', JSON.stringify(vehicle)  );
    setIsUpdateVehicle(!isUpdateVehicle);
    handleIsVehicle();
  }



  return (
    <div className="vehicle-page-container">
      <Nav_bar situation={true} />
      { addVehicleSuccess && <Success message={ !isUpdateVehicle ? 'Vehicle Added Succefuly' : 'Vehicle Updated Succefuly'}/> }
      { addVehicleSuccess && <Error message={ !isUpdateVehicle ?  'Failed to Add Vehicle' : 'Failed to Update Vehicle'}/> }
      { !addVehicle && <Vehicle_container handleAddVehicle={handleIsVehicle} updateVehicle={handleUpdateVehicle}  />}

      { addVehicle && <Vehicle_form handleCancelAddVehicle={handleIsVehicle} addVehicleSuccess={handleAddVehicleSuccess} addVehicleError={handleAddVehicleError} isUpdateVehicle={isUpdateVehicle} />}
    </div>
  );
}

export default vehicle;
