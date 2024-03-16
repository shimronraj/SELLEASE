import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../contextStore/PostContext";
import { Firebase } from "../../firebase/config";
import { useHistory } from "react-router";
import "./View.css";

function View() {
  let { postContent } = useContext(PostContext);
  const [userDetails, setUserDetails] = useState();
  const [currentUser, setCurrentUser] = useState(null);  // Added state for current user
  const history = useHistory();

  useEffect(() => {
    // Check if the user is authenticated
    const unsubscribe = Firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // User is not logged in, redirect to the login page
        history.push("/login");
      } else {
        setCurrentUser(user);  // Set current user when authenticated
      }
    });

    return () => unsubscribe(); // Cleanup the subscription on unmount
  }, [history]);

  useEffect(() => {
    let { userId } = postContent;
    if (userId === undefined) {
      history.push("/");
    } else {
      Firebase.firestore()
        .collection("users")
        .where("id", "==", userId)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            setUserDetails(doc.data());
          });
        });
    }
  }, [history, postContent]);



  // here we are integrating the razeorpay functionality..............................rhhh
  const handleSubmit = (e) => {
    e.preventDefault();
    var options = {
      key: "rzp_test_2zoDLngFFBYiGi",
      key_secret: "rzp_test_2zoDLngFFBYiGi",
      amount: postContent.price, // Assuming a fixed amount for testing
      currency: "INR",
      name: "SellEase Payment",
      description: "Secure Payment",
      handler: function (response) {
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: "shimron",
        email: "shimron@gmail.com",
        contact: "5588855533",
      },
      notes: {
        address: "Razorpay Corporate office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div className="viewFullCard">
      <div className="viewParentDiv">
        <div className="leftSection">
          <div className="imageShowDiv">
            <img src={postContent.url} alt="" />
          </div>
          <div className="productDescription">
            <p className="p-bold">Product Description</p>
            <p className="dis">{postContent.description}</p>
          </div>
        </div>
        <div className="rightSection">
          <div className="productDetails card" id="pricecard">
            <p className="price">&#x20B9; {postContent.price} </p>
            <span className="productName">{postContent.name}</span>
            <p className="category">{postContent.category}</p>
            <span className="createdAt">{postContent.createdAt}</span>
          </div>
          {userDetails && currentUser && userDetails.id !== currentUser.uid && (
            // Render Buy Now button only if the user is not the seller
            <div className="contactDetails card" id="pricecard">
              <p className="p-bold">Seller details</p>
              <p><span role="img" aria-label="person icon">👤</span>Name : {userDetails.name}</p>
              <p className="phone">
                <span role="img" aria-label="phone icon">📞</span> Phone :
                <a href={`tel:${userDetails.phone}`}>{userDetails.phone}</a>
              </p>
              <p><span role="img" aria-label="whatsapp icon">
                <a href={`https://api.whatsapp.com/send?phone=${userDetails.phone}`} target="_blank" rel="noopener noreferrer">
                  <img src="https://pngmind.com/wp-content/uploads/2019/08/Whatsapp-Logo-Png-Transparent-Background.png" alt="WhatsApp Icon" width="30" height="30" />
                </a>
              </span>WhatsApp : {userDetails.phone} <br></br></p>
              <button className="buyNowButton" onClick={handleSubmit}>
                Buy Now
              </button>
            </div>
          )}
          {userDetails && currentUser && userDetails.id === currentUser.uid && (
            // Render a message or nothing if the user is the seller
            <div className="contactDetails card" id="pricecard">
              <p className="p-bold">Seller details</p>
              <p>You are the seller of this product</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default View;
