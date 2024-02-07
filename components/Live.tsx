import React, { useCallback } from 'react'
import LiveCursors from './cursor/LiveCursors'
import { useMyPresence, useOthers } from '@/liveblocks.config'

const Live = () => {
    // returns list of other users currently present in the room
    const others = useOthers()

    // returns position/presence coordinates of the current user
    const [{ cursor }, updateMyPresence] = useMyPresence() as any

    // when the mouse is down
    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        // subtracting cursor position relative to the window
        const x = e.clientX - e.currentTarget.getBoundingClientRect().x
        const y = e.clientY - e.currentTarget.getBoundingClientRect().y

        updateMyPresence({ cursor, x, y })
    }, [])

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        e.preventDefault()

        // subtracting cursor position relative to the window
        const x = e.clientX - e.currentTarget.getBoundingClientRect().x
        const y = e.clientY - e.currentTarget.getBoundingClientRect().y

        updateMyPresence({ cursor: {x, y} })
    }, [])

    // to handle situation (hide cursor) when cursor leaves the screen
    const handlePointerLeave = useCallback((e: React.PointerEvent) => {
        e.preventDefault()

        updateMyPresence({ cursor: null, message: null })
    }, [])

    return (
        <div 
            onPointerDown={handlePointerDown} 
            onPointerMove={handlePointerMove} 
            onPointerLeave={handlePointerLeave}
        >
            <LiveCursors others={others}/>
        </div>
    )
}

export default Live
