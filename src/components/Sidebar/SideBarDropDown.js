import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { useRouter } from 'next/router'

SideBarDropDown.propTypes = {
	item: PropTypes.shape({
		title: PropTypes.string,
		children: PropTypes.array,
		icon: PropTypes.string,
		path: PropTypes.string,
	}),
	swapSideBar: PropTypes.bool,
}

export default function SideBarDropDown({ item }) {
	const { pathname } = useRouter()
	const includeDrop = (children) => {
		const includes = children.some((child) => child.path === pathname)
		if (includes) {
			return true
		} else {
			return false
		}
	}
	return (
		<Dropdown placement='right-start'>
			<DropdownTrigger>
				<Button
					isIconOnly
					variant='light'
					className={`!flex h-12 w-full flex-col items-center hover:!bg-secondary/20 ${includeDrop(item.children) ? '!bg-secondary/15 text-secondary' : 'text-slate-600'} !py-1`}
				>
					<span className='flex items-center justify-center'>
						<Icon icon={item.icon} width={24} />
					</span>
					<span className='flex items-center justify-center text-xs'>{item.title}</span>
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				items={item.children}
				itemClasses={{
					base: [
						'rounded-md',
						'text-slate-600',
						'transition-opacity',
						'data-[hover=true]:text-secondary',
						'data-[hover=true]:bg-secondary/20',
						'dark:data-[hover=true]:bg-secondary/20',
						'data-[selectable=true]:focus:bg-secondary/30',
						'data-[pressed=true]:opacity-70',
						'data-[focus-visible=true]:ring-default-500',
					],
				}}
				aria-label='Static Actions'
			>
				{(item) => (
					<DropdownItem
						startContent={<Icon icon={'tabler:point-filled'} width={12} />}
						key={item.path}
						href={item.path}
						as={Link}
					>
						{item.title}
					</DropdownItem>
				)}
			</DropdownMenu>
		</Dropdown>
	)
}
