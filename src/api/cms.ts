import axios from "axios";
export const cms = axios.create({ baseURL: "http://localhost:1337" });

export async function fetchPage(slug: string) {
  const res = await cms.get(`/pages?slug=${slug}`);
  return res.data[0];
}
