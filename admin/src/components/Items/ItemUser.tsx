import React from 'react';
import { User } from '../../types';
interface UserProps {
    data: User,
    handleDelete: (id: number) => void
}
const ItemUser: React.FC<UserProps> = ({ data, handleDelete }) => {
    const handleDeleteUser = (id: number) => {
        handleDelete(id);
    }
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{data.id}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                    {
                        (
                            data.avatar ? (
                                <img className="h-10 w-10 object-cover" src={data.avatar} alt="" />
                            ) : (
                                <div className="h-10 w-10 flex items-center justify-center text-lg text-gray-700 dark:text-gray-300">
                                    {data.username ? data.username.charAt(0).toUpperCase() : '?'}
                                </div>
                            )
                        )
                    }
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{data.username}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{data.address}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{data.email}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{data.phone}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{data.role?.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                    className="text-red-600 hover:text-red-900"
                onClick={() => handleDeleteUser(+data.id)}
                >Delete</button>
            </td>
        </tr >
    )
}

export default ItemUser
