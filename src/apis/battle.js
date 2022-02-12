import config from "../config";

const CreateBattle = async (userId) => {
  try {
    let battle = await config.client.post(`/battles/create/${userId}`);
    if (battle.status == 200) {
      return {
        status: true,
        ...battle.data,
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
const SendResult = async (battleId, score, userId) => {
  console.log(battleId, score, userId);
  await config.client.post("/battles/result", {
    battle_id: battleId,
    score: score,
    player: userId,
  });
};
const GetAllBattles = async (userId) => {
  try {
    let battle = await config.client.get(`/battles/${userId}`);
    if (battle.status == 200) {
      return {
        status: true,
        battles: battle.data ? battle.data : [],
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
const BattleAPI = {
  CreateBattle,
  SendResult,
  GetAllBattles,
};
export default BattleAPI;
