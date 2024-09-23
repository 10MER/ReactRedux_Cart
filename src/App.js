import './App.css';
import React from 'react';
import { useState } from 'react';
import ProductList from './Components/ProductList.js';
import Cart from './Components/Cart.js';
import CartSidebar from './Components/CartSidebar';
import { useSelector } from 'react-redux';

function App() {
  const cartItems = useSelector((state) => state.cart.items);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="App">
      <header>
        <h2>SHOP</h2>
        <div className="cart-icon" itemsCount={cartItems.length} onClick={toggleCart}>
          <img src="/carttt.png" width="50" height="50" alt="Cart" />
        </div>
      </header>
      <div className={`main-content ${isCartOpen ? 'cart-open' : ''}`}>
        <ProductList />
        <CartSidebar isOpen={isCartOpen} toggleCart={toggleCart} />
      </div>
    </div>
  );
}

export default App;
