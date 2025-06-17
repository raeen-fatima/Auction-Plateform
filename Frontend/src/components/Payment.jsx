import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Payment = ({ bidAmount, onPaymentSuccess }) => {
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL
}/user/get-wallet-balance`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setWalletBalance(data.balance);
      } catch (error) {
        console.error("Error fetching wallet balance", error);
      }
    };

    fetchWalletBalance();
  }, []);

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) return toast.error("Failed to load Razorpay SDK.");

    try {
      const orderRes = await fetch(`${import.meta.env.VITE_API_URL
}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: bidAmount }),
      });
      const { orderId } = await orderRes.json();

      const options = {
        key: "rzp_test_FLZXKIaRa37brz",
        amount: bidAmount * 100,
        currency: "INR",
        name: "Auction Platform",
        description: "Auction payment",
        image: "https://example.com/auction-logo.png",
        order_id: orderId,
        handler: async (response) => {
          const verifyRes = await fetch(`${import.meta.env.VITE_API_URL
}/payment/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: bidAmount,
              userId: "test_user_id", // Replace with actual userId
            }),
          });
          const data = await verifyRes.json();
          if (data.status === "ok") {
            toast.success("Payment successful!");

            // Call the onPaymentSuccess to update the wallet balance
            onPaymentSuccess(bidAmount);
          } else {
            toast.error("Payment verification failed!");
          }
        },
        theme: { color: "#38bdf8" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment initiation failed.");
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h2>Wallet Balance: ₹{walletBalance}</h2>
      </div>

      <button
        onClick={handlePayment}
        disabled={!bidAmount}
        className="px-6 py-2 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-lg shadow"
      >
        Pay ₹{bidAmount}
      </button>
    </div>
  );
};

export default Payment;
