
interface User {
    id: string;
    username: string;
    email: string;
    // Add other user properties as needed
  }
  
  interface LoginResponse {
    message: string;
    user: User;
  }
  
  export const login = async ({ email, password }: { email: string; password: string }) => {
  try {
    if (!email || !password) {
      return { message: "Vui lòng nhập đầy đủ email và mật khẩu." };
    }
    
    const requestBody = { email, password };
    
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      credentials: "include"
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return { message: errorData.message || `Lỗi HTTP: ${response.status}` };
    }
    
    const data = await response.json();
    console.log("Login response:", data.user);
    
    // Kiểm tra xem người dùng có phải là admin không
    if (!data.user || data.user.role.name !== 'Admin') {
      return { message: "Chỉ tài khoản admin mới được phép truy cập hệ thống này." };
    }
    
    return data as LoginResponse;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi khi đăng nhập";
    return { message: errorMessage };
  }
};
  
  export const checkLogin = async () => {
    const res = await fetch("http://localhost:3000/auth/check-login", {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
    if (data.isAuthenticated) {
      console.log("Người dùng đã đăng nhập:", data);
    } else {
      console.log(data);
    }
    return data;
  }
  
  export const logout = async () => {
    const res = await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  
    const data = await res.json();
    console.log(data.message);
    window.location.reload();
  }
  