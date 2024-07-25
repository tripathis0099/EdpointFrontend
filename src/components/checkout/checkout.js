// src/Checkout.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './checkout.css';

const Checkout = () => {
  const [customerName, setCustomerName] = useState('');
  const location = useLocation();

  const course = location.state || {
    name: 'React Fundamentals',
    details: 'A comprehensive guide to learning React.js from scratch.',
    endDate: '2024-09-24T00:00:00.000Z',
    price: 200,
    discount: 0,
  };

  const finalPrice = course.price - course.discount;

  const handleNameChange = (e) => {
    setCustomerName(e.target.value);
  };

  const handleProceed = () => {
    alert(`Customer Name: ${customerName}\nGrand Total: Rs. ${finalPrice}`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="customer-name">
        <label htmlFor="customerName">Customer Name:</label>
        <input 
          type="text" 
          id="customerName" 
          value={customerName} 
          onChange={handleNameChange} 
        />
      </div>
      <div className="course-item">
        <h2 style={{color:"#2a2a2a"}}>{course.name}</h2>
        <p>{course.details}</p>
        <p>Valid till: {formatDate(course.endDate)}</p>
        <p>Price: Rs. {course.price}</p>
        <p>Discount: Rs. {course.discount}</p>
      </div>
      <div className="total">
        <h2 style={{color:"#2a2a2a"}}>Total: Rs. {finalPrice}</h2>
      </div>
      <button onClick={handleProceed}>Proceed</button>
    </div>
  );
};

export default Checkout;
