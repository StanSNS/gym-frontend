import {BrowserRouter} from 'react-router-dom'
import React from 'react'
import Shop from "./Component/Shop/Shop";
import Header from "./Component/STATIC/Header/Header";
import Hero from "./Component/Hero/Hero";
import Footer from "./Component/STATIC/Footer/Footer";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header/>

                <Hero/>

                <Shop/>

                <Footer/>
            </BrowserRouter>
        </>
    );
}

export default App;
