import {  Button, Divider } from '@nextui-org/react'
import AdminLayout from '../../../container/AdminLayout'
import { getTicketLists } from '../../../service/ticket.service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Link from 'next/link'

export default function Page() {
	const { data } = useQuery({
		queryKey: ['lists'],
		queryFn: getTicketLists,
	})

	return (
		<AdminLayout>
			<div className='my-10 grid w-full grid-cols-4 gap-x-4 gap-y-4'>
				{data &&
					data.map((item) => (
						<div
							className='flex flex-col gap-y-4 rounded-xl bg-white p-2 shadow-sm'
							key={item.id}
						>
							<div className='flex items-center justify-between'>
								<h1 className='font-semibold h-10'>{item.title}</h1>
								<span className='text-xs text-default'>
									{new Date(item.created_at).toLocaleDateString('en', {
										year: 'numeric',
										month: '2-digit',
										day: 'numeric',
									})}
								</span>
							</div>
							<div
								className={`min-w- rounded-lg ${item.status === 'open' ? 'bg-primary/10' : item.status === 'answered' ? 'bg-blue-500/30' : 'bg-danger/20'} flex items-center justify-center p-2 text-sm text-primary`}
							>
								Status : {item.status}
							</div>
							<div className='flex  gap-x-2'>
								<span className='text-lg font-semibold'>user : </span>
								<div className='flex flex-col'>
									<span className='text-sm'>{item?.user?.first_name} {item?.user?.last_name}</span>
									<span className='text-xs text-black/50'>{item?.user?.email} </span>
								</div>
							</div>
								<Divider />
								<div className='flex items-center justify-center gap-x-3'>
									<Button fullWidth as={Link} href={`/ticket/lists/${item.id}`} color='primary'>Details</Button>
								</div>
						</div>
					))}
			</div>
		</AdminLayout>
	)
}
