import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../providers/AuthProviders";

const MyClasses = () => {
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
  const accessToken = localStorage.getItem("access-token");

  useEffect(() => {
    fetch(`http://localhost:5000/allclasses`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setClasses(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error
      });
  }, [user]);
  const instructorClasses = classes.filter((allClass) => allClass.email === user.email);

  return (
    <div>
      <h3>this is my classes</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>

              <th>Enrolled Students</th>
              <th>Feedback</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {instructorClasses.map((singleClass, index) => (
              <tr key={singleClass._id}>
                <th>{index + 1}</th>
                <td>{singleClass?.enroll || 0}</td>
                <td>Blue</td>
                <td>{singleClass.status}</td>
                <td>update</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClasses;
