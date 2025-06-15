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

export type CategoryResponseDTO = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null;
  Name: string;
  Slug: string;
};

// NOTE - Products

export type ProductBodyDTO = {
  name: string;
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
