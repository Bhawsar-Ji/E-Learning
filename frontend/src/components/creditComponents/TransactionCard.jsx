import React from "react";


function TransactionCard({ transactions }) {
  return (
    <section className="rounded-[34px] bg-white/75 p-6 shadow-[0_15px_45px_rgba(15,23,42,0.05)]">
      <h2 className="mb-6 text-2xl font-bold">Transactions</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet.</p>
      ) : (
        <div className="space-y-4">
          {transactions.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-2xl bg-gray-50/70 p-4"
            >
              <div>
                <p className="text-sm font-semibold">
                  {item.description || item.type}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : ""}
                </p>
              </div>

              <p
                className={`font-bold ${
                  item.type === "spent" ? "text-red-500" : "text-green-500"
                }`}
              >
                {item.type === "spent" ? "-" : "+"}
                {item.amount}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default TransactionCard;