import { Link } from 'react-router-dom';

const ItemBlog = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Pentax 17 - The New Half-Frame Point & Shoot</h2>
            <img className="hover:scale-110 transition-transform duration-400" src='public/blog1.webp' />
            <p className="text-gray-700">Film photography is making a comeback, and there's a new player in town that promises to elevate your analog experience—meet the Pentax 17. This ca...</p>
            <Link to=''  className='relative hover:text-gray-500 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-500 after:transition-all after:duration-300 hover:after:w-full'>Đọc thêm</Link>
        </div>
    )
}

export default ItemBlog
