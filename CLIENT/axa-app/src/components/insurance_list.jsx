import { useEffect , useState } from "react";

function InsurancesList() {
    const user = JSON.parse(localStorage.getItem('user'));

    const [ insurances , setInsurances ] = useState([]) ;

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

    return (
        <section className="insurances-list-container">
            <h2>Your Insurances</h2>
            {
                insurances.filter( insurance => insurance.status === 'active' ).length > 0 ?
                insurances.filter( insurance => insurance.status === 'active' ).map( insurance => (
                    <div key={insurance._id} className="insurance-data-container">
                        <label htmlFor="insurance-PolicyNumber">Policy Number:</label>
                        <h6>{insurance.policyNumber}</h6>
                        
                        <label htmlFor="insurance-OwnerName">Owner Name:</label>
                        <h6>{insurance.ownerName}</h6>
                        
                        <label htmlFor="insurance-Price">Price:</label>
                        <h6>{insurance.price}</h6>

                        <label htmlFor="insurance-endDate">End Date:</label>
                        <h6>{new Date(insurance.expirationDate).toLocaleDateString()}</h6>
                    </div>
                ))
                : <p> No Insurance is Active </p>
            }
        </section>
    );
}

export default InsurancesList;
