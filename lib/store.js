import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import playerReducer from './Slices/playerSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['players'],
  };

  const rootReducer = combineReducers({
    players: playerReducer,
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const makeStore = () => configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  
  export const persistor = persistStore(makeStore());