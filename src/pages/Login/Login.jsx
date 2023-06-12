import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";
import { useContext } from "react";

const Login = () => {
  const { LoginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    LoginUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Logged in successfully ",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from, { replace: true });
      })
      .then((error) => {
        console.log(error);
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="hero min-h-screen main-register my-5">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-center text-white md:w-1/2">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0  max-w-sm shadow-2xl bg-base-100 md:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                  type={showPassword ? "text" : "password"}
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
                <p className="text-end">
                  <small>
                    <button onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Show"}</button>
                  </small>
                </p>
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">Password must be less than 20 characters</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one uppercase, one lowercase, one number, and one special character.
                  </p>
                )}
              </div>

              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Login" />
              </div>
              <p>
                <small>
                  Do not have an account? Please{" "}
                  <Link to="/register" className="font-bold">
                    Register
                  </Link>
                </small>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
