import { Icon } from '@iconify/react'
import { Button, Input } from '@nextui-org/react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
export default function AppPasswordInput({ label, placeholder, name, ...other }) {
	const [showPassword, setShowPassword] = useState(false)
	const { control } = useFormContext()
	return (
		<div>
			<Controller
				name={name}
				control={control}
				render={({ field, fieldState: { error } }) => (
					<Input
						fullWidth
						endContent={
							<Button
								onClick={() => setShowPassword(!showPassword)}
								isIconOnly
								radius='full'
								color='default'
								size='sm'
								variant='flat'
							>
								{showPassword ? (
									<Icon width={22} icon={'solar:eye-bold-duotone'} />
								) : (
									<Icon width={22} icon={'solar:eye-closed-bold-duotone'} />
								)}
							</Button>
						}
						label={label}
						{...field}
						isInvalid={!!error}
						errorMessage={error?.message}
						{...other}
						placeholder={placeholder}
						type={showPassword ? 'text' : 'password'}
						classNames={{ label: 'dark:text-white/90' }}
					/>
				)}
			/>
		</div>
	)
}

AppPasswordInput.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	name: PropTypes.string,
}
