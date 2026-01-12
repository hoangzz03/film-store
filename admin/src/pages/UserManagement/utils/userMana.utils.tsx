export const getAllUser = async () => {
    try {
        const response = await fetch("http://localhost:3000/users",
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
export const getRoleById = async (id: number) => {
    try {
        console.log(`Fetching category for ID: ${id}`); // Debug ID
        const response = await fetch(`http://localhost:3000/roles/${id}`, {
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
