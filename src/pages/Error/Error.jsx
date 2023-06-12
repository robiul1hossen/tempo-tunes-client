import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="w-full mt-10">
      <Link to="/">
        <button className="btn btn-outline my-3"> back to home</button>
      </Link>
      <img
        className="w-full"
        style={{ height: "90vh" }}
        src="https://i.ibb.co/8XfPgqp/273806-P5-X28-A-300.jpg"
        alt=""
      />
    </div>
  );
};

export default Error;
