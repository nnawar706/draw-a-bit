import Image from 'next/image'
import React from 'react'

import { navElements } from '@/constants'
import { Logo } from '@/public/assets'
import { ActiveElement, TopbarProps } from '@/types/type'
import ShapesMenu from './ShapesMenu'
import NewThread from './comment/NewThread'
import { Button } from './ui/button'
import ActiveUserList from './user/ActiveUserList'

const Topbar = ({ activeElement, imageInputRef, handleActiveElement, handleImageUpload }: TopbarProps) => {
    const isActive = (value: string | Array<ActiveElement>) =>
        (activeElement && activeElement.value === value) ||
        (Array.isArray(value) && value.some((val) => val?.value === activeElement?.value));

    return (
        <section className="flex select-none items-center justify-between 
        bg-primary-black px-10 py-2 text-white">
            <Image src={Logo} alt="logo" width="50"/>

            

            <ActiveUserList/>
        </section>
    )
}

export default Topbar