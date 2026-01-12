import React, { useState } from 'react';
import { OrderDetails } from '../types';

interface OrderProps {
    orderData: OrderDetails;
    updateQuantity: (id: number, change: number) => void;
    removeItem: (id: number) => void;
}

const ItemCard: React.FC<OrderProps> = ({ orderData, updateQuantity, removeItem }) => {

    const Decrease = (id: number) => {
        updateQuantity(id, -1);
    };
    const Increase = (id: number) => {
        updateQuantity(id, 1);
    }
    const handleRemove = (id: number) => {
        removeItem(id);
    }

    return (
        <div className="border rounded-lg p-4 flex justify-between items-center bg-gray-50 mb-6">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <img src={orderData.product?.image} alt="Product" className="w-20 h-20 rounded-lg object-cover" />
                    <button onClick={() => handleRemove(+orderData.id)} className="absolute top-0 left-0 bg-gray-700 text-white text-xs px-2 py-1 rounded-bl-md cursor-pointer">Xóa</button>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">{orderData.product?.name}</h3>
                    <p className="text-gray-500 font-bold">{orderData.product?.price.toLocaleString('vi-VN')}₫</p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <span className="text-lg font-bold">{(orderData.product?.price * orderData.quantity).toLocaleString('vi-VN')}₫</span>
                <div className="flex items-center border rounded-lg">
                    <button onClick={() => Decrease(+orderData.id)} className="px-2 py-1 border-r">-</button>
                    <input
                        type="text"
                        value={orderData.quantity}
                        className="w-6 text-center border-none outline-none"
                        readOnly
                    />
                    <button onClick={() => Increase(+orderData.id)} className="px-2 py-1 border-l">+</button>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
