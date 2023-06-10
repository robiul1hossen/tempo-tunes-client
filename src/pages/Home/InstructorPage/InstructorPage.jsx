import React, { useEffect, useState } from "react";

const InstructorPage = () => {
  const [instructor, setInstructor] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => {
        setInstructor(data);
      });
  }, []);
  const allInstructors = instructor.filter((instructors) => instructors.role === "instructor");

  return (
    <div>
      <h3>this si instructor page</h3>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="font-bold">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Classes</th>
            </tr>
          </thead>
          <tbody>
            {allInstructors.map((singleInstructor, index) => (
              <tr key={singleInstructor._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={singleInstructor.photo} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-semibold">{singleInstructor.name}</td>
                <td>{singleInstructor.email}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">See Classes</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorPage;
