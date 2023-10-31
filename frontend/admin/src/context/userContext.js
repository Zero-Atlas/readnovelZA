import { createContext } from "react";

const UserContex = createContext({
  user: {},
  login:undefined,
  logout:undefined,
  changeName:undefined,
});

export default UserContex