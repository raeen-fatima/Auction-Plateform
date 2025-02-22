import { useState, useEffect } from "react";

const products = [
  { id: 1, name: "iPhone 14 Pro", bids: 45, price: 95000, traffic: 1200, age: 1, timeLeft: 7200 },
  { id: 2, name: "MacBook Air M2", bids: 32, price: 110000, traffic: 850, age: 2, timeLeft: 5400 },
  { id: 3, name: "Samsung Galaxy S23", bids: 28, price: 80000, traffic: 920, age: 1, timeLeft: 3600 },
  { id: 4, name: "Sony PlayStation 5", bids: 60, price: 55000, traffic: 2000, age: 1, timeLeft: 8400 },
  { id: 5, name: "Dell XPS 15", bids: 25, price: 130000, traffic: 700, age: 3, timeLeft: 6600 },
  { id: 6, name: "Apple Watch Series 8", bids: 38, price: 45000, traffic: 1500, age: 1, timeLeft: 4800 },
  { id: 7, name: "Canon EOS R6", bids: 15, price: 180000, traffic: 650, age: 2, timeLeft: 2700 },
  { id: 8, name: "Samsung 55-inch 4K QLED TV", bids: 12, price: 95000, traffic: 350, age: 2, timeLeft: 4200 },
  { id: 9, name: "Bose QuietComfort 45", bids: 10, price: 35000, traffic: 250, age: 1, timeLeft: 3600 },
  { id: 10, name: "GoPro Hero 11", bids: 8, price: 55000, traffic: 300, age: 2, timeLeft: 1800 },

];

const BiddingTable = () => {
  const [timeLeft, setTimeLeft] = useState(
    products.map((product) => product.timeLeft)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) =>
        prevTimeLeft.map((time) => (time > 0 ? time - 1 : 0))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="container mx-auto p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Recent Product Bidding</h2>
      <table className="w-full border border-gray-300 text-left min-w-max">
        <thead>
          <tr className="bg-primary text-white">
            <th className="p-2">Name</th>
            <th className="p-2">Bids</th>
            <th className="p-2">Current Price</th>
            <th className="p-2">Traffic</th>
            <th className="p-2">Age</th>
            <th className="p-2">Time Left</th>
            <th className="p-2">Bid</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className="border-t border-gray-300">
              <td className="p-2">{product.name}</td>
              <td className="p-2">{product.bids}</td>
              <td className="p-2">₹{product.price.toLocaleString()}</td>
              <td className="p-2">{product.traffic}</td>
              <td className="p-2">{product.age} Year(s)</td>
              <td className="p-2 text-red-500 font-bold">{formatTime(timeLeft[index])}</td>
              <td className="p-2">
                <button className="bg-primary hover:bg-blue-950 text-white py-1 px-3 rounded">
                  Place Bid
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BiddingTable;
