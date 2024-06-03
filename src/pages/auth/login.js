import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Button, Card, Image } from '@nextui-org/react'
import { yupResolver } from '@hookform/resolvers/yup'
import FormProvider from '../../Provider/FormProvider'
import { AppInput } from '../../components/Forms'
import AppPasswordInput from '../../components/Forms/AppPasswordInput'
import { appText } from '../../locales'

export default function Login() {
	const defaultValues = useMemo(() => ({ email: '', password: '' }), [])

	const schema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup.string().required(),
	})

	const methods = useForm({ defaultValues, resolver: yupResolver(schema) })

	const { handleSubmit } = methods

	const onSubmit = async (data) => {
		const formData = { ...data }
		console.log(formData)
	}

	return (
		<div className='flex h-full min-h-screen w-full bg-slate-100'>
			<div className='mx-auto flex w-full max-w-screen-2xl px-4'>
				<div className='hidden grow items-center justify-center lg:flex'>
					<Image src='/images/login/illustration_dashboard.png' alt='login' />
				</div>
				<div className='mx-auto flex h-full min-h-screen w-full max-w-sm flex-col items-center justify-center gap-y-4'>
					<h1 className='text-xl font-semibold text-slate-700'>{appText.signIn}</h1>
					<Card className='w-full px-4 py-4'>
						<FormProvider method={methods} onSubmit={handleSubmit(onSubmit)}>
							<div className='flex w-full flex-col gap-y-4'>
								<AppInput name={'email'} label={'Email'} />
								<AppPasswordInput name={'password'} label={'Password'} />

								<Button color='primary' type='submit' className=''>
									{appText.login}
								</Button>
							</div>
						</FormProvider>
					</Card>
				</div>
			</div>
		</div>
	)
}
