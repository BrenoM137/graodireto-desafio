// frontend/src/types/apiResponses.ts
export interface User {
    _id: string;
    username: string;
    email: string;
    address: string;
    phone: string;
}

export interface LoginResponse {
    msg: string;
    token: string;
    user: User;
}