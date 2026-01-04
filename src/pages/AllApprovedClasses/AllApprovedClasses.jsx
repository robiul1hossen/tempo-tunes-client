// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../providers/AuthProviders";
// import Swal from "sweetalert2";
// import Card from "../../Components/Card";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const AllApprovedClasses = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useContext(AuthContext);
//   const [classes, setClasses] = useState([]);
//   const [selectedClassIds, setSelectedClassIds] = useState([]);
//   const [keyword, setKeyword] = useState("");
//   const accessToken = localStorage.getItem("access-token");

//   useEffect(() => {
//     fetch(`https://tempo-tunes-server.vercel.app/allclass?status=approved`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => setClasses(data))
//       .catch((error) => console.error("Error fetching classes:", error));
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetch(
//         `https://tempo-tunes-server.vercel.app/selects?userEmail=${user.email}`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           const selectedIds = data.map(
//             (selectedClass) => selectedClass.classId
//           );
//           setSelectedClassIds(selectedIds);
//         })
//         .catch((error) =>
//           console.error("Error fetching selected classes:", error)
//         );
//     }
//   }, [user]);

//   const approvedClasses = classes?.filter(
//     (approvedClass) => approvedClass.status === "approved"
//   );

//   const userEmail = user?.email;

//   const handleSelectClass = async (singleClass) => {
//     const classId = singleClass._id;

//     if (selectedClassIds.includes(classId)) {
//       Swal.fire({
//         position: "top-end",
//         icon: "warning",
//         title: "You have already selected this class.",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       return;
//     }

//     const classesData = { ...singleClass, userEmail };

//     fetch("https://tempo-tunes-server.vercel.app/selects", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(classesData),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         if (data.insertedId) {
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: "Class added to your selection list.",
//             showConfirmButton: false,
//             timer: 1500,
//           });
//           setSelectedClassIds((prevIds) => [...prevIds, classId]);
//         }
//       });
//   };
//   const handleFilter = (e) => {
//     e.preventDefault();
//     axiosSecure
//       .get(`/search/user`, {
//         params: {
//           keyword,
//         },
//       })
//       .then((res) => {
//         setSearchData(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div className="grid grid-cols-12 gap-5 my-6">
//       <div className="col-span-9">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 ">
//           {approvedClasses.map((singleClass) => (
//             <div key={singleClass._id}>
//               <div className="card bg-base-100 shadow-md px-3 py-2">
//                 <h2 className="font-bold text-sm">{singleClass.instrument}</h2>
//                 <figure>
//                   <img
//                     data-aos="flip-left"
//                     className="h-[200px] w-full rounded hover:scale-105 transition-all duration-300"
//                     src={singleClass.image}
//                     alt={singleClass.instrument}
//                   />
//                 </figure>

//                 <h2 className="font-semibold mt-0 text-md">
//                   Instructor: {singleClass.instructor}
//                 </h2>
//                 <div className="space-y-0">
//                   <p className="text-sm">
//                     Available seats: {singleClass.seats}
//                   </p>
//                   <p className="text-sm">Status: {singleClass.status}</p>
//                   <p className="text-sm">Price: ${singleClass.price}</p>
//                   <p className="text-sm">
//                     Students: {singleClass.enrolled || 0}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => handleSelectClass(singleClass)}
//                   disabled={selectedClassIds.includes(singleClass._id)}
//                   className="btn btn-primary btn-outline">
//                   {selectedClassIds.includes(singleClass._id)
//                     ? "Selected"
//                     : "Select Class"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="col-span-3 px-2">
//         <form onSubmit={handleFilter}>
//           <input
//             type="text"
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//             placeholder="Search Users"
//             className="input outline-none border-black w-full"
//           />
//           <button type="submit" className="btn btn-primary w-full mt-2">
//             {" "}
//             Find
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AllApprovedClasses;
// // <Card key={singleClass._id} singleClass={singleClass} />
// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../providers/AuthProviders";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const AllApprovedClasses = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useContext(AuthContext);

//   const [classes, setClasses] = useState([]);
//   const [selectedClassIds, setSelectedClassIds] = useState([]);
//   const [keyword, setKeyword] = useState("");

//   const accessToken = localStorage.getItem("access-token");

//   /* ----------------------------------------
//      Fetch approved classes + search support
//   -----------------------------------------*/
//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const res = await axiosSecure.get("/allclass", {
//           params: {
//             status: "approved",
//             search: keyword,
//           },
//         });
//         setClasses(res.data);
//       } catch (error) {
//         console.error("Error fetching classes:", error);
//       }
//     };

//     fetchClasses();
//   }, [keyword, axiosSecure]);

//   /* ----------------------------------------
//      Fetch already selected classes
//   -----------------------------------------*/
//   useEffect(() => {
//     if (user) {
//       fetch(
//         `https://tempo-tunes-server.vercel.app/selects?userEmail=${user.email}`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           const selectedIds = data.map((item) => item.classId);
//           setSelectedClassIds(selectedIds);
//         })
//         .catch((error) =>
//           console.error("Error fetching selected classes:", error)
//         );
//     }
//   }, [user, accessToken]);

//   /* ----------------------------------------
//      Handle class selection
//   -----------------------------------------*/
//   const handleSelectClass = (singleClass) => {
//     const classId = singleClass._id;

//     if (selectedClassIds.includes(classId)) {
//       Swal.fire({
//         position: "top-end",
//         icon: "warning",
//         title: "You have already selected this class.",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       return;
//     }

//     const classesData = {
//       ...singleClass,
//       classId,
//       userEmail: user?.email,
//     };

//     fetch("https://tempo-tunes-server.vercel.app/selects", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(classesData),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.insertedId) {
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: "Class added to your selection list.",
//             showConfirmButton: false,
//             timer: 1500,
//           });
//           setSelectedClassIds((prev) => [...prev, classId]);
//         }
//       });
//   };

//   /* ----------------------------------------
//      Search submit handler
//   -----------------------------------------*/
//   const handleFilter = (e) => {
//     e.preventDefault();
//     // Search happens automatically via keyword state
//   };

//   return (
//     <div className="grid grid-cols-12 gap-5 my-6">
//       {/* ================= Classes Section ================= */}
//       <div className="col-span-9">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
//           {classes.map((singleClass) => (
//             <div key={singleClass._id}>
//               <div className="card bg-base-100 shadow-md px-3 py-2">
//                 <h2 className="font-bold text-sm">{singleClass.instrument}</h2>

//                 <figure>
//                   <img
//                     className="h-[200px] w-full rounded hover:scale-105 transition-all duration-300"
//                     src={singleClass.image}
//                     alt={singleClass.instrument}
//                   />
//                 </figure>

//                 <h2 className="font-semibold text-md mt-1">
//                   Instructor: {singleClass.instructor}
//                 </h2>

//                 <div className="space-y-0 text-sm">
//                   <p>Available seats: {singleClass.seats}</p>
//                   <p>Status: {singleClass.status}</p>
//                   <p>Price: ${singleClass.price}</p>
//                   <p>Students: {singleClass.enrolled || 0}</p>
//                 </div>

//                 <button
//                   onClick={() => handleSelectClass(singleClass)}
//                   disabled={selectedClassIds.includes(singleClass._id)}
//                   className="btn btn-primary btn-outline mt-2">
//                   {selectedClassIds.includes(singleClass._id)
//                     ? "Selected"
//                     : "Select Class"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ================= Search Section ================= */}
//       <div className="col-span-3 px-2">
//         <form onSubmit={handleFilter}>
//           <input
//             type="text"
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//             placeholder="Search by instrument or instructor"
//             className="input outline-none border-black w-full"
//           />
//           <button type="submit" className="btn btn-primary w-full mt-2">
//             Find
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AllApprovedClasses;
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllApprovedClasses = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [classes, setClasses] = useState([]);
  const [selectedClassIds, setSelectedClassIds] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axiosSecure.get("/allclass", {
          params: {
            status: "approved",
            search: keyword,
          },
        });
        setClasses(res.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, [keyword, axiosSecure]);

  useEffect(() => {
    const fetchSelectedClasses = async () => {
      if (!user?.email) return;

      try {
        const res = await axiosSecure.get("/selects", {
          params: { userEmail: user.email },
        });

        const selectedIds = res.data.map((item) => item.classId);
        setSelectedClassIds(selectedIds);
      } catch (error) {
        console.error("Error fetching selected classes:", error);
      }
    };

    fetchSelectedClasses();
  }, [user, axiosSecure]);

  const handleSelectClass = async (singleClass) => {
    const classId = singleClass._id;

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

    const classesData = {
      ...singleClass,
      classId,
      userEmail: user?.email,
    };

    try {
      const res = await axiosSecure.post("/selects", classesData);

      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Class added to your selection list.",
          showConfirmButton: false,
          timer: 1500,
        });

        setSelectedClassIds((prev) => [...prev, classId]);
      }
    } catch (error) {
      console.error("Error selecting class:", error);
    }
  };

  /* ----------------------------------------
     Search submit handler
  -----------------------------------------*/
  const handleFilter = (e) => {
    e.preventDefault();
    // backend search triggers automatically via keyword
  };

  return (
    <div className="grid grid-cols-12 gap-5 my-6">
      {/* ================= Classes Section ================= */}
      <div className="col-span-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {classes.map((singleClass) => (
            <div key={singleClass._id}>
              <div className="card bg-base-100 shadow-md px-3 py-2">
                <h2 className="font-bold text-sm">{singleClass.instrument}</h2>

                <figure>
                  <img
                    className="h-[200px] w-full rounded hover:scale-105 transition-all duration-300"
                    src={singleClass.image}
                    alt={singleClass.instrument}
                  />
                </figure>

                <h2 className="font-semibold text-md mt-1">
                  Instructor: {singleClass.instructor}
                </h2>

                <div className="space-y-0 text-sm">
                  <p>Available seats: {singleClass.seats}</p>
                  <p>Status: {singleClass.status}</p>
                  <p>Price: ${singleClass.price}</p>
                  <p>Students: {singleClass.enrolled || 0}</p>
                </div>

                <button
                  onClick={() => handleSelectClass(singleClass)}
                  disabled={selectedClassIds.includes(singleClass._id)}
                  className="btn btn-primary btn-outline mt-2">
                  {selectedClassIds.includes(singleClass._id)
                    ? "Selected"
                    : "Select Class"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= Search Section ================= */}
      <div className="col-span-3 px-2">
        <form onSubmit={handleFilter}>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by instrument or instructor"
            className="input outline-none border-black w-full"
          />
          <button type="submit" className="btn btn-primary w-full mt-2">
            Find
          </button>
        </form>
      </div>
    </div>
  );
};

export default AllApprovedClasses;
