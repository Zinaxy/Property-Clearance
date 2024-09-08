import PrimaryButton from "@/Components/PrimaryButton";
import React from "react";

const APIJSON = ({ properties }) => {
    const jsonData = JSON.stringify(properties, null, 2); // Converts the object to a JSON string with indentation

    const handleExport = () => {
        // Create a Blob from the JSON string
        const blob = new Blob([jsonData], { type: "application/json" });

        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "properties_data.json"; // Set the file name

        // Append the link to the body
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Clean up by removing the link element
        document.body.removeChild(link);
    };

    return (
        <div>
            <h2 className="font-bold text-4xl my-8">
                {properties.data.length} Available Properties:
            </h2>
            <PrimaryButton onClick={handleExport}>
                Export to JSON File
            </PrimaryButton>{" "}
            {/* Button to trigger export */}
            <pre>{jsonData}</pre>{" "}
            {/* Displays the JSON string in a formatted way */}
            <button onClick={handleExport}>Export to JSON</button>{" "}
            {/* Button to trigger export */}
        </div>
    );
};

export default APIJSON;
