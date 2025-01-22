import React, { useState } from 'react';
import axios from 'axios';
import PaymentForm from './PaymentForm';

const HomePage = () => {
  const [tokenBalance, setTokenBalance] = useState(100); // Static balance for MVP
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentLink, setPaymentLink] = useState(''); // Store generated payment link

  const handleCreateLink = async () => {
    try {
      // Simulate token purchase amount
      const amount = 5; // Let's assume user wants to buy 5 tokens

      // Make API call to backend to create payment link
      const { data } = await axios.post('https://tokenizer-five.vercel.app/api/payments/create-payment-link', {
        userId: 'user_id_here', // Replace with actual user ID from your auth system
        amount,
      });

      // If backend returns a payment URL, set it in the state
      if (data.paymentUrl) {
        setPaymentLink(data.paymentUrl);
      } else {
        alert('Failed to create payment link');
      }
    } catch (error) {
      console.error('Error creating payment link:', error);
      alert('Error creating payment link');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-center text-blue-600">Welcome to Token Gateway</h1>
      <p className="mt-4 text-xl text-gray-700">Your current token balance: {tokenBalance}</p>
      <div className="mt-6 space-x-4">
        <button
          onClick={handleCreateLink}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Payment Link
        </button>
        <button
          onClick={() => setShowPaymentForm(true)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Buy Tokens
        </button>
      </div>

      {paymentLink && (
        <div className="mt-6 text-center">
          <p className="text-xl text-gray-700">Payment link generated! Share it with others to buy tokens.</p>
          <input
            type="text"
            value={paymentLink}
            readOnly
            className="mt-2 p-2 border border-gray-300 rounded-md w-80"
          />
          <button
            onClick={() => navigator.clipboard.writeText(paymentLink)}
            className="bg-blue-600 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-700"
          >
            Copy Link
          </button>
        </div>
      )}

      {showPaymentForm && <PaymentForm closeForm={() => setShowPaymentForm(false)} />}
    </div>
  );
};

export default HomePage;
