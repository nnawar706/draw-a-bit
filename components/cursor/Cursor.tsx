import { CursorSVG } from '@/public/assets'
import { CursorProps } from '@/types/type'

const Cursor = ({ color, position, message }: CursorProps) => {
    return (
        <div className="pointer-events-none absolute top-0 left-0"
        style={{ transform: `translateX(${position.x}px) translateY(${position.y}px)` }}>
            <CursorSVG color={color}/>
        </div>
    )
    }

export default Cursor