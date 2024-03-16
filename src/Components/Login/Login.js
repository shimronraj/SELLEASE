import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Firebase } from "../../firebase/config";
import SelleaseLogo from "../../selleasepng.png"; // Updated import
import RoundLoading from "../Loading/RoundLoading";
import "./Login.css";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      {loading && <RoundLoading />}
      <div className="loginContainer">
        <div className="loginCard">
          <img src={SelleaseLogo} alt="Sellease Logo" /> {/* Updated img tag */}
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              className="input"
              type="email"
              placeholder="shimron@gmail.com"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
          </form>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
