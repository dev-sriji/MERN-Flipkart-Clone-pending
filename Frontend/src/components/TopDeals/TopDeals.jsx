import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TopDeal from './TopDeal';

const TopDeals = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/product/fetch/?categoryid=${category.category_id}`);
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setProducts(data);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false); // Update loading state after fetch completes
            }
        };

        fetchProducts();
    }, [category.category_id]);

    // Conditionally render the entire component based on loading state and products length
    if (isLoading) {
        return <div>Loading...</div>; // Render a loading indicator while fetching data
    }

    if (products.length === 0) {
        return null; // Render nothing if no products available
    }

    return (
        <div className='topdeal1 grayback'>
            <h3>Top Deals on {category.category_name}</h3>
            <div className='topdeal--cards'>
                {products.map((product) => (
                    <TopDeal key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

TopDeals.propTypes = {
    category: PropTypes.object.isRequired,
};

export default TopDeals;
