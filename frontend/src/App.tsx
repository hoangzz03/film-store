import ReactDom from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import LoginPage from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile";
import ProductsPage from "./pages/Products";
import CartPage from "./pages/Cart";
import SuccessPage from "./pages/success";
import BlogPage from "./pages/Blog";
import DetailProduct from "./pages/DetailProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} /><Route />
          <Route path="/cart" element={<CartPage />} /><Route />
          <Route path="/products" element={<ProductsPage />} /><Route />
          <Route path="/detailproduct/:id" element={<DetailProduct />} /><Route />
          <Route path="/blog" element={<BlogPage />} />
      
        </Route>
        <Route path="/login" element={<LoginPage />} /><Route />
        <Route path="/register" element={<Register />} /><Route />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
