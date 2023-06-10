import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const AllStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/allusers")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  const changeRole = (event, student) => {
    const selectedRole = event.target.value;
    const updatedStudent = { ...student, role: selectedRole };

    fetch(`http://localhost:5000/students/role/${student.email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStudent),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Changed the role successfully ",
          showConfirmButton: false,
          timer: 1500,
        });

        const updatedStudents = students.map((s) =>
          s.email === student.email ? { ...s, role: selectedRole } : s
        );
        setStudents(updatedStudents);
      });
  };

  return (
    <div className="overflow-x-auto">
      <h1>All Students</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td className="font-bold">{student.name}</td>
              <td>{student.email}</td>
              <td>
                {student.role === "student" ? (
                  <select
                    className="select select-bordered"
                    onChange={(event) => changeRole(event, student)}
                    disabled={student.role !== "student"}
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                    <option value="instructor">Instructor</option>
                  </select>
                ) : (
                  student.role
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllStudents;
