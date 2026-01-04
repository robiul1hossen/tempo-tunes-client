import React from "react";

const Card = ({ singleClass }) => {
  return (
    <div>
      <div className="card bg-base-100 shadow-md px-3 py-2">
        <h2 className="font-bold text-sm">{singleClass.instrument}</h2>
        <figure>
          <img
            data-aos="flip-left"
            className="h-[200px] w-full rounded"
            src={singleClass.image}
            alt={singleClass.instrument}
          />
        </figure>

        <h2 className="font-semibold mt-0 text-md">
          Instructor: {singleClass.instructor}
        </h2>
        <div className="space-y-0">
          <p className="text-sm">Available seats: {singleClass.seats}</p>
          <p className="text-sm">Status: {singleClass.status}</p>
          <p className="text-sm">Price: ${singleClass.price}</p>
          <p className="text-sm">Students: {singleClass.enrolled || 0}</p>
        </div>
        {/* <button
          onClick={() => handleSelectClass(singleClass)}
          disabled={selectedClassIds.includes(singleClass._id)}
          className="btn btn-primary btn-outline">
          {selectedClassIds.includes(singleClass._id)
            ? "Selected"
            : "Select Class"}
        </button> */}
      </div>
    </div>
  );
};

export default Card;
