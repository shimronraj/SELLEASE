import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { AllPostContext } from "../../contextStore/AllPostContext";
import { PostContext } from "../../contextStore/PostContext";
import "./Header.css";
import SelleaseLogo from "../../sellease-logo.svg"; // Updated import // Updated import
import SearchIcon from "../../assets/SearchIcon";

import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contextStore/AuthContext";
import { Firebase } from "../../firebase/config";
import Search from "../Search/Search";
// import Profile from "../Profile/Profile";
function Header() {
  const{allPost}=useContext(AllPostContext)
  const{setPostContent}=useContext(PostContext)
  const history = useHistory();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = allPost.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  const handleSelectedSearch=(value)=>{
       setPostContent(value)
       history.push("/view")

  }
  const handleEmptyClick=()=>{
     alert("No items found.., please search by product name");
  }
  const { user } = useContext(AuthContext);
  
  const logoutHandler = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        history.push("/login");
      });
  };
  return (
    <div className="headerParentDiv">
  <div className="headerChildDiv">
    <div className="brandName">
    <a href="/">
  <img
    src={SelleaseLogo}
    alt="Sellease Logo"
    style={{ transform: 'scale(2.0)' }}
    width="74px"
    height="48px"
    viewBox="0 0 1024 1024"
    data-aut-id="icon"
    fillRule="evenodd"
  />
</a>

    </div>
        <div className="placeSearch">
          <input type="text" 
          placeholder="Search by Owner Name"
          value={wordEntered}
          onChange={handleFilter}
        />{filteredData.length === 0 ? (
          <div onClick={handleEmptyClick}> <SearchIcon /> </div>
         ) : (
           <div id="clearBtn"  onClick={clearInput} > </div>
         )}
          {filteredData.length !== 0 && (
        <div className="dataResult-header">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <div key={key} className="dataItem-header" onClick={()=>handleSelectedSearch(value)}>
                <p>{value.name} </p>
              </div>
            );
          })}
        </div>
      )}
         
        </div>
        <div className="productSearch">
          <Search />
        </div>
        
        <Link to="/Profile">
          {" "}
          <div className="sellMenu">
            <SellButton></SellButton>
            <div className="sellMenuContent">
              
              <span>PROFILE</span>
            </div>
          </div>
        </Link>


        <div className="loginPage">
          {user ? (
            user.displayName
          ) : (
            <Link to="/login">
              <span>Login</span>
            </Link>
          )}
          <hr />
        </div>
        {user && (
          <span onClick={logoutHandler} className="logout-span">
            Logout
          </span>
        )}
        
        <Link to="/create">
          {" "}
          <div className="sellMenu">
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}

export default Header;
