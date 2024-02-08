import { CursorSVG } from '@/public/assets'
import { CursorProps } from '@/types/type'

const Cursor = ({ color, position, message }: CursorProps) => {
    return (
        <div className="pointer-events-none absolute top-0 left-0"
        style={{ transform: `translateX(${position.x}px) translateY(${position.y}px)` }}>
            <CursorSVG color={color}/>
            {message && 
            <div className="absolute left-2 top-5 px-4 py-2 text-sm leading-relaxed 
            text-white rounded-[20px]" style={{ backgroundColor: color }}>
                <p className="w-60 text-white">{message}</p>
            </div>
            }
        </div>
    )
    }

export default Cursor