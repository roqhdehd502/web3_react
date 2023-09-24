import React, { FC, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./routes/main";
import MyAnimal from "./routes/my-animal";

import Layout from "./components/Layout";

const App: FC = () => {
  const [account, setAccount] = useState<string>("");

  const getAccount = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
      } else {
        alert("Please Install Metamask!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("account", account);
    getAccount();
  }, [account]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main account={account} />} />
          <Route path="my-animal" element={<MyAnimal account={account} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
