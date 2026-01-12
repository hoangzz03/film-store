const server = import.meta.env.VITE_SERVER;
export const register = async (username: string, email: string, password: string, phone: string, address: string) => {
    try {
        const response = await fetch(`${server}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password, phone, address }),
        });

        if (!response.ok) {
            throw new Error(`Lỗi HTTP: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error);
        return null;
    }
};