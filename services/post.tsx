import { apiUrl } from "./urls";

export const post = async (url: string, body: any): Promise<any> => {
  const bodyToSend = JSON.stringify(body);
  const res = await fetch(`${apiUrl}${url}`, {
    body: bodyToSend,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: "no-cache"
  });
  return res.json();
}
