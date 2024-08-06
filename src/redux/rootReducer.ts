import { combineReducers } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import dataReducer from './dataSlice'; // Пример для другого редьюсера

const rootReducer = combineReducers({
  ui: uiReducer,
  data: dataReducer, // Добавьте другие редьюсеры здесь
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
