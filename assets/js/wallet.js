// assets/js/wallet.js

const mefiTokenAddress = "0xf6C3c21b36d90a659b1BF07083Ae5E26b92Ef044"; // Replace with your MEFI token contract address
const mefiTokenABI = [
  // Minimal ERC-20 ABI to get balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function"
  }
];

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      document.getElementById("wallet-address").innerText = accounts[0];

      // Fetch MEFI balance
      const mefiToken = new web3.eth.Contract(mefiTokenABI, mefiTokenAddress);
      const balance = await mefiToken.methods.balanceOf(accounts[0]).call();
      const decimals = await mefiToken.methods.decimals().call();
      const adjustedBalance = balance / 10 ** decimals;
      document.getElementById("wallet-balance").innerText =
        adjustedBalance + " MEFI";
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
