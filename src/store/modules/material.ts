import {Reducer, combineReducers} from 'redux'
import materialApi from '../../api/material';
import { call, put, take, fork } from 'redux-saga/effects';
import { Material } from '../../entity';
// import { UserInfo } from '../../entity';

const MODULE_KEY = 'material'

enum ActionType {
  setBG = 'material/setBG',
  queryHotMaterials = `material/queryHotMaterials`,
  queryHotSuccess = `material/queryHotSuccess`,
  queryAllMaterials = `material/queryAllMaterials`,
  queryAllSuccess = `material/queryAllSuccess`,
  setCurrentMaterial = `material/setCurrentMaterial`,
}

const preloadState = {};

const hot: Reducer = (state = [], action) => {
  switch(action.type) {
    case ActionType.queryHotSuccess:
      return action.payload;
    default: return state;
  }
}

const all: Reducer = (state = [], action) => {
  switch(action.type) {
    case ActionType.queryAllSuccess:
      return action.payload;
    default: return state;
  }
}

const currentMaterial: Reducer = (state = {}, action) => {
  switch(action.type) {
    case ActionType.setCurrentMaterial:
      return action.payload;
    default: return state;
  }
}

const reducer: Reducer = combineReducers({hot, all, currentMaterial});

const actions = {
  setBG(payload: string) {
    return {
      type: ActionType.setBG,
      payload,
    }
  },
  queryHotMaterials() {
    return {
      type: ActionType.queryHotMaterials,
    }
  },
  queryHotSuccess(payload: Material[]) {
    return {
      type: ActionType.queryHotSuccess,
      payload,
    }
  },
  setCurrentMaterial(payload: Material) {
    return {
      type: ActionType.setCurrentMaterial,
      payload,
    }
  },
  queryAllMaterials() {
    return {
      type: ActionType.queryAllMaterials,
    }
  },
  queryAllSuccess(payload: Material[]) {
    return {
      type: ActionType.queryAllSuccess,
      payload
    }
  },
}

const selectors = {
  currentMaterial: (state: any): Material => state[MODULE_KEY].currentMaterial,
  background: (state: any): string => selectors.currentMaterial(state).background,
  hotMaterials: (state: any): Material[] => state[MODULE_KEY].hot,
  allMaterials: (state: any): Material[] => state[MODULE_KEY].all,
}

// function* login() {
//   const {payload: params} = yield take(ActionType.Login);
//   const {token, userInfo} = yield call(accountApi.login, params);
//   localStorage.setItem('token', token);
//   yield put({type: ActionType.LoginSuccss, payload: {token, userInfo}});
// }

function* queryHotMaterials() {
  while(true) {
    yield take(ActionType.queryHotMaterials);
    try {
      const {list} = yield call(materialApi.getHotList, undefined);
      yield put(actions.queryHotSuccess(list));
      if (list.length > 0) {
        yield put(actions.setCurrentMaterial(list[0]));
      }
    } catch (err) {
      //
    }
  }
}

function* queryAllMaterials() {
  while(true) {
    yield take(ActionType.queryAllMaterials);
    try{
      const {list} = yield call(materialApi.getMaterialList, undefined);
      yield put(actions.queryAllSuccess(list));
      if (list.length > 0) {
        yield put(actions.setCurrentMaterial(list[0]));
      }
    } catch (err) {
      //
    }
  }
}

function* saga() {
  yield fork(queryHotMaterials);
  yield fork(queryAllMaterials);
}

export {
  reducer,
  selectors,
  actions,
  saga,
  MODULE_KEY,
  preloadState,
}