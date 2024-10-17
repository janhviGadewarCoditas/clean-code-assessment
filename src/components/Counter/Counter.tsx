import styles from "./Counter.module.scss";
import { CounterProps } from "./Counter.types";

const Counter = ({ quantity, onIncrement, onDecrement }: CounterProps) => {
    return (
        <div className={styles.Counter}>
            <span onClick={onDecrement}>-</span>
            <span>{quantity}</span>
            <span onClick={onIncrement}>+</span>
        </div>
    )
}

export default Counter;
