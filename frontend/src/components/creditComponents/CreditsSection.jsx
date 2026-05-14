import React, { useState } from "react";
import { FaWallet, FaShoppingCart, FaHistory } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl } from "../../App";

function CreditsSection({ credits, activeTab, setActiveTab, refreshUser }) {
  const [shakePacks, setShakePacks] = useState(false);

  const handleOpenCredits = () => {
    setActiveTab("credits");
    setShakePacks(false);

    setTimeout(() => {
      setShakePacks(true);

      setTimeout(() => {
        setShakePacks(false);
      }, 700);
    }, 50);
  };

  const handleBuyCredits = async (creditAmount, priceAmount) => {
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/payment/create-credit-order`,
        {
          credits: Number(creditAmount),
          amount: Number(priceAmount),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!data?.order?.id) {
        toast.error("Order create nahi hua");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency || "INR",
        name: "Course Crush",
        description: `${creditAmount} Credits Purchase`,
        order_id: data.order.id,

        handler: async function (response) {
          try {
            const verifyData = {
              razorpay_order_id: String(response.razorpay_order_id),
              razorpay_payment_id: String(response.razorpay_payment_id),
              razorpay_signature: String(response.razorpay_signature),
              credits: Number(creditAmount),
              amount: Number(priceAmount),
            };

            console.log("VERIFY DATA:", verifyData);

            const verifyRes = await axios({
              method: "POST",
              url: `${serverUrl}/api/payment/verify-credit-payment`,
              data: verifyData,
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            });

            // console.log("VERIFY RESPONSE:", verifyRes.data);

            if (verifyRes.data?.success) {
              toast.success(`${creditAmount} credits added successfully`);
              if (refreshUser) {
                await refreshUser();
              }
            } else {
              toast.error(verifyRes.data?.message || "Payment verify failed");
            }
          } catch (verifyError) {
            console.log("VERIFY ERROR:", verifyError);
            toast.error(
              verifyError?.response?.data?.message || "Payment verify failed",
            );
          }
        },

        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled");
          },
        },

        theme: {
          color: "#4f46e5",
        },
      };

      if (!window.Razorpay) {
        toast.error("Razorpay script load nahi hui");
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("ORDER ERROR:", error);
      toast.error(error?.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <CreditHero
        credits={credits}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleOpenCredits={handleOpenCredits}
      />

      {activeTab === "credits" && (
        <CreditPacks
          key={shakePacks ? "shake-on" : "shake-off"}
          handleBuyCredits={handleBuyCredits}
          shakePacks={shakePacks}
        />
      )}
    </div>
  );
}

function CreditHero({ credits, setActiveTab, activeTab, handleOpenCredits }) {
  return (
    <div className="rounded-[30px] bg-gradient-to-br from-[#eef2ff] via-white to-[#f5f3ff] p-5 shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 to-orange-400 text-2xl text-white shadow-lg">
            <FaWallet />
          </div>

          <div>
            <p className="text-sm text-gray-500">Your Credits</p>

            <h2 className="mt-1 text-4xl font-bold tracking-tight">
              {credits}
            </h2>

            <p className="mt-1 text-gray-500">Credits Available</p>
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <button
            onClick={handleOpenCredits}
            className="rounded-2xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-indigo-600"
          >
            <FaShoppingCart className="mr-2 inline" />
            Buy Credits
          </button>

          <button
            onClick={() => setActiveTab("transactions")}
            className="rounded-2xl bg-white/80 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-white"
          >
            <FaHistory className="mr-2 inline" />
            View History
          </button>
        </div>
      </div>

      {activeTab === "credits" && (
        <div className="mt-8 rounded-[28px] bg-gradient-to-r from-black to-indigo-600 p-6 text-white shadow-[0_20px_50px_rgba(79,70,229,0.25)]">
          <p className="text-sm uppercase tracking-[0.2em] text-white/70">
            Upgrade Plan
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            Unlock Unlimited AI Learning
          </h3>

          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80">
            Buy more credits and generate premium AI courses with advanced
            features.
          </p>
        </div>
      )}
    </div>
  );
}

function CreditPacks({ handleBuyCredits, shakePacks }) {
  const packs = [
    { credits: 50, price: 49 },
    { credits: 110, price: 99, badge: "POPULAR" },
    { credits: 230, price: 199 },
    { credits: 600, price: 449, badge: "BEST VALUE" },
  ];

  return (
    <div
      className={`rounded-[34px] bg-white/75 p-6 shadow-[0_15px_45px_rgba(15,23,42,0.05)] transition-all duration-300 ${
        shakePacks ? "shake-animation" : ""
      }`}
    >
      <h2 className="mb-5 text-2xl font-bold">Buy Credits</h2>

      <div className="space-y-3">
        {packs.map((pack) => (
          <CreditPack
            key={pack.credits}
            credits={pack.credits}
            price={pack.price}
            badge={pack.badge}
            onBuy={() => handleBuyCredits(pack.credits, pack.price)}
          />
        ))}
      </div>
    </div>
  );
}

function CreditPack({ credits, price, badge, onBuy }) {
  return (
    <div className="rounded-2xl bg-gray-50/70 px-4 py-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">{credits} Credits</p>

            {badge && (
              <span className="rounded-full bg-indigo-100 px-2 py-1 text-[10px] font-bold text-indigo-700">
                {badge}
              </span>
            )}
          </div>

          <p className="mt-1 text-sm font-bold text-indigo-600">₹{price}</p>
        </div>

        <button
          onClick={onBuy}
          className="rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-indigo-600"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default CreditsSection;
