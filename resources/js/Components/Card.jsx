import React from "react";

const Card = ({ children }) => {
    return (
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
            {children}
        </div>
    );
};

export default Card;
