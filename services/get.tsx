import { apiUrl } from "./urls";

export const get = async (url: string): Promise<any> => {
  const res = await fetch(`${apiUrl}${url}`);
  return res.json();
}
