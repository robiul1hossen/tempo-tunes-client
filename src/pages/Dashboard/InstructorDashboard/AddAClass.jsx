import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import axios from "axios";
import Swal from "sweetalert2";

const AddAClass = () => {
  const { user } = useContext(AuthContext);

  let newClass = {};

  const addClass = (event) => {
    event.preventDefault();
    const form = event.target;
    const instrument = form.instrument.value;
    const instructor = form.instructor.value;
    const email = form.email.value;
    const price = parseInt(form.price.value);
    const seats = parseInt(form.seats.value);
    const photo = form.photo.value;

    newClass = {
      instrument,
      instructor,
      email,
      price,
      seats,
      image: photo,
      status: "pending",
      enrolled: 0,
    };

    const accessToken = localStorage.getItem("access-token");
    fetch("https://tempo-tunes-server.vercel.app/classes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(newClass),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Class added successfully ",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  console.log("console outside", newClass);

  return (
    <div>
      <h2>this is add a class</h2>
      <div className="hero min-h-screen bg-base-200">
        <div className="w-full p-12">
          <div className="card  shadow-2xl bg-base-100">
            <form onSubmit={addClass} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Instrument Name</span>
                </label>
                <input
                  type="text"
                  name="instrument"
                  placeholder="Instrument Name"
                  required
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Instructor Name</span>
                </label>
                <input
                  type="text"
                  name="instructor"
                  defaultValue={user.displayName}
                  readOnly
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  name="email"
                  defaultValue={user.email}
                  readOnly
                  className="input input-bordered"
                />
              </div>
              <div className="flex gap-5">
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="text"
                    name="price"
                    placeholder="$Price"
                    required
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Seats</span>
                  </label>
                  <input
                    type="text"
                    name="seats"
                    placeholder="Seats"
                    required
                    className="input input-bordered"
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">PhotoURL</span>
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="PhotoURL"
                  required
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Add Now" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAClass;
