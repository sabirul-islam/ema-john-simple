import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrederPlaced] = useState(false);


    const handlePlaceOrder = () => {
        setCart([]);
        setOrederPlaced(true);
        processOrder();
    }

    const removeProduct = (productkey) => {
    const newCart = cart.filter(pd => pd.key !== productkey);
    setCart(newCart);
    removeFromDatabaseCart(productkey);
    }
    useEffect( () => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
        const product = fakeData.find(pd => pd.key === key);
        product.quantity = savedCart[key];
        return product;
        });
        setCart(cartProducts);
    }, [])
    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>
    }
     
    return (
        <div className='twin-container'>
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItems 
                        removeProduct={removeProduct}
                        key={pd.key}
                        product={pd}></ReviewItems>)
                }
                {
                    thankYou
                }
            </div>

            <div className='cart-container'>
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className='main-button'>Place Order</button>
                </Cart>
            </div>
            
        </div>
    );
};

export default Review;