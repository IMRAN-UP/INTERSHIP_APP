import { useState, useEffect } from "react";
import { Insurance_list, Insurance_Card } from "."
import { card_icon } from "../assets/icons";
function insurances_container({ handleInsurance, insuranceData }) {
    const [phoneWidth, setPhoneWidth] = useState( window.innerWidth > 900 );
    const handleCard = () => {
        setPhoneWidth(!phoneWidth)
    }
    return (
        <section className="insurances-container">
            <Insurance_list />
            {
                phoneWidth ?
                    <Insurance_Card
                        handleCard={handleCard}
                        phoneWidth={phoneWidth}
                        handleInsurance={handleInsurance}
                    />
                    :
                    <button onClick={handleCard} className="card-btn">
                        <img src={card_icon} alt="car_icon" />
                    </button>
            }

        </section>
    )
}

export default insurances_container;
