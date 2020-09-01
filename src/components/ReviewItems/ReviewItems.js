import React from 'react';

const ReviewItems = (props) => {
    const {name, quantity, key, price} = props.product;
    
    
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px'
    }
    return (
        <div className='review-item' style={reviewItemStyle}>
            <h4 className='product-name'>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>$ {price}</small></p>
            <br/>
            <button onClick={()=>props.removeProduct(key)} className='main-button'>Remove</button>
            
        </div>
    );
};

export default ReviewItems;