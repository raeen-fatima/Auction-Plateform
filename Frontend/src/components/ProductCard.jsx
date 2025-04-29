// components/ProductCard.jsx
import { Link } from "react-router-dom";

const ProductCard = ({ product, getRemainingTime }) => {
  return (
    <div className="relative border rounded-2xl shadow-md bg-white overflow-hidden transition-all hover:shadow-2xl hover:scale-[1.02] duration-300">
      <img
        src={`http://localhost:4001/uploads/${product.image}`}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      {/* Badge */}
      <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded ${
        product.status === "live"
          ? "bg-red-500 text-white"
          : "bg-blue-500 text-white"
      }`}>
        {product.status === "live" ? "Live" : "Upcoming"}
      </span>

      <div className="p-5 space-y-2">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-gray-800 hover:text-indigo-600 line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <p className="font-semibold text-green-700">Start Price: ₹{product.startPrice}</p>
        <p className="text-sm text-blue-600">Ends In: <span className="font-medium">{getRemainingTime(product.endTime)}</span></p>
      </div>
    </div>
  );
};

export default ProductCard;
