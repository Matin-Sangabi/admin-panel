const { useContext } = require('react')
const { ThemeContext } = require('../Context/ThemeContext')
const { errorText } = require('../locales')

const useTheme = () => {
	const context = useContext(ThemeContext)
	if (!context) throw new Error(errorText.themeContext)
	return context
}

export default useTheme
