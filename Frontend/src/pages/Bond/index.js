import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import styled from 'styled-components'
import { ethers } from "ethers";
import benefitsAbi from "../../constants/abis/benefitsToken";
import presaleAbi from "../../constants/abis/presale";
import { useWeb3React } from '@web3-react/core';
import logo from "../../assets/logos/benifiet.png"

const SwapContainer = styled.div`
  background: linear-gradient(311.99deg, rgba(0, 0, 0, 0.3) -22.55%, rgba(255, 255, 255, 0.3) 131.34%), #2c2c3dcc;
  background-blend-mode: soft-light, normal;
  border-radius: 15px;
  position: relative;
  width: 30%;
  height: 34vh;
  @media (max-width: 760px) {
    height: 37vh
  }
`
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #FFFFFF44;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`
const TokenArea = styled.div`
  padding: 1rem 1rem 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 8vh;
`
const inputStyle = {
  background: "linear-gradient(317.7deg, rgba(0, 0, 0, 0.4) 0%, rgba(255, 255, 255, 0.4) 105.18%), white",
  backgroundBlendMode: "soft-light, normal",
  border: "0.5px solid rgba(255, 255, 255, 0.4)",
  boxSizing: "border-box",
  borderRadius: "50px",
  width: "7vw",
  display: "flex",
  alignItems: "center",
  color: "black"
};


