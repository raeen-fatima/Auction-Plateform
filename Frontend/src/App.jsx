import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import About from "./pages/About";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Contact from "./components/Contact";
import Service from "./components/Service";
import Dashboard from "./pages/Dashboard";
import ProductForm from "./components/ProductForm";
import AllProducts from "./components/AllProducts";
import ProductDetail from "./components/ProductDetail";
import MyBids from "./components/MyBids";
import Payment from "./components/Payment";
import Blogs from "./components/Blogs";
import NotFound from "./components/NotFound";
import EditProfile from "./components/EditProfile";
import ProfileSection from "./components/Profile";
import Wallet from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Correct import

function App() {
  return (
    <Routes>
      {/* ✅ Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/service" element={<Service />} />
      <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/EditProfile" element={<EditProfile />} />
      <Route path="*" element={<NotFound />} />

      {/* 🔐 Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/productForm"
        element={
          <ProtectedRoute>
            <ProductForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mybids"
        element={
          <ProtectedRoute>
            <MyBids />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pay"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Profile"
        element={
          <ProtectedRoute>
            <ProfileSection />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
