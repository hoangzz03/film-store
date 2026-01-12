import React, { useEffect, useState, useCallback } from "react";
import ItemProduct from "../../components/ItemProduct";
import { getAllProduct, getProductsByCategory } from "./utils/product.utils";
import { useSearchParams } from "react-router-dom";
import { ProductData } from "../../types";
import PsShop from "../../components/hero2";
const ProductsPage: React.FC = () => {
    const [data, setData] = useState<ProductData[]>([]);
    const [filteredData, setFilteredData] = useState<ProductData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get("idCate");
    const searchQuery = searchParams.get("search") || "";

    // Tải dữ liệu sản phẩm ban đầu
    useEffect(() => {
        const fetchData = async () => {
            console.log(categoryParam);
            setLoading(true);
            try {
                if (!categoryParam) {
                    const result = await getAllProduct();
                    setData(result);
                    console.log("all");
                    console.log(result);
                } else {
                    const result = await getProductsByCategory(parseInt(categoryParam));
                    setData(result);
                    console.log("cate");
                    console.log(result);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [categoryParam]);

    // Hàm lọc sản phẩm theo từ khóa tìm kiếm
    const filterProducts = useCallback((query: string) => {
        if (!query.trim()) {
            return setFilteredData(data);
        }
        
        const searchTerms = query.toLowerCase().split(' ');
        const filtered = data.filter(product => {
            const name = product.name.toLowerCase();
            // const description = product.desc?.toLowerCase() || '';
            
            // Kiểm tra nếu sản phẩm chứa ít nhất một từ trong từ khóa tìm kiếm
            return searchTerms.some(term => 
                name.includes(term) 
            );
        });
        
        setFilteredData(filtered);
    }, [data]);

    // Lọc sản phẩm khi từ khóa tìm kiếm thay đổi
    useEffect(() => {
        filterProducts(searchQuery);
    }, [searchQuery, filterProducts]);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <PsShop></PsShop>
            <div className="container">
                <h1 className="text-2xl font-bold mb-6 mt-4">
                    {searchQuery ? `Kết quả tìm kiếm: "${searchQuery}"` : "Tất Cả Sản Phẩm"}
                </h1>

                {/* Hiển thị loading nếu chưa có dữ liệu */}
                {loading ? (
                    <p className="text-center text-gray-500 text-lg">Đang tải dữ liệu...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => <ItemProduct data={item} key={item.id} />)
                        ) : (
                            <p className="text-center col-span-3 text-gray-500">
                                Không có sản phẩm nào phù hợp với tìm kiếm
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;