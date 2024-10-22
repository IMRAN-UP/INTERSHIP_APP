import { useState } from "react";
import { useForm } from "react-hook-form";
import { car_icon, bicykle_icon, tractors_icon, truck_icon } from "../assets/icons";

function VehicleForm({ handleCancelAddVehicle, addVehicleSuccess, addVehicleError, isUpdateVehicle }) {
  const vehicle = JSON.parse(localStorage.getItem('vehicle'));
  const user = JSON.parse(localStorage.getItem('user'));
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedVehicleType, setSelectedVehicleType] = useState(isUpdateVehicle ? vehicle.type : '');
  const [selectedColor, setSelectedColor] = useState(isUpdateVehicle ? vehicle.color : '');
  const [selectedFuelType, setSelectedFuelType] = useState(isUpdateVehicle ? vehicle.fuelType : '');


  const onSubmit = async (data) => {
    const postData = {
      clientId: user._id,
      ownerName: user.first_name + ' ' + user.last_name,
      type: selectedVehicleType,
      name: data.vehicleName,
      color: selectedColor,
      model: data.model,
      year: data.year,
      licensePlate: data.licensePlate,
      seats: data.seats,
      fuelType: selectedFuelType,
      assured: data.assured || false,
    };

    try {

      const response = await fetch( isUpdateVehicle ? "http://localhost:5000/api/vehicle/updateVehicle/" + vehicle._id : "http://localhost:5000/api/vehicle/createVehicle"  , {
        method: isUpdateVehicle ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });


      if (!response.ok) {
        addVehicleError();
      }

      const result = await response.json();
      window.location.reload();
    } catch (error) {
      addVehicleError();
    }
  };

  return (
    <section className='add-vehicle-form-container'>
      <form onSubmit={handleSubmit(onSubmit)} className='vehicle-form'>
        <div className='vehicle-type-container'>
          {
            [{
              type: "car",
              icon: car_icon
            }, {
              type: "bicycle",
              icon: bicykle_icon
            },
            {
              type: "truck",
              icon: truck_icon
            }, {
              type: "tractor",
              icon: tractors_icon
            }].map((vehicleType, index) => (
              <div
                key={index}
                onClick={() => setSelectedVehicleType(vehicleType.type)}
                style={{ background: selectedVehicleType === vehicleType.type ? 'var(--font-color)' : '' }}
              >
                <img src={vehicleType.icon} alt={vehicleType} />
              </div>
            ))
          }
        </div>

        <div className="vehicle-form-fields">
          <input
            type="text"
            placeholder='Vehicle Name'
            {...register("vehicleName", { required: true })}
            className={errors.vehicleName ? 'input-error' : ''}
          />

          <input
            type="text"
            placeholder='License Plate Example: X11-XXX'
            {...register("licensePlate", { required: true })}
            className={errors.licensePlate ? 'input-error' : ''}
          />

          <input
            type="number"
            placeholder='Year'
            max={2024}
            min={2000}
            {...register("year", { required: true })}
            className={errors.year ? 'input-error' : ''}
          />

          <div className="vehicle-color-choices-container">
            <label>Color:<span style={{ color: selectedColor, marginLeft: '1rem' }}>{selectedColor} </span></label>
            <div>
              {["red", "blue", "green", "yellow", "black", "white", "grey", "gold", "silver", "brown", "orange", "pink", "purple", "tan", "midnightblue", "darkred"].map((color, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    backgroundColor: color,
                    border: selectedColor === color ? "2px solid var(--font-color)" : "none",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="fuel-type-container">
            <label>Fuel Type:</label>
            <div>
              {["gasoline", "diesel", "electric"].map((fuelType, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedFuelType(fuelType)}
                  style={{
                    backgroundColor: fuelType === selectedFuelType ? "var(--main-color)" : "var(--font-color)",
                  }}
                > {fuelType} </div>
              ))}
            </div>
          </div>

          <input
            type="text"
            placeholder="Vehicle Model"
            {...register("model", { required: true })}
            className={errors.model ? 'input-error' : ''}
          />

          <input
            type="number"
            placeholder="Seats"
            min={1}
            max={10}
            {...register("seats", { required: true })}
            className={errors.seats ? 'input-error' : ''}
          />
        </div>

        <div className="btn-container">
          <button type="submit"> {isUpdateVehicle ? 'Update Vehicle' : 'Add Vehicle'} </button>
          <button type="button" onClick={handleCancelAddVehicle}>Cancel</button>
        </div>
      </form>
    </section>
  );
}

export default VehicleForm;
