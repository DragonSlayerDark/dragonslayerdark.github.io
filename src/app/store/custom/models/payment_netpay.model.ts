export interface PaymentNetpay {
  source: string;
  amount: number;
  description: string;
  status: string;
  transactionTokenId: string;
  redirect3dsUri: string;
  returnUrl?: string;
  paymentMethod: string;
  currency: string;
  createdAt: string;
  error?: any;
  installments?: any;
  ship?: any;
  client?: any;
  saveCard: boolean;
  instegrationsdk?: any;
  integrationSdkVersion?: any;
  cvv?: any;
  merchantRefCode?: any;
  tokenRequestDTO?: any;
  transactionType?: any;
  surcharge?: any;
  tokenAmount?: any;
  expiryDate?: any;
  seamless: boolean;
  paymentSource: PaymentSource;
  billing: Billing;
}

interface Billing {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ipAddress: string;
  merchantReferenceCode: string;
  address: Address;
}

interface Address {
  city: string;
  country: string;
  postalCode: string;
  state: string;
  street1: string;
  street2?: any;
}

interface PaymentSource {
  cardDefault: boolean;
  card: Card;
  source: string;
  type: string;
}

interface Card {
  token: string;
  expYear: string;
  expMonth: string;
  lastFourDigits: string;
  cardHolderName: string;
  brand: string;
  deviceFingerPrint: string;
  ipAddress: string;
  bank: string;
  type: string;
  country: string;
  scheme: string;
  cardPrefix: string;
  preAuth: boolean;
  vault: boolean;
  simpleUse: boolean;
  integrationSdkVersion: string;
}