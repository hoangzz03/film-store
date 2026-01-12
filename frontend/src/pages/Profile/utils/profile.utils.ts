const server = import.meta.env.VITE_SERVER;

export const update = async (userId: string, data: any) => {
    const response = await fetch(`${server}/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json(); // { message, user }
};

