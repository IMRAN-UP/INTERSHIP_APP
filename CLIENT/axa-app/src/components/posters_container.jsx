import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Poster_1, Poster_2, Poster_3, Poster_4, Poster_5, Poster_10, Poster_14, left_icon, right_icon, telephone_icon, facebook_icon, google_icon, instagram_icon, whatsapp_icon } from "../assets/icons";
function posters_containet() {
    const imageWrapperRef = useRef(null);
    const navigate = useNavigate();

    const scrollLeft = () => {
        imageWrapperRef.current.scrollBy({ left: -1000, behavior: 'smooth' });
    }

    const scrollRight = () => {
        imageWrapperRef.current.scrollBy({ left: 1000, behavior: 'smooth' });
    }

    const handleSocialMedia = (event) => {
        navigate(event.target.value);
    }

    return (
        <section className="posters-container" >
            <button className="scroll-btn left-btn" onClick={scrollLeft}>
                <img src={left_icon} alt="" />
            </button>
            <div className="poster-wrapper" ref={imageWrapperRef}>
                <img src={Poster_10} alt="The poster numnber one" />
                <img src={Poster_1} alt="The poster number two" />
                <img src={Poster_2} alt="The poster number tree" />
                <img src={Poster_3} alt="The poster number four" />
                <img src={Poster_4} alt="The poster number five" />
                <img src={Poster_5} alt="The poster number six" />
                <img src={Poster_14} alt="" />
            </div>
            <div className="chat-container" id="social-media">
                <h4>Here to Serve you </h4>
                <button>Live Chat</button>
                <div>
                    <ul>
                        <li>
                            <a href="mailto:charafzaidassurances@gmail.com">
                                <img src={google_icon} alt="Email" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/axa" target="_blank" rel="noopener noreferrer">
                                <img src={facebook_icon} alt="Facebook" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/axa" target="_blank" rel="noopener noreferrer">
                                <img src={instagram_icon} alt="Instagram" />
                            </a>
                        </li>
                        <li>
                            <a href="https://wa.me/212535562703" target="_blank" rel="noopener noreferrer">
                                <img src={whatsapp_icon} alt="WhatsApp" />
                            </a>
                        </li>
                    </ul>
                    <span>
                        <img src={telephone_icon} alt="" />
                        <a href={'tel:0535564545'}>
                            0535564545
                        </a>
                    </span>
                </div>
            </div>
            <button className="scroll-btn right-btn" onClick={scrollRight}>
                <img src={right_icon} alt="" />
            </button>
        </section>
    )
}

export default posters_containet
