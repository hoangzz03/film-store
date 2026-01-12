import React, { useEffect, useState } from 'react';
import ItemCard from '../../components/ItemCard';
import { AuthState, OrderDetails } from '../../types';
import { checkLogin } from '../Auth/utils/login.utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage: React.FC = () => {
    const server = import.meta.env.VITE_SERVER;
    const [orderItems, setOrderItems] = useState<OrderDetails[]>([]);
    const [auth, setAuth] = useState<AuthState>({
        isAuthenticated: false,
        user: null
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await checkLogin();
                setAuth(data);
                const response = await fetch(`${server}/order-detail/user/${data.user?.id}`);
                const data2 = await response.json();
                setOrderItems(data2);
            } catch (error) {
                console.error("Failed to check login status:", error);
            }
        };
        fetchData();
    }, []);
    const removeItem = async (id: number) => {
        await fetch(`${server}/order-detail/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        setOrderItems(orderItems.filter(item => +item.id !== id));
    };
    const updateQuantity = async (id: number, change: number) => {
        if (change === 1) {
            await fetch(`${server}/order-detail/add-quantity/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else if (change === -1) {
            await fetch(`${server}/order-detail/remove-quantity/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            orderItems.map(item =>
                +item.id === id ? (
                    item.quantity <= 1 ? (
                        removeItem(+item.id)
                    ) : ('')
                ) : ('')
            )
            console.log(orderItems[0].quantity);
        }
        setOrderItems(orderItems.map(item =>
            +item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
        ));
    };

    const getTotal = () => {
        console.log('====================================');
        console.log(orderItems);
        console.log('====================================');
        if (orderItems.statusCode === 500) {
            return 0;
        }
        return orderItems ? orderItems.reduce((total, item) => total + (item.product?.price * item.quantity), 0) : orderItems;
    };
    const checkOut = async () => {
        console.log(orderItems.length);

        if (orderItems.length == 0) {
            toast.error("vui lòng thêm sản phẩm vào giỏ hàng", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            const res = await fetch(`${server}/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: getTotal() / 100,
                })
            })
            const data = await res.json();
            const res3 = await fetch(`${server}/check-status-transaction`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: data.orderId,
                })
            })
            const data3 = await res3.json();
            console.log(data3);
            const res2 = await fetch(`${server}/payments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: data.orderId,
                    amount: getTotal() / 100,
                    user: orderItems[0].user,
                    payUrl: data.payUrl,
                    resultCode: data3.resultCode,
                    message: data3.message,
                })
            })
            const data2 = await res2.json();
            console.log(data2);

            window.location.href = data2.payUrl;
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
            <ToastContainer />
            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
                {/* Header */}
                <h2 className="text-2xl font-bold mb-2">Giỏ hàng của bạn</h2>
                <p className="mb-4">Bạn đang có <span className="font-bold">{orderItems.length} sản phẩm</span> trong giỏ hàng</p>

                {/* Cart Item */}
                {auth.user ? (orderItems.map((item, index) => (
                    <ItemCard orderData={item} key={index} updateQuantity={updateQuantity} removeItem={removeItem} />
                ))) : ('')}
                {/* Order Note */}
                <div className="border rounded-lg p-4 bg-gray-100 mb-6">
                    <h3 className="font-semibold mb-2">Ghi chú đơn hàng</h3>
                    <textarea className="w-full border p-2 rounded-lg" rows={3} placeholder="Nhập ghi chú..."></textarea>
                    <label className="flex items-center mt-4 cursor-pointer">
                        <input type="checkbox" className="mr-2" />
                        Xuất hóa đơn cho đơn hàng
                    </label>
                </div>

                {/* Delivery Options */}
                <div className="flex items-center gap-6">
                    <div className="border rounded-lg p-4 bg-gray-50 w-1/2">
                        <h3 className="font-semibold mb-2">THỜI GIAN GIAO HÀNG</h3>
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" name="delivery" className="mr-2" />
                                Giao khi có hàng
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" name="delivery" className="mr-2" />
                                Chọn giờ hành chính
                            </label>
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-col justify-center text-gray-600 text-sm">
                        <p>• Phí vận chuyển sẽ được tính ở trang thanh toán, vui lòng thanh toán trước 24h.</p>
                        <p>• Giờ hành chính từ 7h30 đến 17h hằng ngày từ thứ 2 tới thứ 6.</p>
                    </div>
                </div>

                {/* Total Amount */}
                <div className="flex justify-between items-center text-lg font-semibold my-4">
                    <span>Tổng tiền:</span>
                    <span className="text-red-500 text-xl">{getTotal().toLocaleString('vi-VN')}</span>
                </div>
                <div className='flex '>
                    <button onClick={checkOut} className="w-full text-center cursor-pointer bg-red-500 text-white py-3 rounded-lg text-lg font-bold hover:bg-red-700 transition">
                        THANH TOÁN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
