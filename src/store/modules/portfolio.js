import axios from "axios";
import authStore from "./auth";

const state = {
  funds: 10000,
  stocks: [],
  dataStocks: [],
};

const mutations = {
  //buy stocks mutation
  BUY_STOCKS(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find((element) => {
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

    setTimeout(() => {
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
        .then((response) =>
          console.log(
            "Successully bought and saved the stocks: " + response.data
          )
        )
        .error((error) => console.log(error));
    }, 200);
  },

  //sell stock mutation
  SELL_STOCKS(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find((element) => element.id == stockId);
    if (record.quantity > quantity) {
      record.quantity -= quantity;
    } else {
      state.stocks.splice(state.stocks.indexOf(record), 1);
    }
    state.funds += stockPrice * quantity;
    setTimeout(() => {
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
        .then((response) =>
          console.log("Stocks have been updated with: " + response.data)
        )
        .error((error) => console.log(error));
    }, 200);
  },
  //set portfolio mutation
  SET_PORTFOLIO(state, portfolio) {
    state.funds = portfolio.funds;
    state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
  },
};

const actions = {
  //sell stock action
  sellStock({ commit }, order) {
    commit("SELL_STOCKS", order);
  },
};

const getters = {
  stockPortfolio(state, getters) {
    return state.stocks.map((stock) => {
      //grab record/stock that matches the data stock(from api)
      const record = getters.stocks.find(
        (element) => element.symbol == stock.id
      );

      //while record is NOT undefined check is to wait for
      //the variable record above to finish it's search
      while (record != undefined) {
        return {
          id: stock.id,
          quantity: Number(stock.quantity),
          symbol: record.symbol,
          price: record.close,
        };
      }
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
