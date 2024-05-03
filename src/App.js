import {BrowserRouter, Route, Routes} from 'react-router-dom'
import React from 'react'
import Shop from "./Component/Shop/Shop";
import Header from "./Component/STATIC/Header/Header";
import Footer from "./Component/STATIC/Footer/Footer";
import {SkeletonTheme} from "react-loading-skeleton";
import Admin from "./Component/Admin/Admin";
import Product from "./Component/Product/Product";
import About from "./Component/About/About";
import FAQ from "./Component/FAQ/FAQ";

function App() {
    return (
        <>
            <SkeletonTheme baseColor="#ffff" highlightColor="#333">
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<><Shop/></>}/>
                        <Route path="/product" element={<Product/>}/>
                        <Route path="/faq" element={<FAQ/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/admin" element={<Admin/>}/>
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </SkeletonTheme>
        </>
    );
}

export default App;
