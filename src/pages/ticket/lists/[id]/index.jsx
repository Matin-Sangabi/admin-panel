import AdminLayout from '../../../../container/AdminLayout'
import {
	answerToTicket,
	closeTicket,
	getTicketListsDetails,
} from '../../../../service/ticket.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { Avatar, Button, Chip, Divider, Image } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import FormProvider from '../../../../Provider/FormProvider'

import AppTextArea from '../../../../components/Forms/AppTextArea'
import Link from 'next/link'

export default function Index() {
	const { query } = useRouter()

	const { id } = query

	const { data } = useQuery({
		queryKey: ['lists-id', id],
		queryFn: () => getTicketListsDetails(id),
		enabled: Boolean(id),
	})

	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: closeTicket,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['lists-id'] })
		},
	})

	const { mutateAsync: sendMessageContent, isPending: messagePending } = useMutation({
		mutationFn: answerToTicket,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['lists-id'] })
		},
	})

	const defaultValues = useMemo(() => ({ content: '' }), [])
	const methods = useForm({ defaultValues })
	const { handleSubmit, reset } = methods

	const onsubmit = async (data) => {
		try {
			const formData = { ...data, ticket: id }
			await sendMessageContent(formData)
			reset()
		} catch (error) {
			console.log(error)
		}
	}

	const closeTicketHandler = async () => {
		try {
			await mutateAsync(id)
		} catch (error) {
			console.log(error)
		}
	}

	if (data)
		return (
			<AdminLayout>
				<div className='mx-auto flex w-full max-w-3xl gap-x-2 pb-3'>
					<Avatar />
					<div className='mx-auto flex w-full max-w-3xl flex-col'>
						<span className='text-sm'>
							{data?.user?.first_name} {data?.user?.last_name}
						</span>
						<span className='text-xs text-black/50'>{data?.user?.email} </span>
					</div>
				</div>
				<div className='mx-auto w-full max-w-3xl space-y-6 rounded-xl border border-primary p-3'>
					<div className='flex w-full items-center justify-between'>
						<h1 className='font-semibold'>{data?.title}</h1>
						<div className='flex items-center gap-x-4'>
							<Chip>{data.status}</Chip>
							<Button
								isLoading={isPending}
								onClick={closeTicketHandler}
								variant='bordered'
								color='primary'
								size='sm'
							>
								Close
							</Button>
						</div>
					</div>
					<Divider />
					<div className='flex h-full max-h-[500px] flex-col gap-y-4 overflow-auto py-4'>
						{data.messages.map((item) => (
							<div
								key={item.id}
								className={`flex ${item.sender_type === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-x-4`}
							>
								<Avatar
									size='sm'
									name={item.user}
									color={item.sender_type === 'user' ? 'secondary' : 'primary'}
									className=''
								/>
								<div
									className={`max-w-xs rounded-lg p-2 text-primary ${item.sender_type === 'user' ? 'rounded-tr-none bg-secondary/20' : 'rounded-tl-none bg-primary/10'} mt-4`}
								>
									<div className='flex w-full flex-col gap-y-3'>
										{item.files.length > 0 ? (
											<div className='flex w-full flex-wrap items-center gap-x-4'>
												{item.files.map((image, index) => (
													<div
														key={index}
														className='flex w-full flex-col items-center justify-between'
													>
														<div className='h-[120px] w-[200px]'>
															<Image
																radius='none'
																src={image?.file}
																alt='test'
																className='h-[120px] w-[200px] object-cover'
															/>
														</div>
														<>
															{' '}
															<Link
																href={image.file}
																target='_blank'
																className='mt-2 text-xs font-semibold text-primary'
															>
																Attachment
															</Link>
														</>
													</div>
												))}
											</div>
										) : (
											<p>{item.content}</p>
										)}

										<span className='flex w-full items-center justify-end px-4 text-xs'>
											{item.created_at}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className='m-4 mx-auto w-full max-w-3xl rounded-xl border bg-primary/10 p-2'>
					<FormProvider method={methods} onSubmit={handleSubmit(onsubmit)}>
						<div className='flex w-full items-center gap-x-4'>
							<AppTextArea
								labelPlacement={'outside'}
								label={''}
								placeholder={'Insert Message Here ...'}
								name={'content'}
								minRows={1}
								maxRows={10}
							/>
							<Button isLoading={messagePending} type='submit' color='primary'>
								Send
							</Button>
						</div>
					</FormProvider>
				</div>
			</AdminLayout>
		)
}

/**
 * [
    {
        "id": "640770bc-20a1-440c-b8a3-d9191d11aeb5",
        "ticket": "5185336d-e4b2-49ff-a0d3-ac86a56ec8a7",
        "content": "test body",
        "sender_type": "user",
        "created_at": "2024-11-19T12:58:07.472102Z",
        "files": []
    }
]
 */
