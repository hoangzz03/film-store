
import * as Tooltip from "@radix-ui/react-tooltip";
import { ProductData } from '../../types';
import { Link } from 'react-router-dom';
interface ProductProps {
  data: ProductData
  handleDelete: (id: number) => void
}
const ItemProduct: React.FC<ProductProps> = ({ data, handleDelete }) => {
  // console.log(data);
  const handleDeleteProduct = (id: number) => {
    handleDelete(id);
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{data.id}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{data.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <img src={data.image} alt="Product" className="w-12 h-12" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate">
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <span className="text-sm text-gray-500 cursor-pointer">
                {data.desc.length > 50 ? data.desc.substring(0, 30) + "..." : data.desc}
              </span>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="top"
                className="z-50 bg-gray-800 text-white px-3 py-2 rounded-md shadow-md max-w-xs"
              >
                {data.desc}
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{data.price.toLocaleString('vi-VN')} VND</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate">
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <span className="text-sm text-gray-500 cursor-pointer">
                {data.detail.length > 10 ? data.detail.substring(0, 30) + "..." : data.detail}
              </span>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="top"
                className="z-50 bg-gray-800 text-white px-3 py-2 rounded-md shadow-md max-w-xs"
              >
                {data.detail}
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{data.productCategory?.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link to={`edit/${data.id}`} className="text-[#317db4] hover:text-[#3163b4] mr-4 cursor-pointer">Edit</Link>
        <button
          className="text-red-600 hover:text-red-900 cursor-pointer"
          onClick={() => handleDeleteProduct(+data.id)}
        >Delete</button>
      </td>
    </tr>

  )
}

export default ItemProduct
