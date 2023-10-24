import { json } from "react-router";
import UserContex from "./userContext";
import { useState } from "react";

export default function UserContextProvider(props) {
  const [user,setUser]=useState({})
  //method on user------------------------------
  //auth method
  const login = (userData) => {
    setUser(userData);
  };
  const logout = () => {
    setUser({});
    fetch(`${process.env.REACT_APP_API_KEY}/auth/logout`, { method: "POST" })
      .then((respon) => {
        if (!respon.ok) throw json("Fail to fetch logout", 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //change name method
  const changeName=(name,title)=>{
    setUser(prev=>{
      prev.publicName.name=name
      prev.publicName.title=title
      return prev
    })
  }

  //post novel method
  const addPost=(novelId)=>{}
  const deletePost=(novelId)=>{}

  //follow novel method
  const addFollowed=(novelId)=>{}
  const removeFollowed=(novelId)=>{}

  //tracking history method
  const editHistory=(novelId)=>{}

  // provider data
  const data = {
    user,
    login,
    logout,
    addPost,
    deletePost,
    addFollowed,
    removeFollowed,
    editHistory,
    changeName,
  };
  return (
    <UserContex.Provider value={data}>{props.children}</UserContex.Provider>
  );
}
