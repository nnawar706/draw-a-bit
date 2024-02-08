import React, { useCallback, useEffect, useState } from 'react'

import LiveCursors from './cursor/LiveCursors'
import { useMyPresence, useOthers } from '@/liveblocks.config'
import { CursorMode, CursorState, Reaction } from '@/types/type'
import CursorChat from './cursor/CursorChat'
import ReactionSelector from './reaction/ReactionSelector'
import FlyingReaction from './reaction/FlyingReaction'
import useInterval from '@/hooks/useInterval'

const Live = () => {
    // returns list of other users currently present in the room
    const others = useOthers()
    
    // current user cursor state
    const [cursorState, setCursorState] = useState<CursorState>({mode: CursorMode.Hidden})

    const [reactions, setReactions] = useState<Reaction[]>([])

    // returns position/presence coordinates of the current user
    const [{ cursor }, updateMyPresence] = useMyPresence() as any

    const setReaction = useCallback((reaction: string) => {
        setCursorState({
            mode: CursorMode.Reaction,
            reaction: reaction,
            isPressed: false
        })
    }, [])

    // to handle situation when the mouse comeback on the screen
    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        // subtracting cursor position relative to the window
        const x = e.clientX - e.currentTarget.getBoundingClientRect().x
        const y = e.clientY - e.currentTarget.getBoundingClientRect().y

        updateMyPresence({ cursor: {x, y} })

        // if current cursor mode is reaction, means 'r' has been pressed
        setCursorState((state: CursorState) => 
            cursorState.mode === CursorMode.Reaction ? {...state, isPressed: true} : state)
    }, [cursorState.mode, setCursorState])

    const handlePointerUp = useCallback((e: React.PointerEvent) => {
        setCursorState((state: CursorState) => 
            cursorState.mode === CursorMode.Reaction ? {...state, isPressed: true} : state)
    }, [cursorState.mode, setCursorState])

    // to handle situation when the mouse is moving
    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        e.preventDefault()

        if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) 
        {
            // subtracting cursor position relative to the window
            const x = e.clientX - e.currentTarget.getBoundingClientRect().x
            const y = e.clientY - e.currentTarget.getBoundingClientRect().y

            updateMyPresence({ cursor: {x, y} })
        }
    }, [])

    // to handle situation (hide cursor) when cursor leaves the screen
    const handlePointerLeave = useCallback((e: React.PointerEvent) => {
        setCursorState({ mode: CursorMode.Hidden })

        updateMyPresence({ cursor: null, message: null })
    }, [])

    useEffect(() => {
        const onKeyUp = (e: KeyboardEvent) => {
            /* when / is pressed, show popup chat field */
            if (e.key === '/')
            {
                setCursorState({ 
                    mode: CursorMode.Chat,
                    previousMessage: null,
                    message: ""
                })
            } 
            /* when r is pressed, show reaction list popup */
            else if (e.key === 'r')
            {
                setCursorState({
                    mode: CursorMode.ReactionSelector
                })
            } 
            /* when escape key is pressed, hide input popup 
            and set presence's message to empty string */
            else if (e.key === 'Escape')
            {
                updateMyPresence({ message: "" })
                setCursorState({
                    mode: CursorMode.Hidden
                })
            }
        }

        const onKeyDown = (e: KeyboardEvent) => {
            // restrict browser default events when other keys are pressed
            if (e.key === "/") {
                e.preventDefault()
            }
        }

        window.addEventListener("keydown", onKeyDown)
        window.addEventListener("keyup", onKeyUp)

        return () => {
            window.removeEventListener("keyup", onKeyUp)
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [updateMyPresence])

    useInterval(() => {
        if (cursorState.mode === CursorMode.Reaction && cursorState.isPressed && cursor) {
            setReactions((prevReactions) => prevReactions.concat([{
                point: {x: cursor.x, y: cursor.y},
                value: cursorState.reaction,
                timestamp: Date.now()
            }]))
        }
    }, 100)

    return (
        <div className="h-[100vh] w-full flex justify-center items-center"
            onPointerMove={handlePointerMove} 
            onPointerLeave={handlePointerLeave}
            onPointerUp={handlePointerUp}
            onPointerDown={handlePointerDown} 
        >
            <h1 className="text-2xl text-white">draw-a-bit</h1>

            {reactions.map((reaction) => <FlyingReaction
                key={reaction.timestamp.toString()}
                point={reaction.point}
                timestamp={reaction.timestamp}
                value={reaction.value}
            />)}

            {cursor && 
            <CursorChat 
                // position of current user cursor
                cursor={cursor}
                cursorState={cursorState}
                setCursorState={setCursorState}
                updateMyPresence={updateMyPresence}
            />}

            {/* if cursor mode is reaction selector, show the reaction selector */}
            {cursorState.mode == CursorMode.ReactionSelector && 
            <ReactionSelector
                setReaction={setReaction}
            />}

            {/* show currently active users' cursors on exact position */}
            <LiveCursors others={others}/>
        </div>
    )
}

export default Live
