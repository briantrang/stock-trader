import axios from "../../axios-auth";
import globalAxios from "axios";
import router from "../../router/index";
import moment from "moment";

const state = {
  idToken: null,
  userId: null,
  user: null,
};

const mutations = {
  authUser(state, userData) {
    state.idToken = userData.token;
    state.userId = userData.userId;
  },
  storeUser(state, user) {
    state.user = user;
  },
  clearAuthData(state) {
    state.idToken = null;
    state.userId = null;
  },
};
const actions = {
  //SetLogoutTimer action
  setLogoutTimer({ dispatch }, expirationTime) {
    setTimeout(() => {
      dispatch("logout");
    }, expirationTime * 1000);
  },

  //Signup action
  signup({ commit, dispatch }, authData) {
    axios
      .post("/accounts:signUp?key=AIzaSyAYACdm0Fk5mEbMixspoWWEPMvMpJ3Cf2w", {
        email: authData.email,
        password: authData.password,
        name: authData.name,
        returnSecureToken: true,
      })
      .then((res) => {
        commit("authUser", {
          token: res.data.idToken,
          userId: res.data.localId,
        });
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch("storeUser", {
          ...authData,
          id: localStorage.getItem("userId"),
        });
        dispatch("setLogoutTimer", res.data.expiresIn);
      })
      .catch((error) => console.log(error));
    setTimeout(() => {
      router.replace("/dashboard");
    }, 1500);
  },

  //Login
  login({ commit, dispatch }, authData) {
    axios
      .post(
        "/accounts:signInWithPassword?key=AIzaSyAYACdm0Fk5mEbMixspoWWEPMvMpJ3Cf2w",
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        }
      )
      .then((res) => {
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem("expirationDate", expirationDate);
        commit("authUser", {
          token: res.data.idToken,
          userId: res.data.localId,
        });
        dispatch("setLogoutTimer", res.data.expiresIn);
      })
      .catch((error) => console.log(error));

    setTimeout(() => {
      axios
        .get(
          "https://vue-stock-trading-c1d4b.firebaseio.com/users/" +
            localStorage.getItem("userId") +
            ".json" +
            "?auth=" +
            state.idToken
        )
        .then((response) => {
          const funds = response.data.funds;
          const stockPortfolio = response.data.stockPortfolio;
          const portfolio = { stockPortfolio, funds };

          commit("SET_PORTFOLIO", portfolio);
        })
        .error((error) => console.log(error));
    }, 1000);
    setTimeout(() => {
      dispatch("tryAutoLogin");
      router.replace("/dashboard");
    }, 800);
  },
  //Auto login action
  tryAutoLogin({ commit }) {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const expirationDate = localStorage.getItem("expirationDate");
    const now = new Date();
    if (now >= expirationDate) {
      return;
    }
    const userId = localStorage.getItem("userId");
    commit("authUser", {
      token: token,
      userId: userId,
    });

    setTimeout(() => {
      axios
        .get(
          "https://vue-stock-trading-c1d4b.firebaseio.com/users/" +
            localStorage.getItem("userId") +
            ".json" +
            "?auth=" +
            state.idToken
        )
        .then((response) => {
          const funds = response.data.funds;
          const stockPortfolio = response.data.stockPortfolio;
          const portfolio = { stockPortfolio, funds };

          commit("SET_PORTFOLIO", portfolio);
        })
        .error((error) => console.log(error));
    }, 0);
    setTimeout(() => {
      axios
        .get(
          "https://vue-stock-trading-c1d4b.firebaseio.com/data/" +
            ".json" +
            "?auth=" +
            state.idToken
        )
        .then((response) => {
          const stocks = response.data;
          commit("SET_STOCKS", stocks);
        })
        .error((error) => console.log(error));
    }, 300);
  },
  logout({ commit }) {
    commit("clearAuthData");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("fbID");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    this.reset();
    router.replace("/");
  },
  // eslint-disable-next-line no-unused-vars
  storeUser({ commit, state }, userData) {
    if (!state.idToken) {
      return;
    }
    globalAxios
      .post(
        "/users/" + userData.id + ".json" + "?auth=" + state.idToken,
        userData
      )
      .then((res) => localStorage.setItem("fbID", res.data.name))
      .catch((error) => console.log(error));
  },
  fetchUser({ commit, state }) {
    if (!state.idToken) {
      return;
    }
    globalAxios
      .get(
        "/users/" +
          localStorage.getItem("userId") +
          "/.json" +
          "?auth=" +
          state.idToken
      )
      .then((res) => {
        const data = res.data;
        const users = [];
        for (let key in data) {
          const user = data[key];

          users.push(user);
        }
        commit("storeUser", users[0]);
      })
      .catch((error) => console.log(error));
  },
  updateCurrentStocks({ dispatch }) {
    const currentDay = moment().format("MMMM Do YYYY");
    let previousDay = getPrevDay();

    function getPrevDay() {
      axios
        .get(
          "https://vue-stock-trading-c1d4b.firebaseio.com/" +
            ".json" +
            "?auth=" +
            state.idToken
        )
        .then(async (response) => {
          previousDay = await response.data.setDay;
        })
        .catch((error) => console.log(error));
    }
    setTimeout(() => {
      if (JSON.stringify(currentDay) > JSON.stringify(previousDay)) {
        dispatch("initStocks");
        console.log("stocks has just been initiated!");
      } else {
        console.log(`Did not call api since it is not a new day!`);
        return;
      }
    }, 400);

    axios
      .put(
        "https://vue-stock-trading-c1d4b.firebaseio.com/setDay" +
          ".json" +
          "?auth=" +
          state.idToken,
        JSON.stringify(currentDay)
      )
      .then((response) => {
        console.log(response);
        console.log(`Just updated setDay in db with ${currentDay}`);
      })
      .catch((error) =>
        console.log("Failed to updae setDay because: " + error)
      );
  },
};
const getters = {
  user(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.idToken !== null;
  },
};

export default { state, mutations, actions, getters };
