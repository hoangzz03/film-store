import React from 'react';
import { Link } from 'react-router-dom';
import { PiSealCheck } from "react-icons/pi";

const SuccessPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-green-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className='flex justify-center'>
                    <h1 className="text-4xl font-bold text-green-600 mb-4">HOÀN THÀNH </h1>
                    <h1> <PiSealCheck className="text-green-600 w-6 h-6 ml-2" /></h1></div>
                <p className="text-lg text-gray-700 mb-6">CHÚC MỪNG BẠN ĐÃ ĐẶT HÀNG THÀNH CÔNG!!!</p>
                <Link to={'/products'} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Tiếp tục mua sắm nào
                </Link>
            </div>
        </div>
    );
};

export default SuccessPage;