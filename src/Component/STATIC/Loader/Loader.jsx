import React, {useEffect} from "react";
import "./Loader.css";

function Loader() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);
    return (
        <div>
            <div className="overlayBlocker"></div>
            <div className="overlayLoader">
                <div className="loader"></div>
            </div>
        </div>
    );
}

export default Loader;
