import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";
import { useQueryClient } from "react-query";

const axiosSecure = axios.create({
  baseURL: "https://tempo-tunes-server.vercel.app",
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    // Add a response interceptor to invalidate query cache on successful PUT requests
    axiosSecure.interceptors.response.use((response) => {
      if (response.config.method === "put" && response.status === 200) {
        queryClient.invalidateQueries(response.config.url);
      }
      return response;
    });
  }, [logOut, navigate, queryClient]);

  return [axiosSecure];
};

export default useAxiosSecure;
