// src/components/layout/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    HomeIcon,
    UsersIcon,
    ShoppingCartIcon,
    CubeIcon,
    Cog6ToothIcon as CogIcon
} from '@heroicons/react/24/outline';

interface NavItem {
    name: string;
    path: string;
    icon: React.ComponentType<React.ComponentProps<'svg'>>;
}

const Sidebar: React.FC = () => {
    const navItems: NavItem[] = [
        { name: 'Dashboard', path: '/', icon: HomeIcon },
        { name: 'Quản lý người dùng', path: '/users', icon: UsersIcon },
        { name: 'Quản lý đơn hàng', path: '/orders', icon: ShoppingCartIcon },
        { name: 'Quản lý sản phẩm', path: '/productmanagement', icon: CubeIcon },
        { name: 'Doanh thu', path: '/revenue', icon: CogIcon },
    ];

    return (
        <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64">
                <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
                    <div className="flex items-center justify-center flex-shrink-0 px-4">
                        <span className="text-xl font-semibold">Admin Dashboard</span>
                    </div>
                    <div className="mt-10">
                        <nav className="px-2 space-y-1">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `group flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive
                                            ? 'bg-[#317db4] text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`
                                    }
                                >
                                    <item.icon
                                        className="mr-3 flex-shrink-0 h-6 w-6"
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;