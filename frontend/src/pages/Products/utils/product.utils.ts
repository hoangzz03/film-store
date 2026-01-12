const server = import.meta.env.VITE_SERVER;

export const getAllProduct = async () => {
    try {
        const response = await fetch(`${server}/products`,
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
export const getProductsByCategory = async (productCategoryId: number) => {
    try {
        const response = await fetch(`${server}/products/productCate/${productCategoryId}`, {
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
export const getProductById = async (id: number) => {
    try {
        const response = await fetch(`${server}/products/${id}`,
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

export const searchProducts = async (searchTerm: string) => {
    try {
        // Option 1: If you have a dedicated search endpoint on your backend
        const response = await fetch(`${server}/products/search?q=${encodeURIComponent(searchTerm)}`, {
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
        console.error("Error searching products:", error);
        throw error; // Re-throw to handle in the component
    }
};


export const searchProductsAdvanced = async (params: {
    searchTerm?: string,
    category?: number,
    minPrice?: number,
    maxPrice?: number,
    sortBy?: string
}) => {
    try {
        // Build query string from parameters
        const queryParams = new URLSearchParams();

        if (params.searchTerm) queryParams.append('q', params.searchTerm);
        if (params.category) queryParams.append('category', params.category.toString());
        if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString());
        if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
        if (params.sortBy) queryParams.append('sortBy', params.sortBy);

        const response = await fetch(`${server}/products/search?${queryParams.toString()}`, {
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
        console.error("Error searching products with advanced filters:", error);
        throw error;
    }
};