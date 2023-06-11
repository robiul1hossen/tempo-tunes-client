import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";

const AllApprovedClasses = () => {
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
  const [selected, setSelected] = useState([]);

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
    console.log(classId);
    if (user) {
      try {
        const selectedClass = classes.find((classItem) => classItem._id === classId);

        if (!selectedClass) {
          console.log("Class not found");
          return;
        }

        // Fetch existing selections for the user
        const response = await axios.get("http://localhost:5000/selects", {
          headers: { Authorization: `Bearer ${localStorage.getItem("access-token")}` },
        });
        // setSelected(response.data);
        const existingSelections = response.data;

        // Check if the selected class already exists in the user's selections
        const existingSelection = selected.find(
          (selection) => selection.classId === classId && selection.selectedBy === selectedClass?.email
        );

        console.log(existingSelection);
        if (existingSelection) {
          alert("Class already selected");
          return;
        }
        console.log(selectedClass);
        // Save the selected class for the logged-in user
        await axios.post(
          "http://localhost:5000/selects",
          { mySelected: selectedClass }, // Pass selected class as mySelected property in the request body
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
    <div className="grid grid-cols-4 gap-10 my-10">
      {approvedClasses.map((singleClass) => (
        <div key={singleClass._id}>
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img className="h-[300px] w-full" src={singleClass.image} alt="Shoes" />
            </figure>

            <div className="card-body space-y-0">
              <h2 className="card-title">Class Name: {singleClass.instrument}</h2>
              <h2 className="card-title">Instructor: {singleClass.instructor}</h2>
              <p>Available seats: {singleClass.seats}</p>
              <p>Status: {singleClass.status}</p>
              <p>Price: ${singleClass.price}</p>
              <p>Students: {singleClass.enrolled || 0}</p>
              <button
                onClick={() => handleSelectClass(singleClass._id)}
                className="btn btn-primary btn-outline"
              >
                Select Class
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllApprovedClasses;
