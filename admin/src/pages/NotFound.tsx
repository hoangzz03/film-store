import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-500">404 - Không tìm thấy trang</h1>
            <p className="text-gray-600 mt-2">Trang bạn đang tìm không tồn tại.</p>
            <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Quay lại trang chủ
            </Link>
        </div>
    );
};

export default NotFound;
