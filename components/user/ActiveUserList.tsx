import React, { useMemo } from 'react'
import { useOthers, useSelf } from '@/liveblocks.config'
import Avatar from './Avatar'
import styles from './index.module.css'
import { generateRandomName } from '@/lib/utils'

const ActiveUserList = () => {
    const users = useOthers()
    const currentUser = useSelf()

    const hasMoreUsers = users.length > 3

    // memorize users as long as no new user joins
    const memoizedUsers = useMemo(() => {
        return (
            <div className="flex items-center justify-center gap-1">
                <div className="flex pl-3">
                    {currentUser && (
                        <Avatar name="You" 
                        otherStyles="border-[3px] border-primary-purple"/>
                    )}

                    {users.slice(0, 3).map(({ connectionId, info }) => {
                    return (
                        <Avatar key={connectionId} name={generateRandomName()} 
                        otherStyles="-ml-3"/>
                    );
                    })}

                    {hasMoreUsers && <div className={styles.more}>+{users.length - 3}</div>}
                </div>
            </div>
        )
    }, [users.length])

    return memoizedUsers
}

export default ActiveUserList
