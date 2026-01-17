import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import './Support.css';

const Support = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1000);
    };

    return (
        <div className="support-page container">
            <header className="support-header">
                <h1 className="support-title">Customer Support</h1>
                <p className="support-subtitle">We're here to help. Reach out to us for any queries or assistance.</p>
            </header>

            <div className="support-layout">
                <div className="contact-info">
                    <div className="info-card">
                        <h2>Contact Us</h2>
                        <div className="info-item">
                            <Mail className="info-icon" />
                            <div>
                                <h3>Email</h3>
                                <p>aswinphilipraju@gmail.com</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <Phone className="info-icon" />
                            <div>
                                <h3>Phone</h3>
                                <p>7736687371</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <MapPin className="info-icon" />
                            <div>
                                <h3>Office</h3>
                                <p>1600 Amphitheatre Parkway<br />Mountain View, CA 94043</p>
                            </div>
                        </div>
                    </div>

                    <div className="info-card faq-card">
                        <h2>Quick FAQ</h2>
                        <div className="faq-item">
                            <h3>What is the warranty period?</h3>
                            <p>All our umbrellas come with a 2-year comprehensive warranty.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Do you ship internationally?</h3>
                            <p>Yes, we ship to over 50 countries worldwide.</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-section">
                    <div className="form-card">
                        <h2>Send us a Message</h2>
                        {submitted ? (
                            <div className="success-message animate-fade-in">
                                <MessageCircle size={48} className="success-icon" />
                                <h3>Message Sent!</h3>
                                <p>Thank you for contacting us. We will get back to you within 24 hours.</p>
                                <button onClick={() => setSubmitted(false)} className="btn btn-secondary">
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group-support">
                                    <label>Name</label>
                                    <input
                                        type="text" name="name" required
                                        value={formData.name} onChange={handleChange}
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="form-group-support">
                                    <label>Email</label>
                                    <input
                                        type="email" name="email" required
                                        value={formData.email} onChange={handleChange}
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div className="form-group-support">
                                    <label>Subject</label>
                                    <select name="subject" value={formData.subject} onChange={handleChange}>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Order Support">Order Support</option>
                                        <option value="Product Feedback">Product Feedback</option>
                                        <option value="Returns">Returns & Warranty</option>
                                    </select>
                                </div>
                                <div className="form-group-support">
                                    <label>Message</label>
                                    <textarea
                                        name="message" required rows="5"
                                        value={formData.message} onChange={handleChange}
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary submit-btn">
                                    Send Message <Send size={18} />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
