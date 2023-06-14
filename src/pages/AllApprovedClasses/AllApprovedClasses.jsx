import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";

const AllApprovedClasses = () => {
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
  const [selectedClassIds, setSelectedClassIds] = useState([]);
  const accessToken = localStorage.getItem("access-token");

  useEffect(() => {
    fetch(`http://localhost:5000/allclass?status=approved`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => console.error("Error fetching classes:", error));
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/selects?userEmail=${user.email}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const selectedIds = data.map((selectedClass) => selectedClass.classId);
          setSelectedClassIds(selectedIds);
        })
        .catch((error) => console.error("Error fetching selected classes:", error));
    }
  }, [user]);

  const approvedClasses = classes?.filter((approvedClass) => approvedClass.status === "approved");

  const userEmail = user?.email;

  const handleSelectClass = async (singleClass) => {
    const classId = singleClass._id;

    // Check if class is already selected by the user
    if (selectedClassIds.includes(classId)) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "You have already selected this class.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const classesData = { ...singleClass, userEmail };

    fetch("http://localhost:5000/selects", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classesData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Class added to your selection list.",
            showConfirmButton: false,
            timer: 1500,
          });
          setSelectedClassIds((prevIds) => [...prevIds, classId]);
        }
      });
  };

  return (
    <div className="grid md:grid-cols-4 gap-10 my-10">
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
                onClick={() => handleSelectClass(singleClass)}
                disabled={selectedClassIds.includes(singleClass._id)}
                className="btn btn-primary btn-outline"
              >
                {selectedClassIds.includes(singleClass._id) ? "Selected" : "Select Class"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllApprovedClasses;
