import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItem, selectCartItems, selectTotalPrice} from '../store/cartSlice';

const Cart = () => {
  const cart = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.length > 0) {
      console.log('Cart updated:', cart);
    }
  }, [cart]);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
            <button onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
            <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
          </div>
        ))
      )}
      <h3>Total: ${totalPrice}</h3>
    </div>
  );
};

export default Cart;
