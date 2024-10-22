import { Nav_bar, Insurance_container, Insurance_form, Error, Success } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function insurance() {
    const location = useLocation();
    const { vehicleId, vehicleType } = location.state || {};
    const [insurance, setInsurance] = useState({});
    if ( insurance ) {
        console.log(insurance) ;
    }
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [existedInsurance, setExistedInsurance] = useState(false);

    const handleError = () => {
        setError(true);
        setTimeout(() => {
            setError(false);
        }, 10000);
    };

    const handleSuccess = () => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 10000);
    }

    return (
        <section className="insurance-page-container">
            {
                error && <Error message={existedInsurance ? 'this Vehicle have an active insurance' : 'Please enter the duration and the usage'} />
            }
            {
                success && <Success message={'Your insurance submitted successfully'} />
            }
            <Nav_bar situation={true} />
            {
                ( vehicleId || insurance._id ) ?
                    <Insurance_form
                        vehicleId={vehicleId}
                        vehicleType={vehicleType}
                        handleError={handleError}
                        handleSuccess={handleSuccess}
                        handleExistedInsurance={() => setExistedInsurance(!existedInsurance)}
                        insuranceData={insurance} 
                    />
                    :
                    <Insurance_container handleInsurance={setInsurance}/>
            }

        </section>
    )
}

export default insurance;
