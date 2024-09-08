import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function SelectInput(
    { className = "", isFocused = false, options = [], ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <select
            {...props}
            className={
                "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-sky-500 dark:focus:border-primary focus:ring-sky-500 dark:focus:ring-primary rounded-md shadow-sm " +
                className
            }
            ref={input}
        >
            {options.map((option) => (
                <option key={option}>{option}</option>
            ))}
        </select>
    );
});
