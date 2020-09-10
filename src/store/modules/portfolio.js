const state = {
  funds: 10000,
  stocks: [],
};

const mutations = {
  BUY_STOCKS(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find((element) => element.symbol == stockId);
    if (record) {
      record.quantity += quantity;
    } else {
      state.stocks.push({
        id: stockId,
        quantity: quantity,
      });
    }
    state.funds -= stockPrice * quantity;
  },

  SELL_STOCKS(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find((element) => element.id == stockId);
    if (record.quantity > quantity) {
      record.quantity -= quantity;
    } else {
      state.stocks.splice(state.stocks.indexOf(record), 1);
    }
    state.funds += stockPrice * quantity;
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