export default function BondPage() {


  // const tokenAAddress = "0xA90761C369320567DB7d9C2667187c24de41735a";
  // const benefitsAbi = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";
  const daiToken = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";
  const usdcToken = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
  const daiBondAddress = "0x42D881095948944AbB118654db469636bFCF3571";
  const usdcBondAddress = "0x25e51895f751BB3566C51EDaF98944F744c25663";

  // --------------------------------------------------------------------------Dai-----------------------------------------------

  const [buyDaiAmount, setDaiBuyAmount] = useState();
  const [isDaiDisableApp, setDaiDisableApp] = useState(false);
  const [isDaiDisableBond, setDaiDisableBond] = useState(true);
  const [flagDai, setDaiflag] = useState(0);
  const [DaitokenAmount, setDaitokenAmount] = useState(0);
  const { account, library, connector } = useWeb3React()

  const approveDai = async () => {
    try {


      if (buyDaiAmount >= 1 && connector && window.ethereum) {
        setDaitokenAmount(buyDaiAmount);
        setDaiDisableApp(true);
        setDaiDisableBond(true);
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const evotInstance = new ethers.Contract(
          daiBondAddress,
          presaleAbi,
          signer
        );

        const tokenInstance = new ethers.Contract(daiToken, benefitsAbi, signer);

        const exchangeRatio1 = await evotInstance.exchangeRatio();

        const transaction = await tokenInstance.approve(
          daiBondAddress,
          (buyDaiAmount * exchangeRatio1 * 10 ** 5).toString()
        );

        const receipt = await transaction.wait();
        console.log('receipt', receipt);
        alert("DAI have approved");
        setDaiflag(1);
        setDaiDisableBond(false);
      } else {
        console.log(account + library + connector + "dd");
        alert("input amount of token or connection wallet!");

      }
    } catch (error) {
      console.log(error + "Dai Approve Fail");
      alert("Failed to approve DAI");

    }
  };


  const buyDai = async () => {
    try {


      if (DaitokenAmount >= buyDaiAmount && connector && buyDaiAmount >= 1 && window.ethereum) {
        setDaiDisableApp(true);
        setDaiDisableBond(true);
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const evotInstance = new ethers.Contract(
          daiBondAddress,
          presaleAbi,
          signer
        );

        const exchangeRatio1 = await evotInstance.exchangeRatio();

        const transaction = await evotInstance.Buy((buyDaiAmount * 10 ** 9).toString());
        const receipt = await transaction.wait();
        console.log("receipt", receipt)
        alert("DAI have bonded!")
        setDaiflag(0);
        setDaiDisableApp(false);
      } else {
        alert('amount of approved DAI is higher!');
      }
    } catch (error) {
      console.log(error + "BUY DAI FAIL");
      alert("Failed to buy Dai")
    }

  };

  const onDaiChange = async (e) => {
    await setDaiBuyAmount(e.target.value);
  };

  useEffect(() => {
    setDaiDisableApp(false);
    if (flagDai === 1) {
      setDaiDisableBond(false);
    } else {
      setDaiDisableBond(true);
    }

  }, [buyDaiAmount])
  // --------------------------------------------------------------------------USDC-------------------------------------------------

  const [buyUsdcAmount, setUsdcBuyAmount] = useState();
  const [isUsdcDisableApp, setUsdcDisableApp] = useState(false);
  const [isUsdcDisableBond, setUsdcDisableBond] = useState(true);
  const [flagUsdc, setUsdcflag] = useState(0);
  const [UsdctokenAmount, setUsdctokenAmount] = useState(0);


  const approveUsdc = async () => {
    try {
      if (buyUsdcAmount >= 1 && connector && window.ethereum) {
        setUsdctokenAmount(buyUsdcAmount);
        setUsdcDisableApp(true);
        setUsdcDisableBond(true);
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const evotInstance = new ethers.Contract(
          usdcBondAddress,
          presaleAbi,
          signer
        );

        const tokenInstance = new ethers.Contract(usdcToken, benefitsAbi, signer);

        const exchangeRatio1 = await evotInstance.exchangeRatio();

        const transaction = await tokenInstance.approve(
          usdcBondAddress,
          (buyUsdcAmount * exchangeRatio1 * 10 ** 5).toString()
        );

        const receipt = await transaction.wait();
        console.log('receipt', receipt);
        alert("USDC have approved!");
        setUsdcflag(1);
        setUsdcDisableBond(false);
      } else {
        alert("input amount of token or connection wallet!")
      }
    } catch (err) {
      console.log(err + "USDC Approve fail");
      alert("Failed to approve USDC!")
    }
  };


  const buyUsdc = async () => {
    try {


      if (UsdctokenAmount >= buyUsdcAmount && connector && buyUsdcAmount >= 1 && window.ethereum) {
        setUsdcDisableApp(true);
        setUsdcDisableBond(true);
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const evotInstance = new ethers.Contract(
          usdcBondAddress,
          presaleAbi,
          signer
        );


        const transaction = await evotInstance.Buy((buyUsdcAmount * 10 ** 9).toString());
        const receipt = await transaction.wait();
        console.log("receipt" + receipt);
        alert("USDC have bonded!")
        setUsdcflag(0);
        setUsdcDisableApp(false);
      } else {
        alert('amount of  approved USDC is higher!');
      }
    } catch (error) {
      console.log(error + "BUY USDC FAIL");
      alert("Failed to bond USDC!")
    }

  };

  const onUsdcChange = async (e) => {
    await setUsdcBuyAmount(e.target.value);
  };

  useEffect(() => {
    setUsdcDisableApp(false);
    if (flagUsdc === 1) {
      setUsdcDisableBond(false);
    } else {
      setUsdcDisableBond(true);
    }

  }, [buyUsdcAmount])

  return (
    <>
      <div style={{
        width: "100%", position: "relative", display: "flex", height: "100% !important", flexFlow: "column", justifyContent: "center"
      }}>
        <div className="dark-box-shadow bond-tag"
          style={{ position: "absolute", top: "15vh", left: "50%", transform: "translate(-50%, 0)", width: "60vw", display: "flex", justifyContent: "space-between", marginBottom: "25px", borderBottom: "5px solid #44c42d", borderRadius: "20px", padding: "0px 15px 0px 15px " }}>

          <span style={{ color: "#44c42d", fontSize: "20px", letterSpacing: "1.5px" }}>BOND</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img className="w-1 md:w-7 mr-2 " src={logo} alt="logo" />
            <p style={{ color: "#44c42d" }}>BENEFITS $18</p>
          </div>
          {/* <a href="https://www.w3schools.com" style={{ color: "#44c42d", fontSize: "20px", letterSpacing: "1.5px" }}>Overview</a>

                <a style={{ color: "#44c42d", fontSize: "20px", letterSpacing: "1.5px" }}>Treasury</a> */}
        </div>
        {/* <div className="dark-box-shadow"
          style={{ display: "flex", width: "80%", justifyContent: "space-between", marginBottom: "20px", marginTop: "180px", borderBottom: "5px solid #44c42d", borderRadius: "20px", padding: "0 8px 0 8px" }}>
          <span style={{ color: "#44c42d", fontSize: "20px", letterSpacing: "1.5px" }}>BOND</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img className="w-1 md:w-7 mr-2 " src={logo} alt="logo" />
            <p style={{ color: "#44c42d" }}>BENEFITS $18</p>
          </div>
        </div> */}
        <div
          style={{ position: "relative", top: "30vh" }}
        >
          <div className="pt-3 text-white flex items-center justify-around bond-content"
            style={{ display: "flex", width: "100%", padding: "1% 3%" }}
          >
            <SwapContainer
              className=" dark-box-shadow bond-card"
            >
              <div
                className="px-3 pt-3 text-white flex items-center justify-between"
              >
                <span style={{ color: "#44c42d", fontSize: "20px", letterSpacing: "1.5px" }}>DAI</span>
              </div>
              <Divider />
              <TokenArea style={{ height: "14vh",justifyContent: "space-around" }}
              >
                <div style={{ padding: "10px", color: "#37ccab", letterSpacing: "0.5px", }}>
                  {/* <p>Price Of BENIFIET:   <b>$18</b></p> */}
                  <p>You can exchange 18 DAI <br />per 1 BENEFITS</p>
                </div>
                {/* <TokenInput tokenKey={TokenKeys.TOKEN_A} ref={tokenAInput} /> */}
                <input type="number" placeholder="Benefits" style={inputStyle} className="px-2 py-1 cursor-pointer box-shadow input" value={buyDaiAmount} onChange={onDaiChange}></input>
              </TokenArea>

              <Divider />

              <TokenArea
              >
                <Button
                  className="w-full human-green m-15"
                  disabled={isDaiDisableApp}
                  onClick={approveDai}
                  width="50vh"
                  height="6vh"
                >
                  Approve
          </Button>
                <Button
                  className="w-full human-green m-15"
                  disabled={isDaiDisableBond}
                  onClick={buyDai}
                  width="50vh"
                  height="6vh"
                >
                  Bond
              </Button>
              </TokenArea>

            </SwapContainer>

            <SwapContainer
              className="max-w-2xl dark-box-shadow bond-card"
            >
              <div
                className="px-3 pt-3 text-white flex items-center justify-between"
              >
                <span style={{ color: "#44c42d", fontSize: "20px", letterSpacing: "1px" }}>USDC</span>
              </div>
              <Divider />
              <TokenArea style={{ height: "14vh", justifyContent: "space-around" }}
              >
                <div style={{ padding: "10px", color: "#37ccab", letterSpacing: "0.5px", }}>
                  {/* <p>Price Of BENIFIET:   <b>$18</b></p> */}
                  <p>You can exchange 18 USDC <br />per 1 BENEFITS</p>
                </div>
                {/* <TokenInput tokenKey={TokenKeys.TOKEN_A} ref={tokenAInput} /> */}
                <input type="number" placeholder="Benefits" style={inputStyle} className="px-2 py-1 cursor-pointer box-shadow input" onChange={onUsdcChange}></input>
              </TokenArea>

              <Divider />

              <TokenArea
                className="bond-footer"
              >
                <Button
                  className="w-full human-green m-15"
                  disabled={isUsdcDisableApp}
                  onClick={approveUsdc}
                  width="50vh"
                  height="6vh"
                >
                  Approve
          </Button>
                <Button
                  className="w-full human-green m-15"
                  disabled={isUsdcDisableBond}
                  onClick={buyUsdc}
                  width="50vh"
                  height="6vh"
                >
                  Bond
              </Button>
              </TokenArea>

            </SwapContainer>
          </div>
        </div>
      </div>
    </>
  )
}
