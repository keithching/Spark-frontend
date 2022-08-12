import '../styles/Footer.css';
import github from '../asset/github.png';
import linkedin from '../asset/linkedin.png';
import twitter from '../asset/twitter.png';

const Footer = () => {
    return (
        <div className="Footer">
            <div class="link">
                <a href="https://github.com/keithching" target="_blank" rel="noreferrer">
                    <img src={github} alt="github" />
                </a>
            </div>
            <div class="link">
                <a href="https://twitter.com/KeithNgPC" target="_blank" rel="noreferrer">
                    <img src={twitter} alt="twitter" />
                </a>
            </div>
            <div class="link">
                <a href="https://www.linkedin.com/in/keith-pak-chung-ng/" target="_blank" rel="noreferrer">
                    <img src={linkedin} alt="linkedin" />
                </a>
            </div>
        </div>
    );
}

export default Footer;