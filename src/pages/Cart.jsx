import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, CreditCard, ArrowRight } from 'lucide-react';
import ProductImage from '../components/ProductImage';
import './Cart.css';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (cart.length === 0) {
        return (
            <div className="cart-page container empty-cart">
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any umbrellas yet.</p>
                <Link to="/shop" className="btn btn-primary">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page container">
            <h1 className="cart-title">Shopping Cart</h1>

            <div className="cart-layout">
                <div className="cart-items">
                    {cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-item-image">
                                <ProductImage product={item} />
                            </div>

                            <div className="cart-item-info">
                                <Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
                                <span className="cart-item-price">${item.price}</span>
                            </div>

                            <div className="cart-actions">
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="qty-btn">
                                        <Minus size={16} />
                                    </button>
                                    <span className="quantity">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="qty-btn">
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>Order Summary</h2>

                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>

                    <button className="btn btn-primary buy-all-btn" onClick={handleCheckout}>
                        Proceed to Checkout <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
