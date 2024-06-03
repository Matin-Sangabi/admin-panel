import PropTypes from 'prop-types'

import { FormProvider as Form } from 'react-hook-form'

FormProvider.propTypes = {
	method: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
	onSubmit: PropTypes.func,
}

export default function FormProvider({ method, onSubmit, children }) {
	return (
		<Form {...method}>
			<form className='mx-auto w-full' onSubmit={onSubmit}>
				{children}
			</form>
		</Form>
	)
}
