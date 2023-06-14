import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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

  const handleDelete = (userId) => {
    console.log(userId);

    fetch(`http://localhost:5000/selects?userEmail=${user?.email}&&_id=${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Class deleted from selection list.",
            showConfirmButton: false,
            timer: 1500,
          });
          setClasses((prevClasses) => prevClasses.filter((c) => c._id !== userId));
        }
      });
  };

  return (
    <div>
      {classes.length > 0 ? (
        <h2 className="text-2xl font-semibold text-center mt-3 mb-5 bg-base-300 p-4">
          Your Class Selection List : {classes.length}
        </h2>
      ) : (
        <h2 className="text-2xl font-semibold text-center mt-3 mb-5 bg-base-300 p-4">
          You did not select any class yet..
        </h2>
      )}
      {classes.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Instructor</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {classes.map((singleClass, index) => (
                <tr key={singleClass._id}>
                  <th>{index + 1}</th>
                  <td>{singleClass.instrument}</td>
                  <td>{singleClass.instructor}</td>
                  <td>${singleClass.price}</td>
                  <td>
                    <Link to="/dashboard/payment" state={singleClass}>
                      <button className="btn btn-outline btn-sm">Pay Fees</button>
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(singleClass._id)} className="btn btn-outline btn-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MySelectedClasses;
