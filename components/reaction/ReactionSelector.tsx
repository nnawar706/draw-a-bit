import React from 'react'

import { ReactionButtonProps, ReactionProps } from '@/types/type'

const ReactionButton = ({reaction, onSelect}: ReactionButtonProps) => {
    return (
        <button className="transform select-none p-2 text-xl transition-transform hover:scale-150 focus:scale-150 focus:outline-none"
        onPointerDown={() => onSelect(reaction)}>
            {reaction}
        </button>
    )
}

const ReactionSelector = ({ setReaction }: ReactionProps) => {
    return (
        <div
            className="absolute bottom-20 left-0 right-0 mx-auto w-fit transform rounded-full bg-gray-500 
            px-2"
            onPointerMove={(e) => e.stopPropagation()}
            >
            <ReactionButton reaction="👍" onSelect={setReaction} />
            <ReactionButton reaction="🔥" onSelect={setReaction} />
            <ReactionButton reaction="😍" onSelect={setReaction} />
            <ReactionButton reaction="👀" onSelect={setReaction} />
            <ReactionButton reaction="😱" onSelect={setReaction} />
            <ReactionButton reaction="🙁" onSelect={setReaction} />
    </div>
    )
}

export default ReactionSelector