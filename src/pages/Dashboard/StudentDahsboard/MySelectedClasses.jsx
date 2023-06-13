import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";

const MySelectedClasses = () => {
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
  const accessToken = localStorage.getItem("access-token");

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/selects?userEmail=${user?.email}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };
  console.log(classes);

  return (
    <div>
      <h2>this is my selected class</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySelectedClasses;
