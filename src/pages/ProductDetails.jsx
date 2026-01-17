import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Check, CreditCard, ArrowLeft, Star, StarHalf } from 'lucide-react';
import ProductImage from '../components/ProductImage';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [added, setAdded] = React.useState(false);
    const [reviews, setReviews] = React.useState([
        { id: 1, user: 'Alex M.', rating: 5, comment: 'Amazing build quality! The colors are vivid.' },
        { id: 2, user: 'Sarah J.', rating: 4, comment: 'Matches my Pixel perfectly. Love it.' }
    ]);
    const [newReview, setNewReview] = React.useState({ user: '', rating: 5, comment: '' });
    const [showReviewForm, setShowReviewForm] = React.useState(false);

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        const review = {
            id: reviews.length + 1,
            ...newReview,
            date: new Date().toLocaleDateString()
        };
        setReviews([review, ...reviews]);
        setNewReview({ user: '', rating: 5, comment: '' });
        setShowReviewForm(false);
    };

    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
                <h2>Product not found</h2>
                <button onClick={() => navigate('/shop')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Back to Shop
                </button>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const handleBuyNow = () => {
        addToCart(product);
        navigate('/checkout');
    };

    return (
        <div className="product-details-page container">
            <button onClick={() => navigate(-1)} className="back-link">
                <ArrowLeft size={20} /> Back
            </button>

            <div className="product-layout">
                <div className="product-gallery">
                    <div className="main-image-container">
                        <ProductImage product={product} className="detail-image" />
                    </div>
                </div>

                <div className="product-info-column">
                    <span className="detail-category">{product.category}</span>
                    <h1 className="detail-title">{product.name}</h1>
                    <div className="detail-price">${product.price}</div>

                    <div className="detail-description">
                        <p>{product.description}</p>
                    </div>

                    <div className="detail-features">
                        <div className="feature-item">
                            <div className="dot green"></div> In Stock
                        </div>
                        <div className="feature-item">
                            <div className="dot blue"></div> Free Shipping
                        </div>
                    </div>

                    <div className="detail-actions">
                        <button
                            className={`btn btn-primary action-btn ${added ? 'success' : ''}`}
                            onClick={handleAddToCart}
                        >
                            {added ? (
                                <>
                                    <Check size={20} /> Added to Cart
                                </>
                            ) : (
                                <>
                                    <ShoppingCart size={20} /> Add to Cart
                                </>
                            )}
                        </button>
                        <button className="btn btn-secondary action-btn" onClick={handleBuyNow}>
                            <CreditCard size={20} /> Buy Now
                        </button>
                    </div>

                    <div className="reviews-section">
                        <div className="reviews-header">
                            <h2>Customer Reviews</h2>
                            <button className="btn btn-secondary btn-sm" onClick={() => setShowReviewForm(!showReviewForm)}>
                                {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                            </button>
                        </div>

                        {showReviewForm && (
                            <form onSubmit={handleReviewSubmit} className="review-form animate-fade-in">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={newReview.user}
                                        onChange={e => setNewReview({ ...newReview, user: e.target.value })}
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Rating</label>
                                    <select
                                        value={newReview.rating}
                                        onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                                    >
                                        <option value="5">5 Stars</option>
                                        <option value="4">4 Stars</option>
                                        <option value="3">3 Stars</option>
                                        <option value="2">2 Stars</option>
                                        <option value="1">1 Star</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Review</label>
                                    <textarea
                                        required
                                        value={newReview.comment}
                                        onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                                        placeholder="Share your thoughts..."
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit Review</button>
                            </form>
                        )}

                        <div className="reviews-list">
                            {reviews.map(review => (
                                <div key={review.id} className="review-card">
                                    <div className="review-header-row">
                                        <span className="review-user">{review.user}</span>
                                        <div className="review-rating">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} size={14} fill="currentColor" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
