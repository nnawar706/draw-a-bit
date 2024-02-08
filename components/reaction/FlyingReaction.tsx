import styles from "./index.module.css"
import { FlyingReactionProps } from "@/types/type"

const FlyingReaction = ({ point, timestamp, value }: FlyingReactionProps) => {
    return (
        <div
        className={`pointer-events-none absolute select-none ${
            styles.disappear
        } text-${(timestamp % 5) + 2}xl ${styles["goUp" + (timestamp % 3)]}`}
        style={{ left: point.x, top: point.y }}
        >
            <div className={styles["leftRight" + (timestamp % 3)]}>
                <div className="-translate-x-1/2 -translate-y-1/2 transform">
                    {value}
                </div>
            </div>
        </div>
    )
}

export default FlyingReaction