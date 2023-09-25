export class User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  customerID?: any;
  firstName: string;
  lastName: string;
  password: string;
  secondLastName: string;
  image?: any;
}

export interface Media {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata?: any;
  created_at: string;
  updated_at: string;
}

interface Formats {
  thumbnail: Thumbnail;
}

interface Thumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: any;
  url: string;
}

interface Role {
  id: number;
  name: string;
  description: string;
  type: string;
}
