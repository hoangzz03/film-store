// src/pages/Users.tsx
import React, { useState, useMemo, useEffect } from 'react';
import ItemUser from '../../components/Items/ItemUser';
import { getAllUser } from './utils/userMana.utils';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { User } from '../../types';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users: React.FC = () => {

  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterBy, setFilterBy] = useState<'all' | 'name' | 'email' | 'role' | 'status'>('all');


  const fetchUsers = async () => {
    setLoading(true);
    try {
      let result = await getAllUser();
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
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success('Xóa sản tài khoản thành công!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setData((prevData) => prevData.filter((product) => +product.id !== id));
      } else {
        toast.error('Xóa tài khoản thất bại. Vui lòng thử lại.', {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    fetchUsers()
  }, []);

  //Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return data;

    const term = searchTerm.toLowerCase();

    return data.filter(user => {
      if (filterBy === 'name') return user.username.toLowerCase().includes(term);
      if (filterBy === 'email') return user.email.toLowerCase().includes(term);

      // 'all' case - search in all fields
      return (
        user.username.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    });
  }, [data, searchTerm, filterBy]);

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Users Management</h1>
        <Button>
          <Link to={'add'}>
            Thêm mới tài khoản
          </Link>
        </Button>
      </div>

      {/* Search and filter section */}
      <div className="mb-6 bg-white p-4 rounded-md shadow">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="relative flex-grow mb-3 md:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex-shrink-0">
            <label htmlFor="filterBy" className="sr-only">Filter by</label>
            <select
              id="filterBy"
              className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as any)}
            >
              <option value="all">All Fields</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="role">Role</option>
              <option value="status">Status</option>
            </select>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RoleId</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center text-gray-500 text-lg">Đang tải dữ liệu...</td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <ItemUser data={user} key={user.id} handleDelete={handleDelete} />
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

export default Users;