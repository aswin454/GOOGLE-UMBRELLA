import React from 'react';
import { User, Package, MapPin, Heart, LogOut, Settings } from 'lucide-react';
import './Profile.css';

const Profile = () => {
    // Mock user data
    const user = {
        name: 'Guest User',
        email: 'guest@example.com',
        joined: 'January 2026',
        orders: [
            { id: '#GU-1024', date: 'Jan 15, 2026', status: 'Delivered', total: '$49.99', items: 1 },
            { id: '#GU-1021', date: 'Jan 10, 2026', status: 'Processing', total: '$39.99', items: 1 }
        ]
    };

    return (
        <div className="profile-page container">
            <header className="profile-header">
                <div className="profile-avatar">
                    <User size={48} />
                </div>
                <div className="profile-info">
                    <h1 className="profile-name">{user.name}</h1>
                    <p className="profile-email">{user.email}</p>
                    <p className="profile-joined">Member since {user.joined}</p>
                </div>
                <button className="btn btn-secondary logout-btn">
                    <LogOut size={18} /> Logout
                </button>
            </header>

            <div className="profile-grid">
                <div className="profile-sidebar">
                    <nav className="profile-nav">
                        <button className="profile-nav-item active">
                            <Package size={20} /> My Orders
                        </button>
                        <button className="profile-nav-item">
                            <Heart size={20} /> Wishlist
                        </button>
                        <button className="profile-nav-item">
                            <MapPin size={20} /> Addresses
                        </button>
                        <button className="profile-nav-item">
                            <Settings size={20} /> Settings
                        </button>
                    </nav>
                </div>

                <div className="profile-content">
                    <h2 className="content-title">Recent Orders</h2>
                    <div className="orders-list">
                        {user.orders.map(order => (
                            <div key={order.id} className="order-card">
                                <div className="order-header">
                                    <span className="order-id">{order.id}</span>
                                    <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                                </div>
                                <div className="order-details">
                                    <div className="detail-item">
                                        <span className="label">Date</span>
                                        <span className="value">{order.date}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">Total</span>
                                        <span className="value">{order.total}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">Items</span>
                                        <span className="value">{order.items}</span>
                                    </div>
                                </div>
                                <div className="order-actions">
                                    <button className="btn btn-secondary btn-sm">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
