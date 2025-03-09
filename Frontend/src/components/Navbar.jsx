import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {  IoChevronDown } from "react-icons/io5"; 
import { GiHammerDrop } from "react-icons/gi";

const navigation = [
  { name: "Home", href: "/", },
  { name: "Auctions", href: "/auction", },
  { name: "Service", href: "/service" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsAuthenticated(false);
    window.location.href = "/signIn";
  };

  return (
    <div>
      <header className="fixed inset-x-0 top-0 z-50 flex-wrap">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-4 lg:px-8 bg-slate-100/60 backdrop-blur-md shadow-md flex-wrap"
        >
          {/* Logo with Auction Icon */}
          <div className="flex font-bold lg:flex-1 items-center gap-2">
            <a href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <GiHammerDrop className="text-primary text-2xl" />
              <h1 className="text-primary cookie-regular text-3xl">BidNest</h1>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <GiHamburgerMenu className="size-6" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-sm/6 font-semibold text-black hover:text-primary after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full flex items-center gap-1"
              >
                {item.icon && <span className="text-lg">{item.icon}</span>}
                {item.name}
              </a>
            ))}
          </div>

          {/* Auth Dropdown */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end relative">
            {isAuthenticated ? (
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center text-sm/6 font-semibold text-black hover:text-primary"
              >
                Account <IoChevronDown className="ml-1 w-4 h-4" />
              </button>
            ) : (
              <a
                href="/signIn"
                className="relative text-sm/6 font-semibold text-black hover:text-primary after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                Log in
              </a>
            )}
            {dropdownOpen && (
              <div className="absolute right-0 mt-8 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
                <a
                  href="/dashboard"
                  className="block px-4 py-2 text-black hover:bg-gray-100 rounded-lg"
                >
                  Dashboard
                </a>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}
