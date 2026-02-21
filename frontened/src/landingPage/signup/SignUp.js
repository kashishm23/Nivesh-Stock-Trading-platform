import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./Signup.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post(
        "http://localhost:3002/auth/signup",
        { email, password, username },
        { withCredentials: true }
      );

      if (data.success) {
        navigate("/dashboard"); // redirect after success
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;