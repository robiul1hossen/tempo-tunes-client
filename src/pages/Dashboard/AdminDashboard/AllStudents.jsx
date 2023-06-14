import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const AllStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("https://tempo-tunes-server.vercel.app/allusers")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          // Handle the case when data is not an array (e.g., an error occurred)
          console.error("Invalid data format: ", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching students: ", error);
      });
  }, []);

  const changeRole = (event, student) => {
    const selectedRole = event.target.value;
    const updatedStudent = { ...student, role: selectedRole };

    fetch(`https://tempo-tunes-server.vercel.app/students/role/${student.email}`, {
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
      })
      .catch((error) => {
        console.error("Error changing role: ", error);
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
          {Array.isArray(students) &&
            students.map((student) => (
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
