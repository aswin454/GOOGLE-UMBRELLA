import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ShoppingBag, Search } from 'lucide-react';
import ProductImage from '../components/ProductImage';
import './Shop.css';

const Shop = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');

    const categories = ['All', ...new Set(products.map(p => p.category))];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'All' || product.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="shop-page container">
            <header className="shop-header">
                <h1 className="shop-title">Collection</h1>
                <p className="shop-subtitle">Discover the perfect shield for your daily adventures.</p>
            </header>

            <div className="shop-controls">
                <div className="search-bar">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search umbrellas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="category-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`category-btn ${category === cat ? 'active' : ''}`}
                            onClick={() => setCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="product-grid grid grid-cols-3">
                {filteredProducts.map(product => (
                    <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                        <div className="product-image-container">
                            <ProductImage product={product} className="product-image" />
                            <div className="product-overlay">
                                <span className="view-details-btn">View Details</span>
                            </div>
                        </div>
                        <div className="product-info">
                            <div className="product-header">
                                <h3>{product.name}</h3>
                                <span className="product-price">${product.price}</span>
                            </div>
                            <p className="product-category">{product.category}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="no-results">
                    <ShoppingBag size={48} />
                    <p>No products found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default Shop;
