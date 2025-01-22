// src/components/HomePage.js
import React, { useState } from 'react';
import PaymentForm from './PaymentForm';

const HomePage = () => {
  const [tokenBalance, setTokenBalance] = useState(100); // For the MVP, use static balance
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleCreateLink = () => {
    // Simulate creating a link for token purchase
    alert('Payment link created! Share it with others to buy tokens.');
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

      {showPaymentForm && <PaymentForm closeForm={() => setShowPaymentForm(false)} />}
    </div>
  );
};

export default HomePage;
