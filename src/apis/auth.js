import { LeakRemoveTwoTone } from "@mui/icons-material";
import config from "../config";

const loginUser = async (username, password) => {
  try {
    let response = await config.client.post("/user/signin", {
      username,
      password,
    });
    if (response.status == 200) {
      let user_details = await config.client.get(
        `/user/${response.data.user_id}`,
        {
          username,
          password,
        }
      );
      if (user_details.status == 200) {
        return {
          status: true,
          ...user_details.data,
        };
      } else {
        return {
          status: false,
          err: "failed to get user details",
        };
      }
    } else {
      return {
        status: false,
        err: "failed to signin",
      };
    }
  } catch (err) {
    return {
      status: false,
      err: err.response.data,
    };
  }
};

const createUser = async (username, password) => {
  try {
    let data = await config.client.post("/user/create", {
      username,
      password,
    });
    console.log(data);
    alert("successfully created user")
  } catch (err) {
    console.log(err.response.data);
  }
};

const userAPIS = {
  loginUser,
  createUser,
};
export default userAPIS;
