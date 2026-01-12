import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LoginFormData } from '../../../types';
import { login } from '../utils/login.utils';


const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [error, setError] = useState<string>('');

    // Lấy email từ cookie nếu có
    useEffect(() => {
        const savedEmail = Cookies.get('register_email');
        if (savedEmail) {
            setFormData(prev => ({ ...prev, email: savedEmail }));
            Cookies.remove('register_email');
        }
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prev: LoginFormData) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const result = await login(formData);
            if (result.message === 'Đăng nhập thành công!' && result.user) {
                console.log("Đăng nhập thành công!");
                navigate('/');
            } else {
                setError(result.message || 'Login failed');
            }
        } catch (err: any) {
            console.error("Login error:", err);
            const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
            setError(errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/ps1.jpg')" }}>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                            aria-label="Email Address"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your password"
                            aria-label="Password"
                        />
                    </div>
                    <div className='flex justify-center mb-8'>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-60">
                            Đăng nhập
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-between">
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-red-400" href="/forgot-password">
                        Quên mật khẩu?
                    </a>
                    <a href='/register'>
                        <button type="button" className="bg-green-400 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Đăng ký
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
