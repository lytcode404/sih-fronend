import { useEffect } from "react";

const SearchEngine = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cse.google.com/cse.js?cx=c09fb2f621f3c473d"; // Your cx key here
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div>
            <h2>Search for Indian Judicial Articles:</h2>
            <div className="gcse-search"></div>
        </div>
    );
};

export default SearchEngine;
