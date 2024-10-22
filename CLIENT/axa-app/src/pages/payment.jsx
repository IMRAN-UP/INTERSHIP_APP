import React, { useState , useEffect } from 'react';
import { masterCard_icon, visa_icon, paypal_icon, cashOnDelivery, axa_Logo, axa_Picture } from '../assets/icons';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentForm = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const [paymentMethod, setPaymentMethod] = useState('');
    const [savePaymentData, setSavePaymentData] = useState(false);

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.id);
    };

    const navigate = useNavigate();

    const User = JSON.parse(localStorage.getItem('user'));
    const vehicleId = JSON.parse(localStorage.getItem('id'));

    const location = useLocation();
    const insurance = JSON.parse(localStorage.getItem('insurance'));
        console.log(insurance);



    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/api/insurance/createInsurance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(insurance),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            try {
                const response = await fetch("http://localhost:5000/api/vehicle/updateVehicle/" + vehicleId, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ assured: true }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                navigate('/insurance');
            } catch (error) {
                console.error('Error:', error.message);
            }

        } catch (error) {
            console.error('Error:', error.message);
        }


        console.log(JSON.stringify(insurance))


    };

    return (
        <section className='payment-page-container'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {
                    window.innerWidth > 600
                        ? <img src={axa_Logo} alt="" />
                        : <img src={axa_Picture} alt="" />
                }

                <div className="payment-method-container">
                    <img
                        src={masterCard_icon}
                        onClick={handlePaymentMethodChange}
                        id='masterCard'
                        style={{
                            border: paymentMethod === 'masterCard' ? '2px solid var(--btn-color)' : ''
                        }}
                    />
                    <img
                        src={visa_icon}
                        onClick={handlePaymentMethodChange}
                        id='visa'
                        style={{
                            border: paymentMethod === 'visa' ? '2px solid var(--btn-color)' : ''
                        }}
                    />
                    <img
                        src={paypal_icon}
                        onClick={handlePaymentMethodChange}
                        id='paypal'
                        style={{
                            border: paymentMethod === 'paypal' ? '2px solid var(--btn-color)' : ''
                        }}
                    />
                    <img
                        src={cashOnDelivery}
                        onClick={handlePaymentMethodChange}
                        id='cash'
                        style={{
                            border: paymentMethod === 'cash' ? '2px solid var(--btn-color)' : '',
                        }}
                    />
                </div>
                <fieldset disabled={isSubmitting} className='payment-data-container'>
                    <div className='cardNumber-container'>
                        <label htmlFor="cardNumber" style={{ color: errors.cardNumber ? 'var(--error-color)' : '' }}>Card Number <span>*</span> </label>
                        <input
                            id="cardNumber"
                            {...register('cardNumber', {
                                required: 'Card number is required',
                                pattern: {
                                    value: /^\d{16}$/,
                                    message: 'Card number must be 16 digits'
                                }
                            })}
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            autoComplete="cc-number"
                            style={{
                                border: errors.cardNumber ? '1px solid var(--error-color)' : ''
                            }}
                        />
                    </div>
                    <div className='holderCard-container'>
                        <label htmlFor="cardholderName" style={{ color: errors.cardholderName ? 'var(--error-color)' : '' }}>Cardholder Name  <span>*</span>  </label>
                        <input
                            id="cardholderName"
                            {...register('cardholderName', { required: 'Cardholder name is required' })}
                            type="text"
                            placeholder="John Doe"
                            autoComplete="name"
                            style={{
                                border: errors.cardholderName ? '1px solid var(--error-color)' : ''
                            }}
                        />
                    </div>
                    <div className='expiryDate-container'>
                        <label htmlFor="expiryDate" style={{ color: errors.expiryDate ? 'var(--error-color)' : '' }}>Expiration Date (MM/YY)  <span>*</span>  </label>
                        <input
                            id="expiryDate"
                            {...register('expiryDate', {
                                required: 'Expiration date is required',
                                pattern: {
                                    value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                                    message: 'Invalid expiration date format'
                                }
                            })}
                            type="text"
                            placeholder="MM/YY"
                            autoComplete="cc-exp"
                            style={{
                                border: errors.expiryDate ? '1px solid var(--error-color)' : ''
                            }}
                        />
                    </div>
                    <div className='cvv-container'>
                        <label htmlFor="cvv" style={{ color: errors.cvv ? 'var(--error-color)' : '' }}>CVV  <span>*</span>  </label>
                        <input
                            id="cvv"
                            {...register('cvv', {
                                required: 'CVV is required',
                                pattern: {
                                    value: /^[0-9]{3,4}$/,
                                    message: 'CVV must be 3 or 4 digits'
                                }
                            })}
                            type="text"
                            placeholder="123"
                            autoComplete="cc-csc"
                            style={{
                                border: errors.cvv ? '1px solid var(--error-color)' : ''
                            }}
                        />
                    </div>
                    <div className="save-payment-data-container">
                        <input type="checkbox"
                            onChange={() => setSavePaymentData(!savePaymentData)}
                            checked={savePaymentData}
                        />
                        <label htmlFor="">Save payment data for future purchases</label>
                    </div>
                    <div className='amount-container'>
                        <label htmlFor="amount">Amount  <span>*</span> </label>
                        <span> {insurance.price} MAD </span>
                    </div>
                    <div className="btn-container">
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Processing...' : 'Pay Now'}
                        </button>
                    </div>
                </fieldset>
            </form>
        </section>
    );
};

export default PaymentForm;
