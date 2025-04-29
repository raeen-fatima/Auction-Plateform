import { useState, useEffect, useRef } from "react";
import { GiHamburgerMenu, GiHammerDrop } from "react-icons/gi";
import { IoChevronDown } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Auctions", href: "/products" },
  { name: "Service", href: "/service" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Check login and token expiry
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Check if token exists and is valid
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
        const expiry = decoded.exp * 1000; // JWT expiry is in seconds, convert to ms
        const now = Date.now();

        if (now > expiry) {
          // Token expired
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (err) {
        // If token is invalid
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/signIn"; // Redirect to sign-in page
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex-wrap">
      <nav
        className="flex items-center justify-between p-4 lg:px-8 bg-slate-100/60 backdrop-blur-md shadow-md"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex font-bold lg:flex-1 items-center gap-2">
          <a href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <GiHammerDrop className="text-primary text-2xl" />
            <h1 className="text-primary cookie-regular text-3xl">BidNest</h1>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <GiHamburgerMenu className="size-6" />
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative text-sm/6 font-semibold text-black hover:text-primary after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Account/Login */}
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
            <div className="absolute right-0 mt-8 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
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

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"></div>
      )}

      {/* Mobile Menu Drawer */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 shadow-lg`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold text-primary">Menu</h2>
          <button onClick={() => setMobileMenuOpen(false)}>
            <IoClose className="text-2xl text-gray-700" />
          </button>
        </div>

        <div className="flex flex-col px-4 py-6 gap-4">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-800 hover:text-primary font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}

          {isAuthenticated ? (
            <>
              <a
                href="/dashboard"
                className="text-gray-800 hover:text-primary font-medium text-lg"
              >
                Dashboard
              </a>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-red-600 font-medium text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <a
              href="/signIn"
              className="text-gray-800 hover:text-primary font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log in
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
