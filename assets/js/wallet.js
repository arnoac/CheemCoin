// assets/js/wallet.js

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      document.getElementById("wallet-address").innerText = accounts[0];
      const balance = await web3.eth.getBalance(accounts[0]);
      document.getElementById("wallet-balance").innerText =
        web3.utils.fromWei(balance, "ether") + " BNB";
    } catch (error) {
      console.error(error);
      alert("Failed to connect wallet. Please try again.");
    }
  } else {
    alert("MetaMask is not installed. Please install MetaMask and try again.");
  }
}

function disconnectWallet() {
  document.getElementById("wallet-address").innerText = "";
  document.getElementById("wallet-balance").innerText = "";
}
