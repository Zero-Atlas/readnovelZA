import { json } from "react-router";
import UserContex from "./userContext";
import { useState } from "react";

export default function UserContextProvider(props) {
  const [user, setUser] = useState({});
  //method on user------------------------------
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

  //follow novel method
  const addFollowed = (novelId) => {
    user.followed.push(novelId);

    //save to data base
    fetch(`${process.env.REACT_APP_API_KEY}/user/followed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user.followed),
      credentials: "include",
    })
      .then((respon) => {
        if (!respon.ok) throw json("Fail to fetch", 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const removeFollowed = (novelId) => {
    const index = user.followed.indexOf(novelId);
    user.followed.splice(index, 1);

    //save to data base
    fetch(`${process.env.REACT_APP_API_KEY}/user/followed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user.followed),
      credentials: "include",
    })
      .then((respon) => {
        if (!respon.ok) throw json("Fail to fetch", 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //tracking history method
  const editHistory = (novelName) => {
    if (typeof user.history === "object") {
      if (!user.history.includes(novelName)) {
        user.history.unshift(novelName);
        if (user.history.length > 10) user.history.pop();
      } else {
        const index = user.history.indexOf(novelName);
        user.history.splice(index, 1);
        user.history.unshift(novelName);
      }

      //save to data base
      fetch(`${process.env.REACT_APP_API_KEY}/user/history`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user.history),
        credentials: "include",
      })
        .then((respon) => {
          if (!respon.ok) throw json("Fail to fetch", 500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // provider data
  const data = {
    user,
    login,
    logout,
    addFollowed,
    removeFollowed,
    editHistory,
    changeName,
  };
  return (
    <UserContex.Provider value={data}>{props.children}</UserContex.Provider>
  );
}
