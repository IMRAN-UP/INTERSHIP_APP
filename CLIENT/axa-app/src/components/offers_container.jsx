import { crached_car_icon , protection_icon, breakdown_car_icon } from "../assets/icons"
function offers_container() {
    return (
        <section className="offers-container">
            <div>
                <h3>
                    Coverage <span>On Air</span> , <span>Sea</span> and <span>Ground</span> !
                </h3>
            </div>
            <div>
                <img src={crached_car_icon} alt="" />
                <h6>Vehicle Accidents</h6>
                <p>
                    We offer swift and reliable support to get you back on the road with minimal hassle.
                </p>
                <div>
                    <button>Insure Now</button>
                    <button>Lrean more</button>
                </div>
            </div>
            <div>
                <img src={breakdown_car_icon} alt="" />
                <h6>Roadside Assistance</h6>
                <p>
                    Facing a breakdown? Our prompt depannage services are available 24/7 to assist you wherever you are.
                </p>
                <div>
                    <button>Insure Now</button>
                    <button>Lrean more</button>
                </div>
            </div>
            <div>
                <img src={protection_icon} alt="" />
                <h6>Protection for Our Clients</h6>
                <p>Trust in our commitment to provide unwavering support and protection every step of the way.</p>
                <div>
                    <button>Insure Now</button>
                    <button>Lrean more</button>
                </div>
            </div>
        </section>
    )
}

export default offers_container
