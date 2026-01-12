import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { AuthState, UpdateProfileFormData } from '../../types';
import { checkLogin } from '../Auth/utils/login.utils';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
    const [auth, setAuth] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
    });
    const [formData, setFormData] = useState<UpdateProfileFormData>({
        username: '',
        email: '',
        phone: '',
    });
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await checkLogin();
                if (!data.isAuthenticated) return;
                setAuth(data);

                if (data) {
                    setFormData({
                        username: data.user.username || '',
                        email: data.user.email || '',
                        phone: data.user.phone || '',
                    });
                }
            } catch (error) {
                console.error('Failed to check login status:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: any) => {
        const server = import.meta.env.VITE_SERVER;
        e.preventDefault();
        try {
            const response = await fetch(`${server}/users/${auth.user?.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await response.json();

            if (response.ok && result.user) {
                setAuth({
                    isAuthenticated: true,
                    user: result.user,
                });
                localStorage.setItem("auth", JSON.stringify({
                    isAuthenticated: true,
                    user: result.user,
                }));
                setSuccess("Cập nhật thành công!");
                setTimeout(() => navigate("/"), 1500);
            } else {
                setError(result.message || "Update failed");
            }
        } catch (error) {
            console.error("Update error:", error);
            setError("Có lỗi xảy ra!");
        }
    };



    if (!auth.isAuthenticated) {
        return <p className="text-center mt-10">Bạn cần đăng nhập để xem trang này.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                            Phone number
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Edit Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
