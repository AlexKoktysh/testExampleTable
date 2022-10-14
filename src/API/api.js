import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
instance.interceptors.response.use(
  (response) => response,
  (error) => console.log(error)
);

export const getItem = async () => {
  const response = await instance.get(`/users`);
  return response.data;
};
