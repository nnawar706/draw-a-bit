import React from 'react'

const SidebarLeft = () => {
    return (
        <section className="flex flex-col min-w-[220px] sticky left-0 h-full max-sm:hidden select-none 
        overflow-y-auto pb-20 bg-primary-black text-primary-grey-300">
            <h3 className="text-center py-4 uppercase text-sm">Elements</h3>
        </section>
    )
}

export default SidebarLeft
