import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";

const useCart = () => {
  const { user } = useContext(AuthContext);

  const {
    isLoading,
    refetch,
    data: students = [],
  } = useQuery(["students", user?.email], async () => {
    const res = await fetch(`http://localhost:5000/classes?email=${user?.email}`);
    const data = await res.json();
    // Filter classes based on user's email
    const userClasses = data.filter((cls) => cls.email === user?.email);
    return userClasses;
  });
  console.log(students);

  return [students, isLoading, refetch];
};

export default useCart;
