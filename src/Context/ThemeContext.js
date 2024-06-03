import React, { createContext, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import actions from '../constants/actions'

export const ThemeContext = createContext()
export const ThemeDispatchContext = createContext()

const InitialState = {
	loading: true,
	colors: {},
	sideBar: false,
}

ThemeProvider.propTypes = {
	children: PropTypes.node.isRequired,
}

const THEME = 'theme'

export default function ThemeProvider({ children }) {
	const reducers = (state, action) => {
		switch (action.type) {
			case actions.sidebar: {
				const stateData = { ...state, sideBar: !state.sideBar }
				localStorage.setItem(THEME, JSON.stringify(stateData))
				return stateData
			}
			case actions.reValues: {
				return action.payload
			}
			case action.loading: {
				return { ...state, loading: false }
			}
		}
	}
	const [theme, dispatch] = useReducer(reducers, InitialState)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const data = JSON.parse(localStorage.getItem(THEME))
			if (data) {
				dispatch({ type: actions.reValues, payload: data })
			}
		}
	}, [dispatch])

	return (
		<ThemeContext.Provider value={theme}>
			<ThemeDispatchContext.Provider value={dispatch}>{children}</ThemeDispatchContext.Provider>
		</ThemeContext.Provider>
	)
}
