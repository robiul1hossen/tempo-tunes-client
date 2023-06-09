import React, { useState, useEffect } from "react";

const AllStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/students")
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

        // Update the students array with the updated student
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
            <tr key={student.email}>
              <td className="font-bold">{student.name}</td>
              <td>{student.email}</td>
              <td>
                {student.role === "student" ? (
                  <select
                    className="select select-bordered"
                    onChange={(event) => changeRole(event, student)}
                    disabled={student.role !== "student"} // Disable the select when the role is not "student"
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
