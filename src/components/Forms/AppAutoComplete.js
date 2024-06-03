import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
export default function AppAutoComplete({
	label,
	placeholder,
	data,
	type,
	endContent,
	name,
	...other
}) {
	const { control } = useFormContext()
	return (
		<div>
			<Controller
				name={name}
				control={control}
				render={({ field, fieldState: { error } }) => (
					<Autocomplete
						fullWidth
						endContent={endContent}
						label={label}
						defaultItems={data}
						selectedKey={field.value}
						{...field}
						onSelectionChange={(e) => field.onChange(e)}
						isInvalid={!!error}
						errorMessage={error?.message}
						{...other}
						placeholder={placeholder}
						type={type}
						classNames={{ label: '' }}
					>
						{(item) => (
							<AutocompleteItem className='text-slate-700' key={item.value}>
								{item.label}
							</AutocompleteItem>
						)}
					</Autocomplete>
				)}
			/>
		</div>
	)
}

AppAutoComplete.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	endContent: PropTypes.any,
	name: PropTypes.string,
	data: PropTypes.array,
}
