import { useQuery, useMutation } from "react-query";
const key = process.env.API_KEY;
// mock data
import data from "./data.json";
const DATA = data.data;

const appFetch = async (path, options = {}) => {
  const res = await fetch(`${path}`, options);
  if (!res.ok) {
    // throw error if status not OK
    throw Error(res?.errors || "Some error");
  }
  const jsonData = await res.json();
  return jsonData.data.map((itm, idx) => ({ ...itm, id: idx }));
};

const mockFetch = () => new Promise((res) => setTimeout(res(DATA.data), 1000));

export const usePostsData = (category) => {
  const url = `http://api.mediastack.com/v1/news?access_key=${key}&categories=${category}&languages=en`;
  return useQuery("posts", () => appFetch(url));
};
