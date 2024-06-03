import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { useRouter } from 'next/router'

SidebarAccordion.propTypes = {
	item: PropTypes.shape({
		title: PropTypes.string,
		children: PropTypes.array,
		icon: PropTypes.string,
		path: PropTypes.string,
	}),
}

export default function SidebarAccordion({ item }) {
	const { pathname, replace } = useRouter()
	const includePath = (children) => {
		const includes = children.some((child) => child.path === pathname)
		if (includes) {
			return 'bg-secondary/10 text-secondary'
		} else {
			return 'text-slate-500'
		}
	}
	return (
		<Accordion
			className='w-full !px-0'
			key={item.title}
			itemClasses={{
				base: 'py-0 w-full !px-0',
				title: `py-0 px-0 ${includePath(item.children)} text-medium`,
				trigger: `px-2 ${includePath(item.children)}  py-[10px] w-full  data-[hover=true]:bg-secondary/20 data-[hover=true]:text-secondary rounded-lg  flex items-center group`,
				indicator: 'text-medium',
				content: 'text-small px-2',
				startContent: `text-slate-600 ${includePath(item.children)}`,
			}}
		>
			<AccordionItem
				startContent={<Icon icon={item.icon} width={22} className='' />}
				title={item.title}
			>
				<ul className='flex w-full flex-col gap-y-2'>
					{item.children.map((item) => (
						<button
							onClick={() => replace(item.path)}
							className='hover:bg-secondary/10 flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-slate-600'
							key={item.title}
						>
							<Icon icon={'tabler:point-filled'} width={12} />
							<span>{item.title}</span>
						</button>
					))}
				</ul>
			</AccordionItem>
		</Accordion>
	)
}
