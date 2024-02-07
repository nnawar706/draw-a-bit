    import { LiveCursorProps } from '@/types/type'
import React from 'react'
import Cursor from './Cursor'
import { COLORS } from '@/constants'

const LiveCursors = ({ others }: LiveCursorProps) => {
    // map on each users and show different cursors on exact position on screen
    return others.map(({ connectionId, presence }) => {
        if (!presence?.cursor) return

        return (
            <Cursor 
                key={connectionId}
                color={COLORS[Number(connectionId) % COLORS.length]}
                position={presence.cursor}
                message={presence.message}
            />
        )
    })
}

export default LiveCursors