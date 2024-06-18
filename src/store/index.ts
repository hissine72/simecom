import { configureStore , combineReducers} from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from "redux-persist";
import categories from "../store/catogries/catogriesSlice";
import produc from "../store/products/productSlice";
import cart from "../store/cart/cartslice"
import storage from "redux-persist/lib/storage";
import auth from "../store/auth/authSlice"

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whiteList: ["user", "accessToken"],
};
const  cartpersistConfig = {
  key: "cart",
  storage,
  whiteList: ["items"],
};

const rootreducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  categories,
  produc,
  
  cart :persistReducer(cartpersistConfig, cart),
  

})
const persistedReducer = persistReducer(rootPersistConfig, rootreducer);

 const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>;
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch;
  const persistor = persistStore(store)
  export  { store , persistor };
