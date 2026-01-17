import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Umbrella, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const { totalItems } = useCart();
    const location = useLocation();
    const [isOpen, setIsOpen] = React.useState(false);

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="logo">
                    <Umbrella className="logo-icon" size={32} />
                    <span className="logo-text">
                        <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span> Umbrella
                    </span>
                </Link>

                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/shop" className={`nav-link ${isActive('/shop') ? 'active' : ''}`} onClick={() => setIsOpen(false)}>Shop</Link>
                    <Link to="/support" className={`nav-link ${isActive('/support') ? 'active' : ''}`} onClick={() => setIsOpen(false)}>Support</Link>
                    <Link to="/cart" className="cart-btn-mobile" onClick={() => setIsOpen(false)}>
                        Cart ({totalItems})
                    </Link>
                </div>

                <div className="nav-actions">
                    <Link to="/cart" className="cart-btn" aria-label="Cart">
                        <ShoppingCart size={24} />
                        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                    </Link>
                    <Link to="/profile" className="profile-btn" aria-label="Profile">
                        <User size={24} />
                    </Link>
                    <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
