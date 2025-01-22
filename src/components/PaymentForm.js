import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = ({ closeForm }) => {
  const [amount, setAmount] = useState(1); // Default to buying 1 token
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Request backend to create Stripe Checkout session
      const { data } = await axios.post('https://tokenizer-five.vercel.app//api/payments/create-checkout-session', {
        userId: 'user_id_here', // Replace with actual user ID (from your authentication system)
        amount, // Number of tokens user wants to purchase
      });

      // Redirect user to Stripe Checkout page
      window.location.href = data.url;
    } catch (error) {
      console.error('Payment error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="payment-form">
      <h2 className="text-xl font-semibold">Buy Tokens</h2>
      <p>Enter the number of tokens you want to buy:</p>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        min="1"
        placeholder="Enter amount"
        className="mt-2 p-2 border"
      />

      <button
        onClick={handlePayment}
        className="mt-4 bg-green-600 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>

      <button
        onClick={closeForm}
        className="mt-4 text-red-600"
      >
        Close
      </button>
    </div>
  );
};

export default PaymentForm;
