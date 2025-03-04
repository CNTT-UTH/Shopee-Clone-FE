import DOMPurify from 'dompurify';

export const sanitizeInput = (value: string) => {
  return DOMPurify.sanitize(value);
};