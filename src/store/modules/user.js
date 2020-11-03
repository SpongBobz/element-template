import { login, getUserInfo } from "@/api/user";
import { getAccessToken, setAccessToken, removeAccessToken } from "@/util/auth";

const state = {
  user: null, // 用户信息
  accessToken: getAccessToken(), // token
  updateSize: null,
  changeNum: 0
};

const mutations = {
  _setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
  },
  _setUser(state, user) {
    state.user = user;
  },
  _setUpdateSize(state, value) {
    state.updateSize = value;
  },
  _setChangeNum(state, value) {
    state.changeNum = value;
  },
  _changeNum(state) {
    state.changeNum++;
  }
};

const actions = {
  /**
   * @description 登录
   * @param {Object} userInfo 登录用户信息
   * @returns {boolean} true 登录成功  |  false 登录失败
   */
  login({ commit }, userInfo) {
    return login(userInfo)
      .then(result => {
        if (result.Success) {
          commit("_setAccessToken", result.Data);
          setAccessToken(result.Data);
        }
        return result;
      })
      .catch(error => {
        return error;
      });
  },
  /**
   * @description 获取用户信息
   */
  async getUserInfo({ commit }) {
    return await getUserInfo().then(userInfo => {
      commit("_setUser", userInfo);
      return userInfo;
    });
  },

  /**
   * @description 退出登录，清空登录状态
   */
  logout({ commit }) {
    removeAccessToken();
    commit("_setAccessToken", null);
    commit("_setUser", null);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
