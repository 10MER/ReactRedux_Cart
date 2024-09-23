import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItem, clearCart } from '../store/cartSlice';

const CartSidebar = ({ isOpen, toggleCart }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className={`cart-sidebar ${isOpen && 'open'}`}>
      <div className="cart-header">
        <h2>Items</h2>
        <button className="clear-button" onClick={() => dispatch(clearCart())}>CLEAR</button>
      </div>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h4>{item.title}</h4>
                <p>{item.price} EGP</p>
                <button className="remove-button" onClick={() => dispatch(removeItem(item.id))}>
                x
              </button>
                <div className="cart-item-controls">
                  <button onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-footer">
        <button className="pay-button">Pay {getTotalPrice()} EGP</button>
      </div>
    </div>
  );
};

export default CartSidebar;
