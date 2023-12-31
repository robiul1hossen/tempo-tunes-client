import { useForm } from "react-hook-form";
import "./register.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";

const Register = () => {
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, signInGoogle, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const photo = data.photo;
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const confirm_password = data.confirm_password;
    console.log(photo, name, email, password, confirm_password);
    if (password !== confirm_password) {
      setPassword("Password does not match");
    }
    if (password === confirm_password) {
      setPassword("");
    }
    createUser(email, password)
      .then((result) => {
        const createdUser = result.user;
        // update profile
        return updateUserProfile(name, photo)
          .then(() => {
            console.log("user profile updated");
            const savedUser = { name: data.name, email: data.email, photo: data.photo };
            console.log(savedUser);
            fetch("https://tempo-tunes-server.vercel.app/students", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(savedUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  reset();
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate("/");
                }
              });
          })
          .catch((error) => {
            console.log(error);
          });
        // update profile
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="hero min-h-screen main-register my-5">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-center text-white md:w-1/2">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0  max-w-sm shadow-2xl bg-base-100 md:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Name"
                  name="name"
                  className="input input-bordered"
                />
                {errors.name && <span className="text-red-600">Name is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                  name="email"
                  className="input input-bordered"
                />
                {errors.email && <span className="text-red-600">Email is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 12,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  name="password"
                  placeholder="Password"
                  className="input input-bordered"
                />

                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">Password must be less than 20 characters</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase one lower case, one number and one special character.
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  {...register("confirm_password", { required: true })}
                  name="confirm_password"
                  placeholder="Confirm Password"
                  className="input input-bordered"
                />

                <p>{password}</p>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                {/* <input
                  type="file"
                  name="photo"
                  {...register("photo", { required: true })}
                  className="file-input file-input-bordered w-full max-w-xs"
                /> */}
                <input
                  type="text"
                  {...register("photo", { required: true })}
                  placeholder="Photo"
                  name="photo"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Register" />
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <small>
                    Already have an account? Please{" "}
                    <Link to="/login" className="font-bold">
                      Login
                    </Link>
                  </small>
                </div>
                <div>
                  <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline btn-sm">
                    <FaGoogle></FaGoogle>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
