import '../styles/Header.css';

const Header = () => {
    const VIEW = '[TOP SECRET] Highest previledge admin dashboard';
    // to implement:
    // view for event provider
    // view for user
    // a state for controlling views

    return (
        <div className="Header">
            VIEW AS: {VIEW}
        </div>
    );
}

export default Header;