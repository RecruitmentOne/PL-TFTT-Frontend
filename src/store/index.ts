import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import jobReducer from './slices/jobSlice'
import analyticsReducer from './slices/analyticsSlice'
import realtimeReducer from './slices/realtimeSlice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		jobs: jobReducer,
		analytics: analyticsReducer,
		realtime: realtimeReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					'persist/PERSIST',
					'persist/REHYDRATE',
					'persist/REGISTER'
				],
			},
		}),
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 

export default store 