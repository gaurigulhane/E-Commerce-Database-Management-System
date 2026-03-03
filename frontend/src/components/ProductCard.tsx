import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface Product {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
    category: string;
    rating?: number;
    reviews?: number;
}

interface ProductCardProps {
    product: Product;
    onAddToCart?: () => void;
}

const starRating = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);
    const [wishlisted, setWishlisted] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
        });
        setAdded(true);
        onAddToCart?.();
        setTimeout(() => setAdded(false), 2000);
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.stopPropagation();
        setWishlisted(w => !w);
    };

    const rating = product.rating ?? (3.8 + (product.id % 12) * 0.1);
    const reviews = product.reviews ?? (42 + product.id * 17);

    return (
        <div className="product-card">
            <div className="product-image-wrap">
                <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                            `https://picsum.photos/seed/${product.id}/400/300`;
                    }}
                />
                <span className="product-tag">{product.category}</span>
                <button
                    className={`product-wishlist ${wishlisted ? 'active' : ''}`}
                    onClick={handleWishlist}
                    title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    {wishlisted ? '♥' : '♡'}
                </button>
            </div>

            <div className="product-info">
                <span className="product-category-label">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>

                <div className="product-rating">
                    <span className="stars">{starRating(parseFloat(rating.toFixed(1)))}</span>
                    <span className="rating-count">({reviews})</span>
                </div>

                <div className="product-footer">
                    <div>
                        {product.oldPrice && (
                            <span className="product-price-old">${product.oldPrice.toFixed(2)}</span>
                        )}
                        <span className="product-price">${product.price.toFixed(2)}</span>
                    </div>
                    <button
                        className={`add-to-cart-btn ${added ? 'added' : ''}`}
                        onClick={handleAddToCart}
                    >
                        {added ? '✓ Added' : '+ Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
