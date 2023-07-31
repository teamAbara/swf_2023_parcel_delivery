import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Col, Layout, Row } from "antd";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Provider, Network } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/navbar";
import Home from "./pages/home";
import InvoiceRegistration from "./pages/InvoiceRegistration";
import MyPage from "./pages/MyPage";
import CourierInquiry from "./pages/CourierInquiry";
function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/InvoiceRegistration"
              element={<InvoiceRegistration />}
            />
            CourierInquiry
            <Route path="/MyPage" element={<MyPage />} />
            <Route path="/CourierInquiry" element={<CourierInquiry />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
