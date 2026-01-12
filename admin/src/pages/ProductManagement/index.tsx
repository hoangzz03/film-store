import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, useMemo } from 'react';
import { getAllProduct } from './utils/productMana.utils';
import ItemProduct from '../../components/Items/ItemProduct';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ProductData } from '../../types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterBy] = useState<'all' | 'name' | 'email' | 'role' | 'status'>('all');
  const [data, setData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let result = await getAllProduct();
      setData(result);
      // console.log(result);

    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success('Xóa sản phẩm thành công!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setData((prevData) => prevData.filter((product) => +product.id !== id));
      } else {
        toast.error('Xóa thất bại. Vui lòng thử lại.', {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    fetchProducts()
  }, []);
  //Filter users based on search term
  const filteredProduct = useMemo(() => {
    if (!searchTerm.trim()) return data;

    const term = searchTerm.toLowerCase();

    return data.filter(product => {
      if (filterBy === 'name') return product.name.toLowerCase().includes(term);

      // 'all' case - search in all fields
      return (
        product.name.toLowerCase().includes(term)
      );
    });
  }, [data, searchTerm, filterBy]);
  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Product Management</h1>
        <Button>
          <Link to={'add'}>
            Thêm mới sản phẩm
          </Link>
        </Button>
      </div>
      {/* Search input */}
      <div className="mb-6 bg-white p-4 rounded-md shadow">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="relative flex-grow mb-3 md:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search Products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {/* Results summary */}
        <div className="mt-2 text-sm text-gray-500">
          {/* Showing {filteredUsers.length} of {users.length} users */}
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <Table>
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Desc</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detail</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ProductCategory</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center text-gray-500 text-lg">Đang tải dữ liệu...</td>
              </tr>
            ) : filteredProduct.length > 0 ? (
              filteredProduct.map((product) => (
                <ItemProduct data={product} key={product.id} handleDelete={handleDelete} />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                  No users found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Products;