export const getAllProduct = async () => {
    try {
        const response = await fetch("http://localhost:3000/products",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching", error);
    }
}
export const getAllCategory = async () => {
    try {
        const response = await fetch(`http://localhost:3000/product-category`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching products by category:", error);
    }
};
// export const getProductsByCategory = async (productCategoryId: number) => {
//     try {
//         const response = await fetch(`http://localhost:3000/products/productCate/${productCategoryId}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching products by category:", error);
//     }
// };
export const getCategoryById = async (id: number) => {
    try {
        console.log(`Fetching category for ID: ${id}`); // Debug ID
        const response = await fetch(`http://localhost:3000/product-category/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Category data for ID ${id}:`, data); // Debug data
        return data;
    } catch (error) {
        console.error("Error fetching", error);
    }
};
