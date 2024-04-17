import React, {useState} from 'react'
import './Actions.css'
import Loader from "../../STATIC/Loader/Loader";
import {
    allExecute,
    brandTasteExecution, productDataDetailsExecute, productDataDetailsSheetExecute, productDataDetailsWebExecute,
    productDataExecute,
    speedyOfficesExecute,
    tasteColorExecution
} from "../../../Service/AdminService";


function Actions() {
    const [isLoading, setIsLoading] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const executeAction = async (actionFunction) => {
        setIsLoading(true);
        try {
            const response = await actionFunction();
            setIsLoading(false);
            if (response.status === 200) {
                setModalContent('Success!'); // Show success modal
            } else {
                setModalContent('Error: ' + response.statusText); // Show error modal
            }
        } catch (error) {
            setIsLoading(false);
            setModalContent('Error: ' + error.message); // Show error modal
        }
    };


    return (
        <>
            {isLoading && <Loader/>}
            <div className="actionsContainer">
                <h1>Database Scripts executioners</h1>

                <div className="executeButtons">
                    <button
                        className="executeButton"
                        onClick={() => executeAction(tasteColorExecution)}
                        disabled={isLoading}
                    >
                        <span>Taste - Color #1</span>
                    </button>

                    <button
                        className="executeButton"
                        onClick={() => executeAction(brandTasteExecution)}
                        disabled={isLoading}
                    >
                        <span>Brand & Taste #2</span>
                    </button>

                    <button
                        className="executeButton"
                        onClick={() => executeAction(productDataExecute)}
                        disabled={isLoading}
                    >
                        <span>Product data #3</span>
                    </button>

                    <button
                        className="executeButton"
                        onClick={() => executeAction(productDataDetailsExecute)}
                        disabled={isLoading}
                    >
                        <span>Product data details #4</span>
                    </button>

                    <button
                        className="executeButton"
                        onClick={() => executeAction(productDataDetailsSheetExecute)}
                        disabled={isLoading}
                    >
                        <span>Product data details sheet #5</span>
                    </button>

                    <button
                        className="executeButton"
                        onClick={() => executeAction(productDataDetailsWebExecute)}
                        disabled={isLoading}
                    >
                        <span>Product data details web #6</span>
                    </button>

                    <button
                        className="executeButton"
                        onClick={() => executeAction(speedyOfficesExecute)}
                        disabled={isLoading}
                    >
                        <span>Speedy offices #7</span>
                    </button>

                    <button
                        className="executeButton"
                        onClick={() => executeAction(allExecute)}
                        disabled={isLoading}
                    >
                        <span>Execute all scripts #8</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Actions;
