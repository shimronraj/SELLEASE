import React from 'react'
import {BrowserRouter as Router , Route} from 'react-router-dom'
import Home from '../Pages/Home'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import CreatePost from '../Pages/CreatePost'
import ViewPost from '../Pages/ViewPost'
import ViewMore from '../Pages/ViewMore'
// import Profile from '../Pages/Profile'
import Profilepage from '../Pages/Profilepage';
import Buynow from '../Pages/BuyNow'







function MainRoutes() {
    return (
       <Router>
           <Route exact path="/">
               <Home/>
           </Route>
           <Route path="/signup">
               <Signup/>
           </Route>
           <Route path="/login">
               <Login/>
           </Route>
           <Route path="/create">
               <CreatePost/>
           </Route>
           <Route path="/view">
               <ViewPost/>
           </Route>
           <Route path="/viewmore">
               <ViewMore/>
           </Route>
         
           <Route path="/profile">
               <Profilepage/>
           </Route>
           <Route path="/buy">
               <Buynow/>
           </Route>
           
         
           

           
       </Router>
    )
}

export default MainRoutes
