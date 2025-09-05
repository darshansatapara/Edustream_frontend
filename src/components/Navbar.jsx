import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/useCartStore";
import { Menu, X, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { cart } = useCartStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link
            to="/home"
            className="text-indigo-600 dark:text-white font-bold text-xl"
          >
            EduStream
          </Link>

          {/* Desktop Menu */}
          {user && (
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/home"
                className="hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Courses
              </Link>
              <Link
                to="/quizzes"
                className="hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Quizzes
              </Link>
              <Link
                to="/cart"
                className="relative flex items-center hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <ShoppingCart className="w-5 h-5" />
                {cart?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          )}

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 focus:outline-none"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-4 pb-3 space-y-2 shadow-lg">
          {user && (
            <>
              <Link
                to="/home"
                className="block py-2 border-b hover:text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="block py-2 border-b hover:text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                Courses
              </Link>
              <Link
                to="/quizzes"
                className="block py-2 border-b hover:text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                Quizzes
              </Link>
              <Link
                to="/cart"
                className="flex items-center py-2 hover:text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart
                {cart?.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
            </>
          )}

          {/* Auth Buttons (Mobile) */}
          <div className="pt-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
