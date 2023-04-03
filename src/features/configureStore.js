import { configureStore } from '@reduxjs/toolkit';

// import reducers
// import greetingReducer from './greetingSlice';

// Create Redux store:
const store = configureStore({
  reducer: {
    // Add reducers
    // greetingReducer,
  },
});

export default store;
