import React from 'react';

function Buy() {
  const handleSubmit = (e) => {
    e.preventDefault();
    var options = {
      // key: "rzp_test_2zoDLngFFBYiGi",
      key_secret: "rzp_test_2zoDLngFFBYiGi",
      amount: 100, // Assuming a fixed amount for testing
      currency: "INR",
      name: "STARTUP_PROJECTS",
      description: "for testing purpose",
      handler: function (response) {
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: "shimron",
        email: "shimron@gmail.com",
        contact: "5588855533",
      },
      notes: {
        address: "Razorpay Corporate office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div className="App">
      <h2>Razorpay Payment Integration Using React</h2>
      <br />
      {/* Remove the input field */}
      <button onClick={handleSubmit}>Buy Now</button>
    </div>
  );
}

export default Buy;
