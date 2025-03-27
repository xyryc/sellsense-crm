// types for Customer
export interface Customer {
    _id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    createdAt: string
}

export interface Orders {
    _id: string;
    customerName: string;
    customerEmail: string;
    customerLocation: string;
    productName: string;
    productPrice: number;
    totalPrice: number;
    totalQuantity: number;
    category: string;
    brand: string;
    orderDate: string;
    createdAt: string
}

export interface Products {
    _id: string;
    name: string;
    description: string;
    price: number;
    discount: number
    stock: number
    category: string;
    brand: string;
    rating: number;
    reviews: number;
    warranty: string;
    return_policy: string;
    createdAt: string;
}