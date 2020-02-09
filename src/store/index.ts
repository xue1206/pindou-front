import Store from './Store'
import logger from 'redux-logger';
import * as account from './modules/account';
import * as material from './modules/material';

Store.use(account);
Store.use(material);

const store = new Store([logger]);

export default store;