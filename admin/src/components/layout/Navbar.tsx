// src/components/layout/Navbar.tsx
import { useState, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AuthState } from '../../types';
import { checkLogin, logout } from '../../pages/Auth/utils/login.utils';

const Navbar: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await checkLogin();
        setAuth(data);
      } catch (error) {
        console.error("Failed to check login status:", error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setAuth({
        isAuthenticated: false,
        user: null
      });
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-[#317db4]">
      <div className="flex h-16 items-center justify-end">
        {auth.isAuthenticated ? (
          <div className='flex items-center space-x-4'>
            <Link to="/profile" className="text-white hover:text-gray-200 transition-colors">
              <FaUserCircle className="text-2xl" />
            </Link>
            <button onClick={handleLogout} className="text-white hover:text-gray-200 transition-colors">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-white hover:text-gray-200 transition-colors">
            <FaUserCircle className="text-2xl" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
