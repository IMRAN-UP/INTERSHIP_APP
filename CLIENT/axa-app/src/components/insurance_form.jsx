import { useNavigate, useLocation } from "react-router-dom";
import { close_icon } from "../assets/icons";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { animation_2, next_icon, prev_icon, chatbot_icon } from "../assets/icons";

function InsuranceForm({ vehicleId, vehicleType, handleError, handleSuccess, handleExistedInsurance, insuranceData }) {

    const { register, handleSubmit, setValue, getValues, reset, formState: { errors } } = useForm({
        mode: 'onChange'
    });

    const navigate = useNavigate();

    const [ chatbotText , setChatBotText ] = useState("");

    const Vehicle = JSON.parse(localStorage.getItem('vehicle'));

    const [selectedValues, setSelectedValues] = useState({
        clientId: JSON.parse(localStorage.getItem('user'))._id,
        ownerName: JSON.parse(localStorage.getItem('user')).first_name + ' ' + JSON.parse(localStorage.getItem('user')).last_name,
        vehicleId: vehicleId || insuranceData.vehicleId,
        fire: insuranceData.fire || false,
        theft: insuranceData.theft || false,
        glass: insuranceData.glass || false,
        roadsideAssistance: insuranceData.roadsideAssistance || false,
        collision: insuranceData.collision || false,
        liability: insuranceData.liability || false,
        comprehensive: insuranceData.comprehensive || false,
        personalInjury: insuranceData.personalInjury || false,
        uninsuredMotorist: insuranceData.uninsuredMotorist || false,
        usageType: insuranceData.usageType || '',
        price: '',
        duration: insuranceData.duration || '',
        status: ''
    });
    const [basePrice, setBasePrice] = useState(300);
    const [totalPrice, setTotalPrice] = useState(insuranceData.price || 0);

    const prices = {
        fire: 250,
        theft: 150,
        glass: 300,
        roadsideAssistance: 150,
        collision: 250,
        comprehensive: 350,
        personalInjury: 250,
        motorist: 200
    };

    const usageRatios = {
        familial: 1.2,
        commercial: 1.7,
        other: 1.5
    };

    const durationRatios = {
        1: 1,
        2: 1.75,
        3: 2,
        6: 2.5,
        12: 2.75
    };


    const handleSelect = (field, value) => {
        setSelectedValues((prev) => ({
            ...prev,
            [field]: value
        }));
        setValue(field, value);
    };

    const calculateTotalPrice = () => {
        let total = basePrice;
        Object.keys(prices).forEach((field) => {
            if (selectedValues[field]) {
                total += prices[field];
            }
        });
        total *= usageRatios[selectedValues.usageType] || 1;
        total *= durationRatios[selectedValues.duration] || 1;
        total = total.toFixed(2);

        setTotalPrice(total);
        handleSelect("price", total);
    };


    const onSubmit = async () => {
        if (selectedValues.duration === '' || selectedValues.usageType == '') {
            handleError();
            return;
        }
        calculateTotalPrice();
        selectedValues.price = totalPrice;
        if (selectedValues.status === 'in card') {

            try {
                const response = await fetch('http://localhost:5000/api/insurance/createInsurance', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(selectedValues),
                });

                if (!response.ok) {
                    console.log(JSON.stringify(selectedValues));
                    return;
                }
                console.log('Insurance Created:', selectedValues);
            } catch (error) {
                console.error('Error:', error.message);
            }
            return;
        }
        localStorage.setItem('insurance', JSON.stringify(selectedValues));
        navigate('/payment');
        localStorage.setItem('id', JSON.stringify(vehicleId));
    };


    const clearAll = () => {
        reset();
        setSelectedValues({
            fire: false,
            theft: false,
            glass: false,
            roadsideAssistance: false,
            collision: false,
            comprehensive: false,
            personalInjury: false,
            motorist: false,
            usageType: '',
            duration: ''
        });
        setTotalPrice(0);
        setCurrentStep(1)
    };

    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const steps = [

        <div key="step1" className="step1">
            {['fire', 'theft', 'glass'].map((field) => (
                <div key={field} className="boleen-question-container">
                    <label htmlFor={field}>
                        Insure {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </label>
                    <div>
                        <span
                            className={selectedValues[field] ? 'selected' : ''}
                            onClick={() => handleSelect(field, true)}
                            style={{
                                backgroundColor: selectedValues[field] ? 'var(--white-color)' : 'var(--btn-color)',
                                color: selectedValues[field] ? 'var(--black-color)' : 'var(--white-color)'
                            }}
                        >
                            Yes
                        </span>
                        <span
                            onClick={() => handleSelect(field, false)}
                            style={{
                                backgroundColor: !selectedValues[field] ? 'var(--white-color)' : 'var(--btn-color)',
                                color: !selectedValues[field] ? 'var(--black-color)' : 'var(--white-color)'
                            }}
                        >
                            No
                        </span>
                    </div>
                </div>
            ))}
        </div>,

        <div key="step2" className="step2">
            {['roadsideAssistance', 'collision', 'liability'].map((field) => (
                <div key={field} className="boleen-question-container">
                    <label htmlFor={field}>
                        Insure {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </label>
                    <div>
                        <span
                            className={selectedValues[field] ? 'selected' : ''}
                            onClick={() => handleSelect(field, true)}
                            style={{
                                backgroundColor: selectedValues[field] ? 'var(--white-color)' : 'var(--btn-color)',
                                color: selectedValues[field] ? 'var(--black-color)' : 'var(--white-color)'
                            }}
                        >
                            Yes
                        </span>
                        <span
                            onClick={() => handleSelect(field, false)}
                            style={{
                                backgroundColor: !selectedValues[field] ? 'var(--white-color)' : 'var(--btn-color)',
                                color: !selectedValues[field] ? 'var(--black-color)' : 'var(--white-color)'
                            }}
                        >
                            No
                        </span>
                    </div>
                </div>
            ))}
        </div>,

        <div key="step3" className="step3">
            {['comprehensive', 'personalInjury', 'motorist'].map((field) => (
                <div key={field} className="boleen-question-container">
                    <label htmlFor={field}>
                        Insure {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </label>
                    <div>
                        <span
                            className={selectedValues[field] ? 'selected' : ''}
                            onClick={() => handleSelect(field, true)}
                            style={{
                                backgroundColor: selectedValues[field] ? 'var(--white-color)' : 'var(--btn-color)',
                                color: selectedValues[field] ? 'var(--black-color)' : 'var(--white-color)'
                            }}
                        >
                            Yes
                        </span>
                        <span
                            onClick={() => handleSelect(field, false)}
                            style={{
                                backgroundColor: !selectedValues[field] ? 'var(--white-color)' : 'var(--btn-color)',
                                color: !selectedValues[field] ? 'var(--black-color)' : 'var(--white-color)'
                            }}
                        >
                            No
                        </span>
                    </div>
                </div>
            ))}
        </div>,

        <div key="step4" className="step4">
            <div className="usage-type-container">
                <label htmlFor="usageType">Usage Type:</label>
                <div>
                    {['familial', 'commercial', 'auther'].map((usage) => (
                        <span
                            key={usage}
                            className={selectedValues.usageType === usage ? 'selected' : ''}
                            onClick={() => handleSelect('usageType', usage)}
                            style={{
                                backgroundColor: selectedValues.usageType === usage ? 'var(--white-color)' : 'var(--btn-color)',
                                color: selectedValues.usageType === usage ? 'var(--black-color)' : 'var(--white-color)'
                            }}
                        >
                            {usage}
                        </span>
                    ))}
                </div>
                <label htmlFor="duration">Duration:</label>
                <div>
                    {[
                        { String: '1 Month', Number: 1 },
                        { String: '2 Month', Number: 2 },
                        { String: '3 Month', Number: 3 },
                        { String: '6 Month', Number: 6 },
                        { String: '1 Year', Number: 12 }
                    ].map((duration, index) => (
                        <span
                            key={index}
                            className={selectedValues.duration === duration.Number ? 'selected' : ''}
                            onClick={() => handleSelect('duration', duration.Number)}
                            style={{
                                backgroundColor: selectedValues.duration === duration.Number ? 'var(--white-color)' : 'var(--btn-color)',
                                color: selectedValues.duration === duration.Number ? 'var(--balack-color)' : 'var(--white-color)'
                            }}
                        >
                            {duration.String}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    ];

    const [chatBtn, setChatbtn] = useState(false);

    const generatecRandomValues = async () => {

        try {
            const response = await fetch('http://localhost:5000/api/insurance/dialogFlow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(chatbotText),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            selectedValues = result.insurance ;

        } catch (error) {
            console.error('Error:', error.message);
        }
        
    };

    return (
        <section className="insurance-form-container">
            <form onSubmit={handleSubmit(onSubmit)}>

                <h2>Insurance Form</h2>
                <a type="button" className="clear-All" onClick={clearAll}>Clear All</a>

                <div className="owner-name-container">
                    <label htmlFor="OwnerName">Owner Name :</label>
                    <input
                        type="text"
                        name="ownerName"
                        id="ownerName"
                        value={JSON.parse(localStorage.getItem('user')).first_name + ' ' + JSON.parse(localStorage.getItem('user')).last_name}
                        readOnly
                    />
                </div>
                <div className="vehicle-type-container">
                    <label htmlFor="VehicleType">Vehicle Type :</label>
                    <input
                        type="text"
                        name="ownerName"
                        id="ownerName"
                        value={vehicleType || 'not defined'}
                        readOnly
                    />
                </div>

                <div className="form-wrapper-container">
                    {steps[currentStep - 1]}

                    <div className="navigation-buttons">
                        {currentStep > 1 && (
                            <a onClick={handlePrevious} className="prev-btn">
                                <img src={prev_icon} alt="" />
                            </a>
                        )}
                        {currentStep < steps.length && (
                            <a onClick={handleNext} className="next-btn" >
                                <img src={next_icon} alt="" />
                            </a>
                        )}
                    </div>
                </div>
                <div className="btn-container">
                    <button type="submit" onClick={() => handleSelect('status', 'active')}>Pay Now</button>
                    <button type="submit" onClick={() => handleSelect('status', 'in card')}>Add to Card</button>
                </div>
            </form>
            <div className="price-container">
                <div className="price-calculation">
                    {
                        totalPrice == 0 ?
                            <img src={animation_2} width='100%' /> :
                            <span>Total Price <h2>{totalPrice} MAD</h2> </span>
                    }
                    <button type="button" onClick={calculateTotalPrice}>Calculate Price</button> :
                </div>
            </div>
            <button className="chatbot-btn">
                <img
                    src={chatbot_icon}
                    alt=""
                    onClick={() => setChatbtn(!chatBtn)}
                />
            </button>
            {
                chatBtn ?
                    <div className="chatbot-container">
                        <textarea placeholder="Enter you assuance plan" name="" id="" value={chatbotText}></textarea>
                        <button className="chatbot-generation-btn" onClick={generatecRandomValues}>
                            <img src={next_icon} alt="" />
                        </button>
                    </div>
                    : null
            }
        </section>
    );
}

export default InsuranceForm;
