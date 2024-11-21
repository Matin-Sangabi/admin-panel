import {  Textarea } from '@nextui-org/react'
import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'

export default function AppTextArea({ label, placeholder, type, endContent, name, ...other }) {
	const { control } = useFormContext()
	return (
		<Controller
				name={name}
				control={control}
				render={({ field, fieldState: { error } }) => (
					<Textarea
						fullWidth
						endContent={endContent}
						label={label}

						{...field}
						minRows={1}
						maxRows={10}
						isInvalid={!!error}
						errorMessage={error?.message}
						{...other}
						placeholder={placeholder}
						type={type}
						classNames={{ label: 'dark:text-white/90' }}
					/>
				)}
			/>
	)
}

AppTextArea.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	endContent: PropTypes.any,
	name: PropTypes.string,
}
