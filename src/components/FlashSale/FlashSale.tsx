import React, { useEffect, useState } from "react";

// Hàm tính thời gian kết thúc flash sale (Luôn là 23:59:59 hôm nay)
const getFakeEndTime = () => {
  const now = new Date();
  now.setHours(23, 59, 59, 999); // Set giờ là 23:59:59 hôm nay
  return now;
};

const FlashSale: React.FC<{ salePrice: number; originalPrice: number; discount: number }> = ({ salePrice, originalPrice, discount }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const saleEnd = getFakeEndTime();
      const diff = saleEnd.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Đã kết thúc");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours.toString().padStart(2, "0")} : ${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 mt-8 rounded-md border relative bg-gradient-to-r from-[#EB6A58] to-[#f38259] text-white shadow-md">
      <div className="flex items-center justify-between">
        <span className="bg-white text-[#F97D58] text-sm font-bold px-3 py-1 rounded-md">
          FLASH SALE
        </span>
        <span className="font-semibold">🔥 KẾT THÚC TRONG {timeLeft}</span>
      </div>

      <div className="flex items-end mt-3 space-x-2">
        <span className="text-2xl font-bold">₫{salePrice.toLocaleString()}</span>
        <span className="line-through text-lg opacity-75">₫{originalPrice.toLocaleString()}</span>
        <span className="bg-white text-[#F97D58] px-2 py-1 text-sm font-semibold rounded-md">
          -{discount * 100}%
        </span>
      </div>
    </div>
  );
};

export default FlashSale;
