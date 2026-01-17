import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, totalPrice, clearCart } = useCart();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });
    const [isOrdered, setIsOrdered] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate processing
        setTimeout(() => {
            setIsOrdered(true);
            clearCart();
        }, 1500);
    };

    if (cart.length === 0 && !isOrdered) {
        return (
            <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
                <h2>Checkout is empty</h2>
                <button onClick={() => navigate('/shop')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Return to Shop
                </button>
            </div>
        );
    }

    if (isOrdered) {
        return (
            <div className="container checkout-success">
                <div className="success-card">
                    <CheckCircle size={64} className="success-icon" />
                    <h1>Order Placed!</h1>
                    <p>Thank you for your purchase, {formData.firstName}!</p>
                    <p>We'll send a confirmation email to {formData.email}.</p>
                    <button onClick={() => navigate('/')} className="btn btn-primary" style={{ marginTop: '2rem' }}>
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page container">
            <button onClick={() => navigate(-1)} className="back-link">
                <ArrowLeft size={20} /> Back to Cart
            </button>

            <h1 className="checkout-title">Checkout</h1>

            <div className="checkout-layout">
                <div className="checkout-form-section">
                    <form onSubmit={handleSubmit} id="checkout-form">
                        <section className="form-group">
                            <h2>Contact Information</h2>
                            <div className="grid grid-cols-2">
                                <input
                                    type="text" name="firstName" placeholder="First Name" required
                                    value={formData.firstName} onChange={handleChange}
                                    className="input-field"
                                />
                                <input
                                    type="text" name="lastName" placeholder="Last Name" required
                                    value={formData.lastName} onChange={handleChange}
                                    className="input-field"
                                />
                            </div>
                            <input
                                type="email" name="email" placeholder="Email Address" required
                                value={formData.email} onChange={handleChange}
                                className="input-field full-width"
                            />
                        </section>

                        <section className="form-group">
                            <h2>Shipping Address</h2>
                            <input
                                type="text" name="address" placeholder="Street Address" required
                                value={formData.address} onChange={handleChange}
                                className="input-field full-width"
                            />
                            <div className="grid grid-cols-2">
                                <input
                                    type="text" name="city" placeholder="City" required
                                    value={formData.city} onChange={handleChange}
                                    className="input-field"
                                />
                                <input
                                    type="text" name="zipCode" placeholder="ZIP Code" required
                                    value={formData.zipCode} onChange={handleChange}
                                    className="input-field"
                                />
                            </div>
                        </section>

                        <section className="form-group">
                            <h2>Payment Details</h2>
                            <input
                                type="text" name="cardNumber" placeholder="Card Number" required
                                value={formData.cardNumber} onChange={handleChange}
                                className="input-field full-width"
                            />
                            <div className="grid grid-cols-2">
                                <input
                                    type="text" name="expiry" placeholder="MM/YY" required
                                    value={formData.expiry} onChange={handleChange}
                                    className="input-field"
                                />
                                <input
                                    type="text" name="cvv" placeholder="CVV" required
                                    value={formData.cvv} onChange={handleChange}
                                    className="input-field"
                                />
                            </div>
                        </section>
                    </form>
                </div>

                <div className="checkout-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-items">
                        {cart.map(item => (
                            <div key={item.id} className="summary-item">
                                <span>{item.name} x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="divider"></div>
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>

                    <button type="submit" form="checkout-form" className="btn btn-primary buy-btn">
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
