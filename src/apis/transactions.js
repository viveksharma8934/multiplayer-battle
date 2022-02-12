import config from "../config";

const GetAllTransactions = async (userId) => {
  try {
    let txn = await config.client.get("/user/transactions/5");
    if (txn.status == 200) {
      return {
        status: true,
        txns: txn.data,
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

const TxnAPI = {
  GetAllTransactions,
};

export default TxnAPI;
