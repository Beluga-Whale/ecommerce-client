import * as dayjs from "dayjs";

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
