import axios from "axios";
import authState from "./auth";

const state = {
  stocks: [],
};

const mutations = {
  SET_STOCKS(state, stocks) {
    state.stocks = stocks;
  },

  RND_STOCKS(state) {
    state.stocks.forEach((stock) => {
      stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
    });
  },
};

const actions = {
  buyStock: ({ commit }, order) => {
    commit("BUY_STOCKS", order);
  },
  initStocks: async ({ commit }) => {
    //When api marketstack still has available request use
    //http://api.marketstack.com/v1/eod?access_key=b8aeb1b2ed9780014ee531b16ff1f01f&symbols=AAPL,FB,AMZN,GOOG,NFLX&limit=5
    // else use: https://vue-stock-trading-c1d4b.firebaseio.com/

    // let stockData = await axios
    //   .get(
    //     "http://api.marketstack.com/v1/eod?access_key=b8aeb1b2ed9780014ee531b16ff1f01f&symbols=AAPL,FB,AMZN,GOOG,NFLX&limit=5"
    //   )
    //   .then((response) => {
    //     stockData = response.data.data;
    //     console.log("stock data from api: " + JSON.stringify(stockData));
    //     commit("SET_STOCKS", stockData);
    //   })
    //   .catch((error) => console.log(error));

    let stockData;
    axios
      .get(
        "http://api.marketstack.com/v1/eod?access_key=b8aeb1b2ed9780014ee531b16ff1f01f&symbols=AAPL,FB,AMZN,GOOG,NFLX&limit=5"
      )
      .then((response) => {
        stockData = response.data.data;
        commit("SET_STOCKS", stockData);
        return stockData;
      })
      .catch((error) => console.log(error));

    setTimeout(() => {
      console.log(`Stockdata before patch! ${JSON.stringify(stockData)}`);
      axios
        .put(
          "https://vue-stock-trading-c1d4b.firebaseio.com/data.json" +
            "?auth=" +
            authState.state.idToken,
          stockData
        )
        .then((response) => console.log(`Successful patch! ${response}`))
        .catch((error) => console.log(error));
    }, 1000);
  },
  randomizeStocks: ({ commit }) => {
    commit("RND_STOCKS");
  },
};

const getters = {
  stocks: (state) => {
    return state.stocks;
  },
};

export default { state, mutations, actions, getters };
