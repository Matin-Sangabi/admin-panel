import { Input } from '@nextui-org/react'
import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'

export default function AppInput({ label, placeholder, type, endContent, name, ...other }) {
	const { control } = useFormContext()
	return (
		<div>
			<Controller
				name={name}
				control={control}
				render={({ field, fieldState: { error } }) => (
					<Input
						fullWidth
						endContent={endContent}
						label={label}
						{...field}
						isInvalid={!!error}
						errorMessage={error?.message}
						{...other}
						placeholder={placeholder}
						type={type}
						classNames={{ label: 'dark:text-white/90' }}
					/>
				)}
			/>
		</div>
	)
}

AppInput.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	endContent: PropTypes.any,
	name: PropTypes.string,
}
