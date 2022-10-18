import footerStyles from '../styles/footer.module.css';
import Image from 'next/image';

const Footer = () => {
    return (
        <div className={footerStyles.Footer}>
            <p>Created by Keith Ng</p>
            <div className={footerStyles.links}>
                <div className={footerStyles.link}>
                    <a href="https://github.com/keithching" target="_blank" rel="noreferrer">
                        <Image
                            priority
                            // layout="fill"
                            width={30}
                            height={30}
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
                            width={30}
                            height={30}
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
                            width={30}
                            height={30}
                            src="/images/linkedin.png"
                            alt="linkedin"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;