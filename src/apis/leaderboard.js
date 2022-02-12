import config from "../config";

const GetLeaderBoard = async () => {
  try {
    let txn = await config.client.get("/leaderboard");
    if (txn.status == 200) {
      return {
        status: true,
        leaderboard: txn.data,
      };
    } else {
      return {
        status: false,
        err: "something went wrong",
      };
    }
  } catch (err) {
    return {
      status: false,
      err: err.response.data,
    };
  }
};

const LeaderBoardAPI = {
  GetLeaderBoard,
};

export default LeaderBoardAPI;
