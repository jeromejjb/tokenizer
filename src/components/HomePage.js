// src/components/HomePage.js
import React, { useState } from 'react';
import PaymentForm from './PaymentForm';

const HomePage = () => {
  const [tokenBalance, setTokenBalance] = useState(100); // Static token balance for MVP
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentLink, setPaymentLink] = useState(null);

  const handleCreateLink = async () => {
    try {
      const userId = 'user_id_here'; // Replace with actual user ID logic
      const amount = 1; // Example: User wants to buy 1 token

      // Send POST request to backend to create Stripe checkout session
      const response = await fetch('/api/payments/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, amount }),
      });

      const data = await response.json();

      if (data.url) {
        setPaymentLink(data.url); // Store the payment URL
        alert('Payment link created! Share it with others to buy tokens.');
      } else {
        alert('Error creating payment link.');
      }
    } catch (error) {
      console.error('Error creating payment link:', error);
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
        <div className="mt-6">
          <p className="text-lg">Share this link to allow others to buy tokens:</p>
          <a href={paymentLink} target="_blank" rel="noopener noreferrer" className="text-blue-600">
            {paymentLink}
          </a>
        </div>
      )}

      {showPaymentForm && <PaymentForm closeForm={() => setShowPaymentForm(false)} />}
    </div>
  );
};

export default HomePage;
