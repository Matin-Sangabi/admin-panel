const { useContext } = require('react')
const { ThemeDispatchContext } = require('../Context/ThemeContext')
const { errorText } = require('../locales')

const useThemeDispatch = () => {
	const context = useContext(ThemeDispatchContext)
	if (!context) throw new Error(errorText.themeDispatchContext)
	return context
}

export default useThemeDispatch
