import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./App.css";

const wallets = [new MartianWallet()];
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
      <App />
    </AptosWalletAdapterProvider>
  </React.StrictMode>
);

reportWebVitals();
