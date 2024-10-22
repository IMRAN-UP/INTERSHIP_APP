import { close_icon } from "../assets/icons"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Vehicle from "./vehicle_container";
function insurance_card({ handleCard, phoneWidth, handleInsurance }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [insurances, setInsurances] = useState([]);
  useEffect(() => {
    getInsurances();
  }, []);

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
      setInsurances(data.Insurances);

    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  const handlePayment = (insurance) => {
    handleInsurance(insurance);
  };



  return (
    <section className="insurance-card-container">
      <h2>Insurance Card</h2>
      {
        window.innerWidth < 900 ?
          <button onClick={handleCard} className="close-btn">
            <img src={close_icon} alt="" />
          </button>
          :
          ''
      }
      {
        insurances.filter(insurance => insurance.status === 'in card').length > 0 ?
          insurances.filter(insurance => insurance.status === 'in card').map(insurance => (
            <div key={insurance._id} className="insurance-data-container">
              <label htmlFor="insurance-PolicyNumber">Policy Number:</label>
              <h6>{insurance.policyNumber}</h6>

              <label htmlFor="insurance-OwnerName">Owner Name:</label>
              <h6>{insurance.ownerName}</h6>

              <label htmlFor="insurance-Price">Price:</label>
              <h6>{insurance.price}</h6>

              <label htmlFor="insurance-endDate">End Date:</label>
              <h6>{new Date(insurance.expirationDate).toLocaleDateString()}</h6>
              <div className="btn-container">
                <button onClick={() => handlePayment(insurance)} >Pay Now</button>
                <button>Details</button>
              </div>
            </div>
          ))
          : <p>No Insurances in Card </p>
      }

    </section>
  )
}

export default insurance_card
