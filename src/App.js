import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import React from 'react'
import Shop from "./Component/Shop/Shop";
import Header from "./Component/STATIC/Header/Header";
import Footer from "./Component/STATIC/Footer/Footer";
import Product from "./Component/Product/Product";
import About from "./Component/About/About";
import FAQ from "./Component/FAQ/FAQ";
import TermsAndConditions from "./Component/TermsAndConditions/TermsAndConditions";
import Page404 from "./Component/Errors/Page404/Page404";
import Page500 from "./Component/Errors/Page500/Page500";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<><Shop/></>}/>
                    <Route path="/product" element={<Product/>}/>
                    <Route path="/faq" element={<FAQ/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/terms-and-conditions" element={<TermsAndConditions/>}/>
                    <Route path="/page-not-found" element={<Page404/>}/>
                    <Route path="/internal-server-error" element={<Page500/>}/>
                    <Route path="*" element={<Navigate to="/page-not-found"/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    );
}

export default App;
