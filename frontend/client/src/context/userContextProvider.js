import { json } from "react-router";
import UserContex from "./userContext";

export default function UserContextProvider(props) {
  let user = {};
  //method on user------------------------------
  //auth method
  const login = (userData) => {
    user = userData;
  };
  const logout = () => {
    user = {};
    fetch(`${process.env.REACT_APP_API_KEY}/auth/logout`, { method: "POST" })
      .then((respon) => {
        if (!respon.ok) throw json("Fail to fetch logout", 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
  };
  return (
    <UserContex.Provider value={data}>{props.children}</UserContex.Provider>
  );
}
