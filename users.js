import usersApi from "../../api/users";
import * as types from "../mutation-types";

const getDefaultState = () => {
  return { error: null, loading: false };
};

export default {
  state: getDefaultState(),
  actions: {
    async createUser({ commit }, payload) {
      try {
        commit(types.USER_CREATE_REQUEST, { loading: true });

        const response = await usersApi.registerEmployee(payload);

        commit(types.USER_CREATE_SUCCESS, {
          loading: false,
        });

        commit(types.USER_CREATE_RESET);

        return response.data;
      } catch (error) {
        commit(types.USER_CREATE_FAILURE, {
          loading: false,
          error: error.response.data,
        });

        throw new Error(error.response.data);
      }
    },
  },
  mutations: {
    [types.USER_CREATE_REQUEST](state, { loading }) {
      state.loading = loading;
    },
    [types.USER_CREATE_SUCCESS](state, { loading }) {
      state.loading = loading;
    },
    [types.USER_CREATE_FAILURE](state, { loading, error }) {
      state.loading = loading;
      state.error = error;
    },
    [types.USER_CREATE_RESET](state) {
      Object.assign(state, getDefaultState());
    },
  },
  getters: {},
};
