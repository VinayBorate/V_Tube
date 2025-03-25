import React from "react";
import axios from "axios";

const PaymentPage = () => {

  const handlePayment = async (accountType, amount, e) => {
    // console.log("Handel Payment");  
    e.preventDefault();
  
    const userId = 1234;
    const response = await fetch("http://localhost:3000/api/v1/auth/order", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,  // Convert amount to paise
        userId
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const order = await response.json();
    console.log("Order Response:", order);
  
    if (!order.order || !order.order.id) {
      alert("Order creation failed. Please try again.");
      return;
    }
  
    var options = {
      key: "rzp_test_E6M4EAuJChS45n",  // Replace with correct test key
      amount,
      currency:"INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.order.id,  // ✅ Fix: Correctly access order ID

      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "http://localhost:3000/api/v1/auth/validateOrder",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Web Dev Matrix", //your customer's name
        email: "webdevmatrix@example.com",
        contact: "9000000000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    console.log("Order Response:",options);
  
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    
  };
  

  return (
    <div className="bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Select a Plan</h1>
      <button className="bg-gray-700 text-white px-6 py-2 rounded mb-2 hover:bg-gray-600" onClick={(e) => handlePayment("bronze", 10, e)}>Bronze - ₹10</button>
      <button className="bg-gray-700 text-white px-6 py-2 rounded mb-2 hover:bg-gray-600" onClick={(e) => handlePayment("silver", 50, e)}>Silver - ₹50</button>
      <button className="bg-gray-700 text-white px-6 py-2 rounded mb-2 hover:bg-gray-600" onClick={(e) => handlePayment("gold", 100, e)}>Gold - ₹100</button>
    </div>
  );
};

export default PaymentPage;
