export type User = {
    id?: number;
    phone?: string;
    email: string;
    password: string;
    delayNotification: boolean;
    isAdmin: boolean;
}