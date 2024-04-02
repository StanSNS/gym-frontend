import {BrowserRouter, Route, Routes} from 'react-router-dom'
import React from 'react'
import Shop from "./Component/Shop/Shop";
import Header from "./Component/STATIC/Header/Header";
import Hero from "./Component/Hero/Hero";
import Footer from "./Component/STATIC/Footer/Footer";
import {SkeletonTheme} from "react-loading-skeleton";
import Admin from "./Component/Admin/Admin";

function App() {
    return (
        <>
            <SkeletonTheme baseColor="#ffff" highlightColor="#333">
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<><Hero /><Shop /></>} />


                        <Route path="/admin/*" element={<Admin />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </SkeletonTheme>
        </>
    );
}

export default App;
