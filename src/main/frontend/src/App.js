// src/main/frontend/src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./common/Header";
import Main from "./components/layouts/Main";
import Footer from "./common/Footer";
import Qna from "./components/layouts/qna/Qna";
import QnaRegist from "./components/layouts/qna/QnaRegist";
import MainHtml from "./components/mainHtml";

import ProductList from "./components/layouts/admin/product/ProductList"
import ProductRegist from "./components/layouts/admin/product/ProductRegist";
import ProductDetail from "./components/layouts/admin/product/ProductDetail";
import ProductModify from "./components/layouts/admin/product/ProductModify";

function App() {
    return (
        <div className="body">
            <div className='wrapper'>
                <BrowserRouter>
                    <Header/>
                    <div className="contentWrapper">
                        <Routes>
                            <Route path="/" element={<Main/>}/>
                            <Route path="/qna" element={<Qna />}/>
                            <Route path="/qnaRegist" element={<QnaRegist />}/>
                            <Route path="/mainHtml" element={<MainHtml />}/>
                            <Route path="/productList" element={<ProductList />}/>
                            <Route path="/productRegist" element={<ProductRegist />}/>
                            <Route path="/productDetail/:id" element={<ProductDetail />} />
                            <Route path="/productModify/:id" element={<ProductModify />} />
                        </Routes>
                    </div>
                </BrowserRouter>
                <Footer/>
            </div>

        </div>
    );
}

export default App;