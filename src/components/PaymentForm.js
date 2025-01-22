// src/components/PaymentForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = ({ closeForm }) => {
  const [amount, setAmount] = useState(1); // Default to 1 token
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const userId = 'user_id_here'; // Replace with actual user ID from auth system

      // Send payment request to the backend
      const { data } = await axios.post('/api/payments/create-checkout-session', {
        userId,
        amount,
      });

      if (data.url) {
        setPaymentUrl(data.url); // Set the payment URL returned by the backend
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Error processing payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold text-center">Buy Tokens</h2>
        <p className="mt-2 text-center">Enter the number of tokens you want to buy:</p>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min="1"
          className="mt-4 block w-full p-2 border rounded-md border-gray-300"
        />

        <div className="mt-4 text-center">
          <button
            onClick={handlePayment}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>

        {paymentUrl && (
          <div className="mt-4 text-center">
            <a href={paymentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">
              Click here to complete your payment
            </a>
          </div>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={closeForm}
            className="text-red-600 hover:text-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
