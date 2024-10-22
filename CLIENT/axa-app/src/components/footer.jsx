import { facebook_icon, whatsapp_icon, google_icon, instagram_icon } from "../assets/icons"
function footer() {
    return (
        <section className="footer-container">
            <div className="footer-content">
                <div className="footer-links">
                    <a href="/about">About Us</a>
                    <a href="/contact">Contact</a>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-of-service">Terms of Service</a>
                </div>
                <ul className="social-media">
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
            </div>
            <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </section>
    )
}

export default footer
