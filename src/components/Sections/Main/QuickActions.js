import React from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { quickItems } from '../../../constants/routes'

export default function QuickActions() {
	return (
		<div className='flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-6 pt-2'>
			{quickItems.map((item) => (
				<Card
					as={Link}
					href={item.path}
					className='w-full min-w-[200px] max-w-[210px]'
					isPressable
					key={item.title}
				>
					<CardHeader className='flex items-center justify-center text-center text-slate-600'>
						<Icon width={40} icon={item.icon} />
					</CardHeader>
					<CardBody className='flex items-center justify-center pt-4 text-slate-600'>
						{item.title}
					</CardBody>
				</Card>
			))}
		</div>
	)
}
