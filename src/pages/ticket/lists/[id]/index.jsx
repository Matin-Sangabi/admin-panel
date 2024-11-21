import AdminLayout from '../../../../container/AdminLayout'
import {
	answerToTicket,
	closeTicket,
	getTicketListsDetails,
} from '../../../../service/ticket.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { Avatar, Button, Chip, Divider } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import FormProvider from '../../../../Provider/FormProvider'

import AppTextArea from '../../../../components/Forms/AppTextArea'

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
								<Avatar size='sm' name={item.user}  color={item.sender_type === "user" ? "secondary" : "primary"} className='' />
								<div
									className={`max-w-xs rounded-lg p-2 text-primary ${item.sender_type === 'user' ? 'rounded-tr-none bg-secondary/20' : 'rounded-tl-none bg-primary/10'} mt-4`}
								>
									{item.content}
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
