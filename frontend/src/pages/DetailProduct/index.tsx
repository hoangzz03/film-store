import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthState, ProductData } from "../../types";
import { checkLogin } from "../Auth/utils/login.utils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductPage = () => {
  const server = import.meta.env.VITE_SERVER;
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState<ProductData>();
  const { id } = useParams();
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await checkLogin();
        setAuth(data);
        const res = await fetch(`${server}/products/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data2 = await res.json();
        setData(data2[0]);
      } catch (error) {
        console.error("Failed to check login status:", error);
      }
    };
    fetchData();
  }, [id]);

  const addToCart = async () => {
    if (auth.isAuthenticated) {
      try {
        const res = await fetch(`${server}/order-detail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product: data,
            quantity: quantity,
            user: auth.user,
          }),
        });
        
        if (res.ok) {
          // Hiển thị thông báo thành công
          toast.success(`Đã thêm ${data?.name} vào giỏ hàng`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error('Không thể thêm vào giỏ hàng. Vui lòng thử lại.', {
            position: "top-right",
          });
        }
      } catch (err) {
        console.error("Lỗi khi thêm vào giỏ hàng:", err);
        toast.error('Đã xảy ra lỗi. Vui lòng thử lại.', {
          position: "top-right",
        });
      }
    } else {
      toast.warning('Vui lòng đăng nhập để thêm vào giỏ hàng', {
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Thêm ToastContainer vào component */}
      <ToastContainer />
      
      <div className="flex p-10 gap-10">
        {/* Image Gallery */}
        <div className="flex flex-col gap-3">
          <img src={data?.image}
            alt={data?.name} className="w-96 rounded" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <img key={i} src={`/images/thumb${i}.jpg`} alt="Thumbnail" className="w-16 h-16 rounded cursor-pointer" />
            ))}
          </div>
        </div>
        
        <div className="max-w-md">
          <div>
            <h1 className="text-2xl font-bold mt-2">{data?.name}</h1>
            <p className="text-gray-600 text-lg">{data?.desc}</p>
          </div>
          
          {/* Pricing */}
          <div className="flex items-center gap-4 mt-4">
            <span className="text-red-500 text-2xl font-semibold">{data?.price?.toLocaleString('vi-VN')}</span>
            <span className="text-gray-400 line-through text-lg">{data?.price ? (data.price * 1.2).toLocaleString('vi-VN') : data?.price?.toLocaleString('vi-VN')}</span>
          </div>
          
          {/* Quantity Selection */}
          <div className="flex items-center gap-4 mt-4">
            <span className="text-gray-600">Số lượng:</span>
            <div className="flex items-center border rounded">
              <button 
                onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)}
                className="px-3 py-1 border-r"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 py-1 border-l"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <button 
            onClick={addToCart} 
            className="bg-red-600 text-white w-full h-[3rem] rounded-[0.5rem] mt-4 cursor-pointer"
          >
            Thêm vào giỏ hàng  {data?.price ? (data.price * quantity).toLocaleString('vi-VN') : '0'} VND
          </button>
          
          {/* Payment Options */}
          <button className="w-full h-[3rem] bg-indigo-600 text-white p-2 rounded-[0.5rem] mt-4">Mua ngay</button>
          <p className="text-center text-gray-500 mt-2 cursor-pointer">Xem thêm phương thức thanh toán</p>
          <div className="items-center gap-4 mt-10">
            <h2 className="text-[1rem] font-bold">Thông tin sản phẩm</h2>
            <p className="text-gray-600 text-[16px]">{data?.detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;