import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import SelleaseLogo from "../../selleasepng.png";
import "./Signup.css";
import { Firebase } from "../../firebase/config";
import { useHistory } from "react-router";
import SignUpLoading from "../Loading/SignUpLoading";

Modal.setAppElement("#root");

export default function Signup() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const validateForm = () => {
    let errors = {};

    // Validate name
    if (!/^[a-zA-Z ]+$/.test(name)) {
      errors.name = "Name should contain only letters";
    }

    // Validate email
    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format";
    }

    // Validate phone
    if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone number should be 10 digits";
    }

    // Validate password
    if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(password)) {
      errors.password =
        "Password must contain at least 8 characters, one uppercase letter, and one symbol";
    }

    setValidationErrors(errors);

    // Open the error modal if there are validation errors
    if (Object.keys(errors).length > 0) {
      setIsErrorModalOpen(true);
    }

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);

      Firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          result.user.updateProfile({ displayName: name }).then(() => {
            Firebase.firestore().collection("users").doc(result.user.uid).set({
              id: result.user.uid,
              name: name,
              phone: phone,
            });
          });
        })
        .then(() => {
          history.push("/login");
        })
        .catch((error) => {
          console.error("Firebase error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const closeModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <>
      {loading && <SignUpLoading />}
      <div>
        <div className="signupParentDiv">
          <img
            width="200px"
            height="200px"
            src={SelleaseLogo}
            alt="Sellease Logo"
          />
          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />
            <br />
            <label>Email</label>
            <br />
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            <br />
            <label>Phone</label>
            <br />
            <input
              className="input"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              name="phone"
            />
            <br />
            <label>Password</label>
            <br />
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            <br />
            <br />
            <button>Signup</button>
          </form>
          <Link to="/login">Login</Link>
        </div>
      </div>

      {/* Error Modal */}
      <Modal
        isOpen={isErrorModalOpen}
        onRequestClose={closeModal}
        contentLabel="Error Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            border: "2px solid red",
            padding: "10px",  // Adjusted padding to make it smaller
            borderRadius: "10px",
            maxWidth: "300px",
            maxHeight:"300px",  // Adjusted maxWidth to make it smaller
            margin: "auto",
          },
        }}
      >
        {Object.values(validationErrors).map((error, index) => (
          <p key={index} style={{ color: "red" }}>
            {error}
          </p>
        ))}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
}
