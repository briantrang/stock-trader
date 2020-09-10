import axios from "axios";
import authStore from "./auth";

const state = {
  funds: 10000,
  stocks: [],
};
const mutations = {
  BUY_STOCKS(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find((element) => {
      console.log("element.symbol: " + element.symbol);
      console.log("stockId: " + stockId);
      return element.symbol == stockId;
    });
    if (record) {
      record.quantity += quantity;
    } else {
      state.stocks.push({
        id: stockId,
        symbol: stockId,
        quantity: quantity,
      });
    }
    state.funds -= stockPrice * quantity;
    console.log("before timeout axios patch");
    setTimeout(() => {
      console.log("inside timeout axios patch");
      let data = {
        funds: state.funds,
        stockPortfolio: state.stocks,
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
      };
      axios
        .patch(
          "https://vue-stock-trading-c1d4b.firebaseio.com/users/" +
            localStorage.getItem("userId") +
            ".json" +
            "?auth=" +
            authStore.state.idToken,
          data
        )
        .then((response) => console.log("saved data:" + response.data))
        .error((error) => console.log(error));
    }, 1500);
    console.log("current state.stocks: " + JSON.stringify(state.stocks));
  },

  SELL_STOCKS(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find((element) => element.id == stockId);
    if (record.quantity > quantity) {
      record.quantity -= quantity;
    } else {
      state.stocks.splice(state.stocks.indexOf(record), 1);
    }
    state.funds += stockPrice * quantity;
    console.log("before timeout axios patch");
    setTimeout(() => {
      console.log("inside timeout axios patch");
      let data = {
        funds: state.funds,
        stockPortfolio: state.stocks,
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
      };
      axios
        .patch(
          "https://vue-stock-trading-c1d4b.firebaseio.com/users/" +
            localStorage.getItem("userId") +
            ".json" +
            "?auth=" +
            authStore.state.idToken,
          data
        )
        .then((response) => console.log("saved data:" + response.data))
        .error((error) => console.log(error));
    }, 1500);
    console.log("current state.stocks: " + JSON.stringify(state.stocks));
  },
  SET_PORTFOLIO(state, portfolio) {
    state.funds = portfolio.funds;
    state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
  },
};

const actions = {
  sellStock({ commit }, order) {
    commit("SELL_STOCKS", order);
  },
};

const getters = {
  stockPortfolio(state, getters) {
    return state.stocks.map((stock) => {
      const record = getters.stocks.find(
        (element) => element.symbol == stock.id
      );

      return {
        id: stock.id,
        quantity: Number(stock.quantity),
        symbol: record.symbol,
        price: record.close,
      };
    });
  },
  funds(state) {
    return state.funds;
  },
  quantity(state) {
    return state.stocks.quantity;
  },
};

export default { state, mutations, actions, getters };
