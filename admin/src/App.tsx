// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, BrowserRouter } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Home';
import Users from './pages/UserManagement';
import Orders from './pages/OrderManagement';
import Products from './pages/ProductManagement';
import RevenueDashboard from './pages/Revenue';
import LoginPage from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ProductAdd from './pages/productAdd';
import UserAdd from './pages/userAdd';
import { useEffect, useState } from 'react';
import { AuthState } from './types';
import { checkLogin } from './pages/Auth/utils/login.utils';
const ProtectedRoute = ({ isAuthenticated }: { isAuthenticated: boolean | undefined }) => {
  if (isAuthenticated === undefined) {
    // Still loading authentication state
    return null; // Or a loading spinner component
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
const App: React.FC = () => {
  const [authenticate, setIsAuthenticate] = useState<AuthState>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = await checkLogin();
        setIsAuthenticate(auth);
        // console.log(auth);

      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={
          authenticate?.isAuthenticated ? <Navigate to='/' /> : <LoginPage />
        } />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute isAuthenticated={authenticate?.isAuthenticated} />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="users/add" element={<UserAdd />} />
            <Route path="orders" element={<Orders />} />
            <Route path="productmanagement" element={<Products />} />
            <Route path="productmanagement/add" element={<ProductAdd />} />
            <Route path="productmanagement/edit/:id" element={<ProductAdd />} />
            <Route path="revenue" element={<RevenueDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;