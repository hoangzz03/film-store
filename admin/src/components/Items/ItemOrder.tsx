import { PaymentData } from '../../types';
interface PaymentProps {
  data: PaymentData,
  handleDelete: (id: number) => void
}
const ItemOrder: React.FC<PaymentProps> = ({ data, handleDelete }) => {
  console.log(data);
  const handleDeleteOrder = (id: number) => {
    handleDelete(id);
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{data.id}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{data.user?.username}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{data.createat}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{data.amount.toLocaleString('vi-VN')} VND</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{data.message}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          className="text-red-600 hover:text-red-900 cursor-pointer"
          onClick={() => handleDeleteOrder(+data.id)}
        >Delete</button>
      </td>
    </tr>
  )
}

export default ItemOrder
