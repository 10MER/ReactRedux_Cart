import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('default');
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  // Sorting:
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'priceLow') {
      return a.price - b.price;
    } else if (sortOption === 'name') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'priceHigh') {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  return (
    // Products List:
    <div className="product-container">
      <div className="sort-container">
        <img src="/SORTTT.png" width="30" height="30" alt="Sort" className="sort-icon" />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="name">Name: A-Z</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
        </select>
      </div>

      <div className="product-list">
        {sortedProducts.map((product) => (
          <div key={product.id} className="product">
            <div className="price-tag">{product.price} EGP</div>
            <img src={product.image} alt={product.title} />
            <div className="product-info">
              <h3>{product.title}</h3>
              <button
                className="add-button"
                onClick={() => dispatch(addItem(product))}
              >
                Add (+)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
