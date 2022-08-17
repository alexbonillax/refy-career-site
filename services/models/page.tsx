export default interface Page<T> {
  page: number;
  perPage: number;
  hasMorePages: boolean;
  content: T[];
}