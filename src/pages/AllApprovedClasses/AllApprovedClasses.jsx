// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../providers/AuthProviders";

// const AllApprovedClasses = () => {
//   const { user } = useContext(AuthContext);
//   const [classes, setClasses] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/allclasses")
//       .then((response) => response.json())
//       .then((data) => setClasses(data))
//       .catch((error) => console.error("Error fetching classes:", error));
//   }, []);
//   const approvedClasses = classes.filter((approvedClass) => approvedClass.status === "approved");

//   const handleSelectClass = (singleClass) => {
//     console.log(singleClass);
//     if (user) {
//       const accessToken = localStorage.getItem("access-token");
//       const emailUser = user.email;
//       const selectClass = async (classInfo, email) => {
//         const requestOptions = {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ singleClass: classInfo }),
//         };

//         try {
//           const response = await fetch(`/selects?email=${email}`, requestOptions);
//           const data = await response.json();
//           // Handle the response data as needed
//           console.log(data);
//         } catch (error) {
//           // Handle any error that occurred during the request
//           console.error(error);
//         }
//       };

//       // fetch(`http://localhost:5000/selects?email=${user.email}`, {
//       //   method: "POST",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     Authorization: `Bearer ${accessToken}`,
//       //   },
//       //   body: JSON.stringify({ singleClass, emailUser }),
//       // })
//       //   .then((response) => response.json())
//       //   .then((data) => {
//       //     if (data.error) {
//       //       console.log(data.error);
//       //       alert(data.error);
//       //     } else {
//       //       console.log("Class selected:", data);
//       //     }
//       //   })
//       //   .catch((error) => console.error("Error selecting class:", error));
//     } else {
//       alert("You need to log in first");
//     }
//   };

//   return (
//     <div className="grid md:grid-cols-4 gap-10 my-10">
//       {approvedClasses.map((singleClass) => (
//         <div key={singleClass._id}>
//           <div className="card bg-base-100 shadow-xl">
//             <figure>
//               <img className="h-[300px] w-full" src={singleClass.image} alt="Shoes" />
//             </figure>

//             <div className="card-body space-y-0">
//               <h2 className="card-title">Class Name: {singleClass.instrument}</h2>
//               <h2 className="card-title">Instructor: {singleClass.instructor}</h2>
//               <p>Available seats: {singleClass.seats}</p>
//               <p>Status: {singleClass.status}</p>
//               <p>Price: ${singleClass.price}</p>
//               <p>Students: {singleClass.enrolled || 0}</p>
//               <button onClick={() => handleSelectClass(singleClass)} className="btn btn-primary btn-outline">
//                 Select Class
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AllApprovedClasses;

// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../providers/AuthProviders";

// const AllApprovedClasses = () => {
//   const { user } = useContext(AuthContext);
//   const [classes, setClasses] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/allclasses")
//       .then((response) => response.json())
//       .then((data) => setClasses(data))
//       .catch((error) => console.error("Error fetching classes:", error));
//   }, []);

//   const approvedClasses = classes.filter((approvedClass) => approvedClass.status === "approved");

//   const handleSelectClass = async (singleClass) => {
//     if (user) {
//       const email = user.email;

//       const selectClass = async (classInfo, email) => {
//         const requestOptions = {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ singleClass: classInfo }),
//         };

//         try {
//           const response = await fetch(`http://localhost:5000/selects?email=${email}`, requestOptions);

//           if (response.ok) {
//             const data = await response.json();
//             // Handle the response data as needed
//             console.log(data);
//           } else {
//             throw new Error("Error selecting class");
//           }
//         } catch (error) {
//           // Handle any error that occurred during the request
//           console.error(error);
//         }
//       };

//       try {
//         await selectClass(singleClass, email);
//         console.log("Class selected:", singleClass);
//       } catch (error) {
//         console.error("Error selecting class:", error);
//       }
//     } else {
//       alert("You need to log in first");
//     }
//   };

//   return (
//     <div className="grid md:grid-cols-4 gap-10 my-10">
//       {approvedClasses.map((singleClass) => (
//         <div key={singleClass._id}>
//           <div className="card bg-base-100 shadow-xl">
//             <figure>
//               <img className="h-[300px] w-full" src={singleClass.image} alt="Shoes" />
//             </figure>

//             <div className="card-body space-y-0">
//               <h2 className="card-title">Class Name: {singleClass.instrument}</h2>
//               <h2 className="card-title">Instructor: {singleClass.instructor}</h2>
//               <p>Available seats: {singleClass.seats}</p>
//               <p>Status: {singleClass.status}</p>
//               <p>Price: ${singleClass.price}</p>
//               <p>Students: {singleClass.enrolled || 0}</p>
//               <button onClick={() => handleSelectClass(singleClass)} className="btn btn-primary btn-outline">
//                 Select Class
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AllApprovedClasses;

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";

const AllApprovedClasses = () => {
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/allclasses")
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => console.error("Error fetching classes:", error));
  }, []);
  const approvedClasses = classes.filter((approvedClass) => approvedClass.status === "approved");
  const accessToken = localStorage.getItem("access-token");
  const userEmail = user?.email || "sakib20@khan.com";
  console.log(userEmail);

  const handleSelectClass = async (singleClass) => {
    const classes = { ...singleClass, userEmail };

    fetch("http://localhost:5000/selects", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classes),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
              <button onClick={() => handleSelectClass(singleClass)} className="btn btn-primary btn-outline">
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
