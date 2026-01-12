import React, { useState } from 'react';
import { register } from '../utils/register.utils';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register: React.FC = () => {
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!address || !phone || !email || !username || !password) {
            setError('Please fill in all fields');
            return;
        }
    
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Invalid email format');
            return;
        }
    
        if (!/^\d{10,}$/.test(phone)) {
            setError('Invalid phone number');
            return;
        }
    
        setError('');
        const data = await register(username, email, password, phone, address);
        console.log("data:", data);
    
        if (data) {
            Cookies.set('register_email', email, { expires: 0.01 }); // 0.01 ~ 15 phút
            toast.success('Đăng ký thành công!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            setTimeout(() => {
                navigate(`/login?email=${encodeURIComponent(email)}`);
            }, 1000); // chờ 1s rồi mới chuyển
        } else {
            toast.error('Đăng ký thất bại! Vui lòng thử lại', {
                position: "top-right",
              });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/ps1.jpg')" }}>
            <ToastContainer />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input name='username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" placeholder="Enter your username" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input name='address' type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" placeholder="Enter your address" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone Number</label>
                        <input name='phone' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" placeholder="Enter your phone number" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input name='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" placeholder="Enter your email" />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input name='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" placeholder="Enter your password" />
                    </div>
                    <div className='flex justify-center mb-8'>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-60">
                            Register
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <a href="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-red-400">
                            Already have an account? Sign In
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
