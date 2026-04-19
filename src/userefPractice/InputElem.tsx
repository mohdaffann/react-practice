import { useRef } from "react";

function SearchBar() {
    const inputRef = useRef(null);

    const handleClick = () => {

    };

    return (
        <>
            <input ref={inputRef} placeholder="Search..." />
            <button onClick={handleClick}>Focus Input</button>
        </>
    );
}