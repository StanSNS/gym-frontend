import React from 'react'
import './Actions.css'


function Actions() {
    return (
        <div className="actionsContainer">
            <h1>Scripts executioners</h1>


            <div className="progress" role="progressbar" aria-label="Success Animated striped example"
                 aria-valuenow="45"
                 aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                     style={{width: "25%"}}></div>
            </div>

            <div className="executeButtons">
                <button className="executeButton">
                    <span>Stage One</span>
                </button>

                <button className="executeButton">
                    <span>Stage Two</span>
                </button>

                <button className="executeButton">
                    <span>Stage Three</span>
                </button>

                <button className="executeButton">
                    <span>Stage Four</span>
                </button>

                <button className="executeButton">
                    <span>Stage Five</span>
                </button>

                <button className="executeButton">
                    <span>All Stages</span>
                </button>
            </div>


        </div>
    );
}

export default Actions;
