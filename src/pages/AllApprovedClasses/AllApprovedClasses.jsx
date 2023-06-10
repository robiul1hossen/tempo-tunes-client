import axios from "axios";
import React, { useEffect, useState } from "react";

const AllApprovedClasses = () => {
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
  const approvedClasses = classes.filter((approvedClass) => approvedClass.status === "approved");
  return (
    <div className="grid grid-cols-3 gap-10 my-10">
      {approvedClasses.map((singleClass) => (
        <div key={singleClass._id}>
          <div className="card  bg-base-100 shadow-xl">
            <figure>
              <img className="h-[500px] w-full" src={singleClass.image} alt="Shoes" />
            </figure>

            <div className="card-body">
              <h2 className="card-title">Class Name : {singleClass.instrument}</h2>
              <h2 className="card-title">Instructor : {singleClass.instructor}</h2>
              <p>Available seats : {singleClass.seats}</p>
              <p>Price : ${singleClass.price}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Select Class</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllApprovedClasses;
