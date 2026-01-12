import React from 'react';
import { Link } from 'react-router-dom';
import { ProductData } from '../types';
interface ProductProps {
    data: ProductData
}

const ItemProduct: React.FC<ProductProps> = ({ data }) => {
    return (
        <Link to={`/detailproduct/${data.id}`} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <div>
                <img
                    src={data.image}
                    alt={data.name}
                    className="w-58 h-40 object-cover rounded-t-lg cursor-pointer hover:scale-105 transition-transform duration-500"

                />
            </div>
            <div className="mt-4 w-full flex flex-col">
                <h2 className="text-xl font-semibold">{data.name}</h2>
                <p className="text-gray-600 mt-2">{data.desc}</p>

                <div className="mt-4 flex flex-col justify-between items-center gap-2">
                    <div className='flex w-full justify-between items-center'>
                        <span className="text-lg font-bold">{data.price.toLocaleString('vi-VN')} VND</span>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded-lg cursor-pointer">
                        Add to Cart
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ItemProduct;
