import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { Navigate } from "react-router-dom";

const AllApprovedClasses = () => {
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/allclasses");
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleSelectClass = async (classId) => {
    if (user) {
      try {
        const selectedClass = classes.find((classItem) => classItem._id === classId);
        if (!selectedClass) {
          console.log("Class not found");
          return;
        }

        // Check if the class is already selected
        if (selectedClass.selected) {
          console.log("Class already selected");
          return;
        }

        // Save the selected class for the logged-in user
        await axios.post(
          "http://localhost:5000/selects",
          { classId },
          { headers: { Authorization: `Bearer ${localStorage.getItem("access-token")}` } }
        );

        fetchClasses(); // Fetch updated classes
      } catch (error) {
        console.error("Error selecting class:", error);
      }
    } else {
      alert("You need to log in first");
    }
  };

  const approvedClasses = classes.filter((approvedClass) => approvedClass.status === "approved");

  return (
    <div className="grid grid-cols-3 gap-10 my-10">
      {approvedClasses.map((singleClass) => (
        <div key={singleClass._id}>
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img className="h-[500px] w-full" src={singleClass.image} alt="Shoes" />
            </figure>

            <div className="card-body">
              <h2 className="card-title">Class Name: {singleClass.instrument}</h2>
              <h2 className="card-title">Instructor: {singleClass.instructor}</h2>
              <p>Available seats: {singleClass.seats}</p>
              <p>Price: ${singleClass.price}</p>
              <p>Students: {singleClass.enrolled || 0}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={singleClass.selected}
                  onClick={() => handleSelectClass(singleClass._id)}
                >
                  {singleClass.selected ? "Selected" : "Select Class"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllApprovedClasses;
