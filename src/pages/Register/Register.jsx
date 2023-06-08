import { useForm } from "react-hook-form";
import "./register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const [password, setPassword] = useState("");
  //   const [disable, setDisable] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
  };

  return (
    <div>
      <h2>this is register</h2>
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
                <input
                  type="file"
                  name="photo"
                  {...register("photo", { required: true })}
                  className="file-input file-input-bordered w-full max-w-xs"
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
                  <button className="btn btn-circle btn-outline btn-sm">
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
