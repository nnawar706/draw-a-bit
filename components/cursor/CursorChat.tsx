import React from 'react'

import { CursorChatProps, CursorMode } from '@/types/type'

const CursorChat = ({ cursor, cursorState, setCursorState, updateMyPresence }: CursorChatProps) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateMyPresence({ message: e.target.value })
        
        setCursorState({
            mode: CursorMode.Chat,
            previousMessage: null,
            message: e.target.value
        })
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') 
        {
            setCursorState({
                mode: CursorMode.Chat,
                // @ts-ignore
                previousMessage: cursorState.message,
                message: ''
            })
        } else if (e.key === 'Escape') {
            setCursorState({
                mode: CursorMode.Hidden
            })
        }
    }
    
    return (
        <div className="absolute top-0 left-0"
            style={{ transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)` }}
        >
            {
            cursorState.mode === CursorMode.Chat &&
            <>
                <div className="absolute left-2 top-5 bg-purple-500 px-4 py-2 text-sm leading-relaxed 
                text-white rounded-[20px]" 
                // to stop other key events from triggering i.e. pressing r must not open reactions popu while chatting
                onKeyUp={(e) => e.stopPropagation()}>
                    {cursorState.previousMessage && (<div>{cursorState.previousMessage}</div>)}
                    <input autoFocus className="z-10 w-60 border-none bg-transparent text-white 
                        placeholder-purple-300 outline-none"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder={cursorState.previousMessage ? "" : "Share your thoughts..."}
                        value={cursorState.message}
                        maxLength={50}
                    />
                </div>
            </>
            }
        </div>
    )
}

export default CursorChat
