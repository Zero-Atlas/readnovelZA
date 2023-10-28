import { createContext } from "react";

const UserContex = createContext({
  user: {},
  login:undefined,
  logout:undefined,
  addFollowed:undefined,
  removeFollowed:undefined,
  editHistory:undefined,
  changeName:undefined,
});

export default UserContex