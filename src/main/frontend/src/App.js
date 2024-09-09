import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import Header from "./common/Header";
import Main_bak from "./components/layouts/Main_bak";
import Login from "./common/Login";
import Join from "./common/Join";
import Footer from "./common/Footer";
import Main from "./components/Main";

import QnaList from "./components/layouts/admin/qna/QnaList";
import QnaRegist from "./components/layouts/admin/qna/QnaRegist";
import QnaDetail from "./components/layouts/admin/qna/QnaDetail";
import QnaModify from "./components/layouts/admin/qna/QnaModify";

import ProductList from "./components/layouts/admin/product/ProductList"
import ProductRegist from "./components/layouts/admin/product/ProductRegist";
import ProductDetail from "./components/layouts/admin/product/ProductDetail";
import ProductModify from "./components/layouts/admin/product/ProductModify";

import MyPage from "./components/layouts/user/mypage/MyPage";

function App() {
    return (
        <div className="body">
            <div className='wrapper'>
                <CookiesProvider>
                <BrowserRouter>
                    <Header/>
                    <div className="contentWrapper">
                        <Routes>
                            <Route path="/mainHtml" element={<Main_bak />}/>
                            <Route path="/" element={<Main />}/>
                            <Route path="/login" element={<Login />}/>
                            <Route path="/join" element={<Join />}/>
                            <Route path="/oauth/callback/kakao" element={<OAuthRedirectHandler />}

                            <Route path="/myPage" element={<MyPage />}/>

                            <Route path="/qnaList" element={<QnaList />}/>
                            <Route path="/qnaRegist" element={<QnaRegist />}/>
                            <Route path="/qnaDetail/:id" element={<QnaDetail />} />
                            <Route path="/qnaModify/:id" element={<QnaModify />} />

                            <Route path="/productList" element={<ProductList />}/>
                            <Route path="/productRegist" element={<ProductRegist />}/>
                            <Route path="/productDetail/:id" element={<ProductDetail />} />
                            <Route path="/productModify/:id" element={<ProductModify />} />
                        </Routes>
                    </div>
                </BrowserRouter>
                </CookiesProvider>
                <Footer/>
            </div>

        </div>
    );
}

export default App;