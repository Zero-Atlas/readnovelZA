import { json } from "react-router";
import UserContex from "./userContext";
import { useState } from "react";

export default function UserContextProvider(props) {
  const [user, setUser] = useState({});
  //method on admin user------------------------------
  //auth method
  const login = (userData) => {
    setUser(userData);
  };
  const logout = () => {
    fetch(`${process.env.REACT_APP_API_KEY}/auth/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then((respon) => {
        if (!respon.ok) throw json("Fail to fetch logout", 500);
        setUser({});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //change name method
  const changeName = (name, title) => {
    setUser((prev) => {
      prev.publicName.name = name;
      prev.publicName.title = title;

      console.log(prev.publicName);
      //save to data base
      fetch(`${process.env.REACT_APP_API_KEY}/user/public-name`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prev.publicName),
        credentials: "include",
      })
        .then((respon) => {
          if (!respon.ok) throw json("Fail to fetch", 500);
        })
        .catch((err) => {
          console.log(err);
        });

      return prev;
    });
  };

  // provider data
  const data = {
    user,
    login,
    logout,
    changeName,
  };
  return (
    <UserContex.Provider value={data}>{props.children}</UserContex.Provider>
  );
}
