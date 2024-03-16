// UserProfilePage.js

import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contextStore/AuthContext";
import { Link } from "react-router-dom";
import "./Profile.css"; // Import the Profile.css file
import { Firebase } from "../../firebase/config";

function UserProfilePage() {
  const { user } = useContext(AuthContext);
  const [productData, setProductData] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPasswordMode, setEditPasswordMode] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordChangeError, setPasswordChangeError] = useState(null);

  useEffect(() => {
    if (user) {
      // Fetch user's products from Firebase
      const fetchProducts = async () => {
        try {
          const snapshot = await Firebase.firestore()
            .collection("products")
            .where("userId", "==", user.uid)
            .get();

          const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setProductData(products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchProducts();
    } else {
      // User is not logged in, show login popup
      setShowLoginPopup(true);
    }
  }, [user]);

  const handleRemoveProduct = async (productId) => {
    try {
      await Firebase.firestore().collection("products").doc(productId).delete();
      // Remove the product locally from the state
      setProductData((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const handleEditName = () => {
    setEditName(user ? user.displayName : "");
  };

  const handleSaveName = async () => {
    try {
      await Firebase.auth().currentUser.updateProfile({
        displayName: editName,
      });
      console.log("Name changed successfully!");
      setEditName(""); // Clear the editName state to hide the form
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const handleEditPassword = () => {
    setEditPasswordMode(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setPasswordChangeError(null);
  };

  const handleSavePassword = async () => {
    try {
      // Check if the new password matches the confirm new password
      if (newPassword !== confirmNewPassword) {
        setPasswordChangeError("Please ensure that the new password and confirm password match.");
      } else {
        // Reauthenticate user
        const userCredential = await Firebase.auth().signInWithEmailAndPassword(user.email, currentPassword);
        
        // Update the password in Firebase
        await userCredential.user.updatePassword(newPassword);
        console.log("Password changed successfully!");
        setEditPasswordMode(false); // Set editPasswordMode to false to hide the form
      }
    } catch (error) {
      console.error("Error updating password:", error);
  
      // Log the Firebase error message
      if (error.code && error.message) {
        console.error(`Firebase Error (${error.code}): ${error.message}`);
      }
  
      setPasswordChangeError("Error updating password");
    }
  };

  return (
    <div className="viewParentDiv">
      <div className="leftSection">
        {/* User details */}
        <div id="nameCard" className="card">
          <p>Name: {user ? user.displayName : "Guest"}</p>
          <p>Email: {user ? user.email : "N/A"}</p>
        </div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <button className="goBackButton">Go back to Home</button>
        </Link>

        {/* Edit Profile buttons */}
        {user && (
          <div className="editProfileButtons">
            <button className="goBackButton" onClick={handleEditName}>
              {editName ? "Cancel Edit Name" : "Edit Name"}
            </button>
            <span className="buttonSpacing"></span>
            <button className="goBackButton" onClick={handleEditPassword}>
              {editPasswordMode ? "Cancel Edit Password" : "Edit Password"}
            </button>
          </div>
        )}

        {/* Edit Name Form and Edit Password Form */}
        <div className="editFormsContainer">
          {editName && (
            <div className="editForm">
              <label>Enter your new name:</label>
              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
              <button className="saveChangesButton" onClick={handleSaveName}>
                Save Changes
              </button>
              <button className="removeButton" onClick={() => setEditName("")}>
                Cancel
              </button>
            </div>
          )}

          {editPasswordMode && (
            <div className="editForm">
              <label htmlFor="currentPassword">Current Password:</label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />

              <label htmlFor="newPassword">New Password:</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <label htmlFor="confirmNewPassword">Confirm New Password:</label>
              <input
                id="confirmNewPassword"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />

              {passwordChangeError && <p className="errorText">{passwordChangeError}</p>}

              <button className="saveChangesButton" onClick={handleSavePassword}>
                Save Changes
              </button>
              <button className="removeButton" onClick={() => setEditPasswordMode(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Product details */}
        {user && (
          <div className="productList">
            <h2>Your Products</h2>
            {productData.map((product) => (
              <div key={product.id} className="productCard card">
                <img src={product.url} alt={product.name} />
                <p>Name: {product.name}</p>
                <p>Price: {product.price}</p>
              </div>
            ))}
          </div>
        )}

        {/* Remove button (outside the product card) */}
        {user && (
          <div className="removeButtonContainer">
            {productData.map((product) => (
              <button
                key={product.id}
                className="removeButton"
                onClick={() => handleRemoveProduct(product.id)}
              >
                Remove Product
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="rightSection">
        {/* Existing content */}
      </div>

      {/* Login popup */}
      {showLoginPopup && (
        <div className="loginPopup">
          <p>Please login first to view your profile.</p>
        </div>
      )}
    </div>
  );
}

export default UserProfilePage;
