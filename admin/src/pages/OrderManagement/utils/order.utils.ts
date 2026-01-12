export const getAllOrder = async () => {
    try {
        const response = await fetch("http://localhost:3000/payments",
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