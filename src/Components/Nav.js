import React from 'react'
import {NavLink} from 'react-router-dom'
import  './Nav.css'
import { useSelector } from 'react-redux'
import {  useDispatch } from 'react-redux';
import $ from 'jquery';
import axios from 'axios';
import { useEffect  } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CreateIcon from '@mui/icons-material/Create';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
export const Nav = () => {

    function animation(){
        var tabsNewAnim = $('#navbarSupportedContent');
        var activeItemNewAnim = tabsNewAnim.find('.active');
        var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
        var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
        var itemPosNewAnimTop = activeItemNewAnim.position();
        var itemPosNewAnimLeft = activeItemNewAnim.position();
        $(".hori-selector").css({
          "top":itemPosNewAnimTop.top + "px", 
          "left":itemPosNewAnimLeft.left + "px",
          "height": activeWidthNewAnimHeight + "px",
          "width": activeWidthNewAnimWidth + "px"
        });
        $("#navbarSupportedContent").on("click","li",function(e){
          $('#navbarSupportedContent ul li').removeClass("active");
          $(this).addClass('active');
          var activeWidthNewAnimHeight = $(this).innerHeight();
          var activeWidthNewAnimWidth = $(this).innerWidth();
          var itemPosNewAnimTop = $(this).position();
          var itemPosNewAnimLeft = $(this).position();
          $(".hori-selector").css({
            "top":itemPosNewAnimTop.top + "px", 
            "left":itemPosNewAnimLeft.left + "px",
            "height": activeWidthNewAnimHeight + "px",
            "width": activeWidthNewAnimWidth + "px"
          });
        });
      }

    const Data=  useSelector(state => state);
    const dispatch = useDispatch();
    const clickHandeler = ()=>{
        dispatch({type: "signOut"})
        localStorage.removeItem("accesToken")
    }
    useEffect(()=>{
    axios.get("http://localhost:3001/auth/auth" , {headers:{accessToken: localStorage.getItem("accesToken")}}).then((res)=>{
        if(res.data.error){
            dispatch({type: "signOut"})
        }else{   
            dispatch({type:"Login", login:true, username: res.data.username  ,id:  res.data.id})     
        }
        animation();
        $(window).on('resize', function(){
          setTimeout(function(){ animation(); }, 500);
        });
    })
    },[])

    return ( 
    <nav className="navbar navbar-expand-lg navbar-mainbg">
        <NavLink className="navbar-brand navbar-logo" to="/" exact>
         Legacy
      </NavLink>

      <button 
        className="navbar-toggler navBB"
        onClick={ function(){
          setTimeout(function(){ animation(); });
        }}
        type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
       
        <MenuIcon ></MenuIcon>
      </button>

      <div 
        className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
            
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
            
            <li className="nav-item active">
              <NavLink className="nav-link" to="/" exact>
                <HomeIcon className='CreateIcon'/>
                Home
              </NavLink>
            </li>

            {
              Data.login && <li className="nav-item">
              <NavLink className="nav-link" to="/createpost" exact>
                
                <CreateIcon className='CreateIcon'></CreateIcon>
                 Create Post

              </NavLink> 
            </li>
            }

            {
              Data.login && <li className="nav-item">
              <NavLink className="nav-link" to= {`/profile/${Data.id}`} exact>
                <i 
                className="far fa-address-book">
                </i>My Profile 
              </NavLink>
            </li>
            }
                {
              Data.login && <li className="nav-item">
              <NavLink className="nav-link" to= {"/addfriend"} exact>
                <i 
                className="far fa-address-book">
                </i>Add Friend
              </NavLink>
            </li>
            }
           
            {!Data.login && <li className="nav-item">
              <NavLink className="nav-link" to="/login" exact>
               <LoginIcon className='CreateIcon'></LoginIcon>
               login
              </NavLink>
            </li>}
            
            {Data.login && <li className="nav-item" onClick={clickHandeler}>
              <NavLink className="nav-link" to="/" exact >
               <LogoutIcon className='CreateIcon'></LogoutIcon>
               Log Out
              </NavLink>
            </li>}
        </ul>
      </div>


    </nav>
        
    )
}


// <div className= {classes.Nav}>
        //     <NavLink activeClassName={classes.active} to="/" exact   >
        //     <h4>Home</h4>
        //     </NavLink>
        //     <NavLink activeClassName={classes.active} to= "/createpost" >
        //     <h4> Create Post </h4>
        //     </NavLink>
        //     <NavLink activeClassName={classes.active} to= "/login" >
        //     {!Data.login && <h4> Login </h4>}
        //     </NavLink>
        //     {Data.login  && <h4 onClick={clickHandeler}> Sign Out </h4>}
            
        //     {Data.login  && <h4 > {Data.username} </h4>}
        // </div>