import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = ({ closeForm }) => {
  const [amount, setAmount] = useState(1);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const userId = 'user_id_here'; // Replace with actual user ID from your auth system

      const { data } = await axios.post('https://tokenizer-five.vercel.app/api/payments/buy-tokens', {
        userId: userId,
        amount: amount,
      });

      // If the backend returns a payment URL, display it
      if (data.paymentUrl) {
        setPaymentUrl(data.paymentUrl);
      } else {
        setError('Unable to create payment link. Please try again.');
      }
    } catch (error) {
      console.error('Payment error', error);
      setError('Payment failed. Please try again.');
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

        {error && <div className="mt-4 text-center text-red-600">{error}</div>}

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
