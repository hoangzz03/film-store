import React from 'react';
import { AppstoreOutlined, MailOutlined, } from '@ant-design/icons';
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineLocalPhone } from "react-icons/md";
import { Link } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'sub1',
        label: 'Trang chủ',
        icon: <IoHomeOutline />,
        children: [
            {
                key: 'g1',
                label: 'Home',
                type: 'group',
                children: [
                    { key: '1', label: <Link to="/">Về trang chủ</Link> },
                ],
            },

        ],
    },
    {
        key: 'sub2',
        label: 'Sản phẩm',
        icon: <AiOutlineProduct />,
        children: [
            { key: '5', label: <Link to="/products">Tất cả sản phẩm</Link> },
            { key: '6', label: <Link to="/products?idCate=1">Máy film 135(Tlr, Pns)</Link> },
            { key: '7', label: <Link to="/products?idCate=2">Máy film 120(Medium Format)</Link> },
            { key: '8', label: <Link to="/products?idCate=3">Film</Link> },
            // {
            //     key: 'sub3',
            //     label: 'Submenu',
            //     children: [
            //         { key: '7', label: 'Option 7' },
            //         { key: '8', label: 'Option 8' },
            //     ],
            // },
        ],
    },
    {
        type: 'divider',
    },
    {
        key: 'sub4',
        label: 'Blog',
        icon: <AppstoreOutlined />,
        children: [
            { key: '9', label: <Link to="/blog">Hiện tại chưa viết viết gì</Link> },

        ],
    },
    {
        key: 'grp',
        label: 'Contact',
        type: 'group',
        children: [
            { key: '13', icon: <MdOutlineLocalPhone />, label: '0944342203' },
            { key: '14', icon: <MailOutlined />, label: 'vintage.analog@gmail.com' },
        ],
    },
];

const Sidebar: React.FC = () => {
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };

    return (
        <Menu
            onClick={onClick}
            style={{
                width: 256,
                position: 'fixed',
                height: 'calc(100vh - 90px)',
                zIndex: 100,
                left: 0,
                top: 90,
                transition: 'all 0.3s ease',
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    );
};

export default Sidebar;