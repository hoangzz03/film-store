import React, { useEffect, useState } from "react";
import ItemProduct from "../../components/ItemProduct";
import ItemBlog from "../../components/ItemBlog";
import { getAllProduct } from "../Products/utils/product.utils";
import { Link } from 'react-router-dom';
import { AuthState, Payment, ProductData, UserFull } from "../../types";
import { checkLogin } from "../Auth/utils/login.utils";
import HeroImageSlider from "../../components/heroImageSlider";
const Home = () => {
    const [data, setData] = useState<ProductData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<UserFull>()
    const [auth, setAuth] = useState<AuthState>();
    const server = import.meta.env.VITE_SERVER;

    useEffect(() => {
        const checkout = async () => {
            const data = await checkLogin();
            setAuth(data);
            const data2 = await fetch(`${server}/users/${data.user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.accessToken}`
                }
            })
            const res = await data2.json();
            setUser(res);
            console.log(1);
            res.payments.map(async (payment: Payment) => {
                console.log(payment.orderId);

                let data3 = await fetch(`${server}/check-status-transaction`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${data.accessToken}`
                    },
                    body: JSON.stringify({
                        orderId: payment.orderId
                    })
                })
            })
            console.log(2);
        }
        checkout()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllProduct();
                setData(result);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [getAllProduct]); // Đảm bảo useEffect theo dõi đúng dependency
    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
            {/* Hero Image */}
            <HeroImageSlider></HeroImageSlider>

            {/* About Us Section */}
            <div className="w-full flex flex-col items-center mt-6">
                <h1 className="text-3xl font-bold text-center">About Us</h1>

                <div className="flex flex-col md:flex-row items-center gap-x-8 mt-6">
                    <img src="/pshome3.webp" alt="collect" className="w-[25rem] h-[20rem] object-cover" />
                    <p className="max-w-2xl text-l leading-relaxed text-justify">
                        Chào mừng bạn đến với <b>Vintage.analog</b> – nơi dành riêng cho những tâm hồn yêu nhiếp ảnh film!
                        <br /><br />
                        Chúng tôi không chỉ bán máy ảnh film, mà còn chia sẻ niềm đam mê với bộ môn nghệ thuật đầy hoài niệm này.
                        Tại đây, bạn sẽ tìm thấy những chiếc máy ảnh cổ điển, cuộn film chất lượng và cả những phụ kiện cần thiết để biến từng khoảnh khắc thành tác phẩm nghệ thuật thực thụ.
                        <br /><br />
                        Với đội ngũ giàu kinh nghiệm và lòng nhiệt huyết, chúng tôi sẵn sàng tư vấn, hỗ trợ bạn trong hành trình khám phá thế giới ảnh film.
                        <br /><br />
                        <b>Hãy cùng chúng tôi giữ lửa cho nhiếp ảnh film – vì những khoảnh khắc đáng nhớ xứng đáng được lưu giữ theo cách nguyên bản nhất!</b>
                    </p>
                </div>
            </div>

            <div className="mt-12 w-full">
                <h2 className="text-2xl font-bold text-center mb-4">Sản phẩm nổi bật</h2>
                {loading ? (
                    <p className="text-center text-gray-500 text-lg">Đang tải dữ liệu...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.length > 0 ? (
                            data.slice(0, 3).map((item) => <ItemProduct data={item} key={item.id} />)
                        ) : (
                            <p className="text-center col-span-3 text-gray-500">
                                Không có sản phẩm nào
                            </p>
                        )}
                    </div>
                )}
            </div>
            <div className="mt-12 w-full">
                <h1 className="text-2xl font-bold text-center mb-4">Analog.Blog</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <ItemBlog key={index} />
                    ))}
                </div>
            </div>

            {/* Brands Section */}
            <div className="mt-12 w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Chúng tôi phân phối các dòng máy</h2>
                <div className="flex justify-center">
                    <img src="/pshome4.webp" alt="brands" className="max-w-full h-auto" />
                </div>
            </div>
        </div>
    );
};

export default Home;
