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
  const [sortByFees, setSortByFees] = useState("");
  const [sortByDate, setSortByDate] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axiosSecure.get("/allclass", {
          params: {
            status: "approved",
            search: keyword,
            sortFees: sortByFees,
            sortDate: sortByDate,
          },
        });
        setClasses(res.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, [keyword, sortByFees, sortByDate, axiosSecure]);

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

  const handleFilter = (e) => {
    e.preventDefault();
    // keyword state already triggers useEffect fetch
  };

  return (
    <div className="grid grid-cols-12 gap-5 my-6">
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

      <div className="col-span-3 px-2 space-y-3">
        {/* Search */}
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

        {/* Sort by Fees */}
        <div>
          <label className="block text-sm font-medium mb-1">Sort by Fees</label>
          <select
            className="select select-bordered w-full"
            value={sortByFees}
            onChange={(e) => setSortByFees(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>

        {/* Sort by CreatedAt */}
        <div>
          <label className="block text-sm font-medium mb-1">Sort by Date</label>
          <select
            className="select select-bordered w-full"
            value={sortByDate}
            onChange={(e) => setSortByDate(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AllApprovedClasses;
