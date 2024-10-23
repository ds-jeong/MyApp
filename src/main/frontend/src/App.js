import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import Header from "./common/Header";
import Login from "./common/Login";
import Join from "./common/Join";
import Footer from "./common/Footer";
import Main from "./pages/Main";

import QnaList from "./pages/admin/qna/QnaList";
import QnaRegist from "./pages/admin/qna/QnaRegist";
import QnaDetail from "./pages/admin/qna/QnaDetail";
import QnaModify from "./pages/admin/qna/QnaModify";

import ProductList from "./pages/admin/product/ProductList"
import ProductRegist from "./pages/admin/product/ProductRegist";
import ProductDetail from "./pages/admin/product/ProductDetail";
import ProductModify from "./pages/admin/product/ProductModify";

import UserProductList from "./pages/user/product/UserProductList"
import UserProductDetail from "./pages/user/product/UserProductDetail"

import MyPage from "./pages/user/mypage/MyPage";
import Cart from "./pages/user/cart/Cart";
import UserOrder from "./pages/user/order/UserOrder";

import Payment from "./pages/user/payment/Payment";
import PaymentSuccess from "./pages/user/payment/PaymentSuccess";


import KakaoLoginHandler from "./components/KakaoLoginHandler";
import OrderDetail from "./pages/user/order/OrderDetail";

function App() {
    return (
        <div className="body">
            <div className='wrapper'>
                <CookiesProvider>
                <BrowserRouter>
                    <Header/>
                    <div className="contentWrapper">
                        <Routes>
                            <Route path="/" element={<Main />}/>
                            <Route path="/login" element={<Login />}/>
                            <Route path="/join" element={<Join />}/>
                            <Route path="/login/kakao" element={<KakaoLoginHandler />}/>

                            <Route path="/myPage" element={<MyPage />}/>
                            <Route path="/cart" element={<Cart />}/>
                            <Route path="/userOrder" element={<UserOrder />}/>
                            <Route path="/payment" element={<Payment />}/>
                            <Route path="/payment/success" element={<PaymentSuccess />}/>
                            <Route path="/order/detail" element={<OrderDetail />}/>


                            <Route path="/userProductList" element={<UserProductList />}/>
                            <Route path="/userProductDetail/:id" element={<UserProductDetail />} />
                            <Route path="/userProductList/favoriteProductList" element={<UserProductList />} />
                            <Route path="/userProductList/lowerPriceProductList" element={<UserProductList />} />
                            <Route path="/userProductList/higherViewsProductList" element={<UserProductList />} />
                            <Route path="/userProductList/higherTotalSalesProductList" element={<UserProductList />} />


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