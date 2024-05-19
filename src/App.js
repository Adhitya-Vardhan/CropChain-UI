import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import KvkManager from "./pages/KvkManager";
import Farmer from "./pages/Farmer";
import Scientist from "./pages/Scientist";
import { MoralisProvider } from "react-moralis";
import ScientistList from "./components/ScientistList";
import FarmerList from "./components/FarmerList";
import OpenImages from "./components/OpenImages";
import CloseImages from "./components/CloseImages";
import OpenScientist from "./components/OpenScientist";
import OpenFarmer from "./components/OpenFarmer";
import FinalImages from "./components/FinalImages";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import console from "console-browserify";

function App() {
  // useEffect(() => {
  //   const checkMetaMask = () => {
  //     if (typeof window.ethereum === "undefined") {
  //       toast.warn("No Wallet Found, Download Meta mask", {
  //         position: "top-center",
  //         autoClose: false,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //     }
  //   };

  //   checkMetaMask();
  // }, []);

  useEffect(() => {
    const checkMetaMask = async () => {
      if (typeof window.ethereum === "undefined") {
        toast.warn("No Wallet Found, Download MetaMask", {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }

      try {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        const sepoliaChainId = "0xaa36a7"; // Sepolia test network chain ID in hex

        if (chainId !== sepoliaChainId) {
          toast.warn("Please switch to the Sepolia network", {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        console.error("Error checking MetaMask network:", error);
      }
    };

    checkMetaMask();
  }, []);

  return (
    <div className="App">
      <MoralisProvider initializeOnMount={false}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kvkmanager" element={<KvkManager />} />
            <Route path="/farmer" element={<Farmer />} />
            <Route path="/scientist" element={<Scientist />} />
            <Route path="/scientistlist" element={<OpenScientist />} />
            <Route path="/farmerlist" element={<OpenFarmer />} />
            <Route path="/openimages" element={<OpenImages />} />
            <Route path="/finalimages" element={<FinalImages />} />
            <Route path="/closeimages" element={<CloseImages />} />
            <Route path="/kvkmanager/scientist" element={<ScientistList />} />
            <Route path="/kvkmanager/farmer" element={<FarmerList />} />
          </Routes>
        </Router>

        <ToastContainer />
      </MoralisProvider>
    </div>
  );
}

export default App;
