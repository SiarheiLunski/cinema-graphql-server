import { ValidationError } from 'yup';

const capitalizeFirstSymbol = 
  (str: string): string => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const formatYupError = (err: ValidationError) => {
  return err.inner.map(innerErrItem => ({
    path: innerErrItem.path,
    message: capitalizeFirstSymbol(innerErrItem.message)
  }));
};
