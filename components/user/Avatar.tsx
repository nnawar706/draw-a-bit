import React from "react"

import styles from "./avatar.module.css"
import { AvatarProps } from "@/types/type"

const IMAGE_SIZE = 48;

const Avatar = ({ name, otherStyles }: AvatarProps) => {
    return (
        <div className={`${styles.avatar} ${otherStyles} h-9 w-9`} data-tooltip={name}>
            <img
                src={`https://liveblocks.io/avatars/avatar-${Math.floor(Math.random() * 30)}.png`}
                height={IMAGE_SIZE}
                width={IMAGE_SIZE}
                className={styles.avatar_picture}
                alt={name}
            />
        </div>
    )
}

export default Avatar