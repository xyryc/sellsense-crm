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