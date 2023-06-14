import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/allclass");
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const approveClass = async (classId) => {
    try {
      await axios.put(`http://localhost:5000/classes/${classId}/approve`);
      fetchClasses();
    } catch (error) {
      console.error("Error approving class:", error);
    }
  };

  const denyClass = async (classId) => {
    try {
      await axios.put(`http://localhost:5000/classes/${classId}/deny`);
      fetchClasses();
    } catch (error) {
      console.error("Error denying class:", error);
    }
  };

  return (
    <div>
      <h2>This is the manage classes page</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Instructor Email</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((singleClass, index) => (
              <tr key={singleClass._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={singleClass.image} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{singleClass.instrument}</td>
                <td>{singleClass.instructor}</td>
                <td>{singleClass.email}</td>
                <td>{singleClass.seats}</td>
                <td>${singleClass.price}</td>
                <td className="bg-[#D1A054] p-1 block mt-5 text-white rounded-lg font-semibold">
                  {singleClass.status}
                </td>
                <td>
                  {singleClass.status === "pending" ? (
                    <div className="flex">
                      <button className="btn btn-ghost btn-xs" onClick={() => approveClass(singleClass._id)}>
                        Approve
                      </button>
                      <button className="btn btn-ghost btn-xs" onClick={() => denyClass(singleClass._id)}>
                        Deny
                      </button>
                    </div>
                  ) : (
                    singleClass.status
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
