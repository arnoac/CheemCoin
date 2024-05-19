// assets/js/wallet.js

let web3;
let provider;

async function connectWallet() {
  provider = new WalletConnectProvider.default({
    rpc: {
      56: "https://bsc-dataseed.binance.org/"
    },
    chainId: 56
  });

  await provider.enable();
  web3 = new Web3(provider);

  const accounts = await web3.eth.getAccounts();
  document.getElementById("wallet-address").innerText = accounts[0];
  const balance = await web3.eth.getBalance(accounts[0]);
  document.getElementById("wallet-balance").innerText =
    web3.utils.fromWei(balance, "ether") + " BNB";
}

function disconnectWallet() {
  if (provider) {
    provider.disconnect();
    document.getElementById("wallet-address").innerText = "";
    document.getElementById("wallet-balance").innerText = "";
  }
}
