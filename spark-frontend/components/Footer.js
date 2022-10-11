import footerStyles from '../styles/footer.module.css';
import Image from 'next/image';

const Footer = () => {
    return (
        <div className={footerStyles.Footer}>
            <div className={footerStyles.link}>
                <a href="https://github.com/keithching" target="_blank" rel="noreferrer">
                    <Image
                        priority
                        // layout="fill"
                        width={50}
                        height={50}
                        src="/images/github.png"
                        alt="github"
                    />
                </a>
            </div>
            <div className={footerStyles.link}>
                <a href="https://twitter.com/KeithNgPC" target="_blank" rel="noreferrer">
                    <Image
                        priority
                        // layout="fill"
                        width={50}
                        height={50}
                        src="/images/twitter.png"
                        alt="twitter"
                    />
                </a>
            </div>
            <div className={footerStyles.link}>
                <a href="https://www.linkedin.com/in/keith-pak-chung-ng/" target="_blank" rel="noreferrer">
                    <Image
                        priority
                        // layout="fill"
                        width={50}
                        height={50}
                        src="/images/linkedin.png"
                        alt="linkedin"
                    />
                </a>
            </div>
        </div>
    );
}

export default Footer;