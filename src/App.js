import {BrowserRouter} from 'react-router-dom'
import React from 'react'
import Shop from "./Component/Shop/Shop";
import Header from "./Component/STATIC/Header/Header";
import Hero from "./Component/Hero/Hero";
import Footer from "./Component/STATIC/Footer/Footer";
import {SkeletonTheme} from "react-loading-skeleton";

function App() {
    return (
        <>
            <SkeletonTheme baseColor="#ffff" highlightColor="#333">
                <BrowserRouter>
                    <Header/>

                    <Hero/>

                    <Shop/>

                    <Footer/>
                </BrowserRouter>
            </SkeletonTheme>
        </>
    );
}

export default App;
