import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";
import { data } from "autoprefixer";

const useCart = () => {
  const { user } = useContext(AuthContext);
  const {
    isLoading,
    refetch,
    data: students = [],
  } = useQuery({
    queryKey: ["students", user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/classes?email=${user?.email}`);
      return res.json;
    },
  });
  return [students, isLoading, refetch];
};
export default useCart;
