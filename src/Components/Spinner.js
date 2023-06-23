import React from 'react'
import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const override = {
    display: "block",
    borderColor: "red",
    width : '100px',
    margin: "50px auto",
};

const Spinner = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#36d7b7");

    return (
        <div className="sweet-loading">
            <BeatLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}

export default Spinner
