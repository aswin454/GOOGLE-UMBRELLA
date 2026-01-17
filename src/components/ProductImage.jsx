import React from 'react';
import { products } from '../data/products';

const ProductImage = ({ product, className = "" }) => {
    // Calculated based on a 2 column x 3 row grid
    // Width needs to be 200% of container (to show 1 of 2 columns)
    // Height needs to be 300% of container (to show 1 of 3 rows)

    // Lookup the full product data to ensure we have the latest spritePosition
    // This handles stale data in localStorage cart
    const fullProduct = products.find(p => p.id === product.id) || product;

    // Default to (0,0) if not found to prevent crash
    const { x = 0, y = 0 } = fullProduct.spritePosition || {};

    const style = {
        position: 'absolute',
        width: '200%',
        height: '300%',
        top: 0,
        left: 0,
        objectFit: 'cover',
        transform: `translate(-${x * 50}%, -${y * 33.33}%)`
    };

    return (
        <div className={`product-image-wrapper ${className}`} style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%' }}>
            <img
                src="/images/collection_grid.jpg"
                alt={product.name}
                style={style}
            />
        </div>
    );
};

export default ProductImage;
