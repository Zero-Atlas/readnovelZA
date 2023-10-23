import { createContext } from "react";

const UserContex = createContext({
  user: {},
  login:undefined,
  logout:undefined,
  addPost:undefined,
  deletePost:undefined,
  addFollowed:undefined,
  removeFollowed:undefined,
  editHistory:undefined,
});

export default UserContex