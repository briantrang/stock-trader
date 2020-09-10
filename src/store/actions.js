import axios from "axios";
import authStore from "./modules/auth";

export const loadData = ({ commit }) => {
  axios
    .get(
      "https://vue-stock-trading-c1d4b.firebaseio.com/users/" +
        localStorage.getItem("userId") +
        ".json" +
        "?auth=" +
        authStore.state.idToken
    )
    .then((response) => {
      console.log("loaded data: " + JSON.stringify(response.data));
      // const stocks = response.data.stocks;
      const funds = response.data.funds;
      const stockPortfolio = response.data.stockPortfolio;

      const portfolio = { stockPortfolio, funds };

      // commit("SET_STOCKS", stocks);
      commit("SET_PORTFOLIO", portfolio);
    })
    .error((error) => console.log(error));
};
