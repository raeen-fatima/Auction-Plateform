import {  Routes, Route } from "react-router-dom";
import Home from "./Home/Home"; 
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import About from "./About/About";
import Auctions from "./components/Auctions";
import AuctionStats from "./components/Analytics";
import LiveAuction from "./components/LiveAuction";
import PostAuction from "./components/PostAuction";
import PrivacyPolicy from "./components/PrivacyPolicy";
import AuctionProduct from "./components/ProductDetails";
import Contact from "./components/Contact";
import Service from "./components/Service";
import Dashboard from "./Dashboard/Dashboard";
import Chat from "./components/Chat";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/auction" element={<Auctions />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/liveAuction" element={<LiveAuction />} />
        <Route path="/analytics" element={<AuctionStats />} />
        <Route path="/postauctions" element={<PostAuction />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/PlaceBid" element={<AuctionProduct />} />
        <Route path="/chat" element={<Chat />} />
        
      </Routes>
    
  );
}

export default App;
