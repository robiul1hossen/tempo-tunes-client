import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h2>this is login</h2>
      do not have an account? Please <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;
