export interface UserNetpayPayload {
    data: UserNetpay;
    error: boolean;
    found: boolean;
}

export interface UserNetpay {
    id: string;
    clientId: number;
    storeIdAdq: number;
    name: string;
    phone: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    countSubscription: number;
    paymentSources?: PaymentSource[];
}

export interface PaymentSource {
    card?: Card;
    source?: string;
    type?: string;
}

export interface Card {
    cardPrefix?: string;
    lastFourDigits?: string;
}