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
  variantID: number;
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

export interface ProductByIdResponse {
  data: ProductDTO;
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

// NOTE  - Order

export interface item {
  variantId: number;
  quantity: number;
}
export interface OrderDto {
  fullName?: string;
  phone?: string;
  address?: string;
  province?: string;
  district?: string;
  subdistrict?: string;
  zipcode?: string;
  items?: item[];
  orderID?: number;
  status?: string;
  totalPrice?: number;
  user?: number;
}

export interface OrderResponseDto {
  data: OrderDto;
  message: string;
  success: boolean;
}

export interface Coupon {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  Code: string;
  DiscountAmount: number;
  ExpiredAt: string;
}

export interface OrderItemResponse {
  variantID: number;
  productName: string;
  size: string;
  quantity: number;
  priceAtPurchase: number;
}

export interface OrderDtoById {
  orderID?: number;
  status?: string;
  fullName?: string;
  phone?: string;
  address?: string;
  province?: string;
  district?: string;
  subdistrict?: string;
  zipcode?: string;
  user?: number;
  totalPrice?: number;
  coupon?: Coupon;
  orderItem?: OrderItemResponse[];
  paymentExpireAt?: string;
  createdAt?: string;
}

export interface OrderByIdResponse {
  data: OrderDtoById;
  message: string;
  success: boolean;
}

export interface OrderAllByUserId {
  orderID: number;
  totalPrice: number;
  status: string;
  itemCount: number;
  createdAt: dayjs.Dayjs;
}

export interface OderAllByUserIdResponse {
  data: OrderAllByUserId[];
  message: string;
  success: boolean;
}

export interface UpdateStatusOrderDTO {
  orderId: number;
  status: string;
}

export interface OrderItemDTO {
  variantID: number;
  productName: string;
  size: string;
  quantity: number;
  priceAtPurchase: number;
}
export interface OrderAllByAdminDTO {
  orderID: number;
  createdAt: dayjs.Dayjs;
  userName: string;
  status: string;
  totalPrice: number;
  orderItem: OrderItemDTO[];
}

export interface OrderAddByAdminResponse {
  data: OrderAllByAdminDTO[];
  message: string;
  success: boolean;
}

// NOTE - Payment
export interface PaymentIntentDto {
  amount: number;
  orderId: number;
  userId: number;
}

// NOTE - Dashboard
export type DashboardSummaryDTO = {
  orderTotal: number;
  ordersThisMonth: number;
  ordersLastMonth: number;
  orderGrowthPercent: number;

  revenueThisMonth: number;
  revenueLastMonth: number;
  revenueGrowthPercent: number;

  customersThisMonth: number;
  customersLastMonth: number;
  customerGrowthPercent: number;

  statusPending: number;
  statusPaid: number;
  statusShipped: number;
  statusCancel: number;
};
export interface summaryDashboardResponse {
  data: DashboardSummaryDTO;
  message: string;
  success: boolean;
}
