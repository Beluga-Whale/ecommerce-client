import * as dayjs from "dayjs";

// NOTE - Auth
export type LoginBodyDTO = {
  email: string;
  password: string;
};

export type signUpBodyDTO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  birthDate: dayjs.Dayjs;
};

// NOTE - Category
export type CreateCategoryDTO = {
  name: string;
};

export type CategoryDTO = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null;
  Name: string;
  Slug: string;
};

export type CategoryResponseDTO = {
  data: CategoryDTO[];
  message: string;
  success: boolean;
};

// NOTE - Products

export type ProductBodyDTO = {
  name: string;
  title: string;
  description: string;
  images: ImagesBodyDTO[];
  isFeatured: boolean;
  isOnSale: boolean;
  salePrice: number;
  categoryId: number;
  variants: variantsDTO[];
};

export type variantsDTO = {
  size: string;
  stock: number;
  sku: string;
  price: number;
};

export type ImagesBodyDTO = {
  url: string;
};

export interface ProductImage {
  url: string;
}

export interface ProductVariant {
  size: string;
  stock: number;
  sku: string;
  price: number;
  finalPrice?: number;
}

export interface ProductDTO {
  id: number;
  name: string;
  title: string;
  description: string;
  images: ProductImage[];
  variants: ProductVariant[];
  isFeatured: boolean;
  isOnSale: boolean;
  salePrice?: number;
  categoryID: number;
}

export interface ProductAllResponse {
  data: {
    limit: number;
    page: number;
    pageTotal: number;
    products: ProductDTO[];
  };
  message: string;
  success: boolean;
}

type ProductNoId = Omit<ProductDTO, "id">;
export interface ProductByIdResponse {
  data: ProductNoId;
  message: string;
  success: boolean;
}

// NOTE -

export interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}
