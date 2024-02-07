import React, { useCallback, useState } from 'react'

import LiveCursors from './cursor/LiveCursors'
import { useMyPresence, useOthers } from '@/liveblocks.config'
import { CursorMode, CursorState } from '@/types/type'
import CursorChat from './cursor/CursorChat'

const Live = () => {
    // returns list of other users currently present in the room
    const others = useOthers()
    
    // current user cursor state
    const [cursorState, setCursorState] = useState<CursorState>({mode: CursorMode.Hidden})

    // returns position/presence coordinates of the current user
    const [{ cursor }, updateMyPresence] = useMyPresence() as any

    // to handle situation when the mouse comeback on the screen
    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        // subtracting cursor position relative to the window
        const x = e.clientX - e.currentTarget.getBoundingClientRect().x
        const y = e.clientY - e.currentTarget.getBoundingClientRect().y

        updateMyPresence({ cursor: {x, y} })
    }, [])

    // to handle situation when the mouse is moving
    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        e.preventDefault()

        // subtracting cursor position relative to the window
        const x = e.clientX - e.currentTarget.getBoundingClientRect().x
        const y = e.clientY - e.currentTarget.getBoundingClientRect().y

        updateMyPresence({ cursor: {x, y} })
    }, [])

    // to handle situation (hide cursor) when cursor leaves the screen
    const handlePointerLeave = useCallback((e: React.PointerEvent) => {
        setCursorState({ mode: CursorMode.Hidden })

        updateMyPresence({ cursor: null, message: null })
    }, [])

    return (
        <div className="h-[100vh] w-full flex justify-center items-center"
            onPointerMove={handlePointerMove} 
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown} 
        >
            <h1 className="text-2xl text-white">draw-a-bit</h1>

            {cursor && 
            <CursorChat 
                // position of current user cursor
                cursor={cursor}
                cursorState={cursorState}
                setCursorState={setCursorState}
                updateMyPresence={updateMyPresence}
            />}

            {/* show currently active users' cursors on exact position */}
            <LiveCursors others={others}/>
        </div>
    )
}

export default Live
