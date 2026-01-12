export interface ProductData {
    id: string;
    name: string;
    price: number;
    desc: string;
    image: string;
    detail: string;
    productCategory: {
        id: string;
        name: string;
    }
}


export interface OrderDetails {
    id: string;
    quantity: number;
    product: ProductData;
    user: {
        id: string;
        name: string;
        email: string;
        address: string;
        phone: string;
    }
}

export interface User {
    id: string;
    username: string;
    email: string;
    address: string;
    phone: string;
    password: string;
    avatar: string;
    createat: string;
    role: {
        id: number;
        name: string;
    }
    orderDetails: OrderDetails[]
    payments: []
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}
export interface PaymentData {
    id: number;
    amount: number;
    message: string;
    payUrl: string;
    resultCode: number;
    user: {
        id: string;
        username: string;
        email: string;
        address: string;
        phone: string;
    }
    orderId: string;
    createat: string;
}
