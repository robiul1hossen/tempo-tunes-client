import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(`/allusers/admin/${user?.email}`);
      return res.data.admin;
    },
    enabled: !loading,
  });
  console.log(isAdmin);
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
