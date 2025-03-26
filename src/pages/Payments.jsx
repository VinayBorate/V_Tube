import React, { useState, useEffect } from "react";

const PaymentPage = () => {
  const [adminData, setAdminData] = useState(null);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    // Getting the user data from localStorage
    const storedUser = localStorage.getItem("userDetail");
    if (storedUser) {
      try {
        setAdminData(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    // Fetching plans from the API
    const fetchPlans = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/auth/user/getAllPlans");
        const data = await response.json();
        if (data.success) {
          setPlans(data.plans);
        } else {
          console.error("Failed to fetch plans:", data.message);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  const handlePayment = async (accountType, amount, e) => {
    e.preventDefault();
    if (!adminData) return alert("User not found");

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/order", {
        method: "POST",
        body: JSON.stringify({ amount, userId: adminData._id }),
        headers: { "Content-Type": "application/json" },
      });
      const order = await response.json();
      if (!order.order || !order.order.id) {
        alert("Order creation failed. Please try again.");
        return;
      }

      const options = {
        key: "rzp_test_E6M4EAuJChS45n",
        amount,
        currency: "INR",
        name: "Vtube",
        description: "Test Transaction",
        order_id: order.order.id,
        handler: async function (response) {
          const validateRes = await fetch("http://localhost:3000/api/v1/auth/validateOrder", {
            method: "POST",
            body: JSON.stringify({ ...response, userId: adminData._id, accountType }),
            headers: { "Content-Type": "application/json" },
          });
          console.log("Validation Response:", await validateRes.json());
        },
        prefill: {
          name: `${adminData.firstName} ${adminData.lastName}`,
          email: adminData.email,
          contact: "9000000000",
        },
        theme: { color: "#3399cc" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <section className="bg-red-500 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Select a Plan</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard
            key={plan._id}
            planName={plan.name}
            price={`₹${plan.amount}`}
            features={plan.features}
            onClick={(e) => handlePayment(plan.name.toLowerCase(), plan.amount, e)}
          />
        ))}
      </div>
    </section>
  );
};

const PlanCard = ({ planName, price, features, onClick }) => (
  <div className="mb-10 overflow-hidden rounded-lg bg-gray-700 shadow-lg duration-300 hover:shadow-xl">
    <div className="p-8 text-center">
      <h3 className="mb-4 text-xl font-semibold">{planName}</h3>
      <p className="mb-2 text-base leading-relaxed">{price}</p>
      <ul className="text-sm mb-4">
        {features.map((feature, index) => (
          <li key={index}>- {feature}</li>
        ))}
      </ul>
      <button
        className="inline-block rounded-full border border-gray-300 px-6 py-2 text-base font-medium text-white transition hover:bg-gray-600"
        onClick={onClick}
      >
        Select Plan
      </button>
    </div>
  </div>
);

export default PaymentPage;
