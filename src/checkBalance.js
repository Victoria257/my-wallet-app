import Web3 from "web3";

export const checkBalance = async ({ setBalance, selectedAddress }) => {
  // Infura
  const infuraWeb = new Web3(
    new Web3.providers.HttpProvider(
      `https://goerli.infura.io/v3/eabcc631d2d1489b8f793ab2c0ea0353` // треба перенести в env для продакшена і змінити на mainnet
    )
  );

  try {
    const infuraBalance = await infuraWeb.eth.getBalance(selectedAddress);
    const stringInfuraBalance = infuraWeb.utils.fromWei(infuraBalance, "ether");
    setBalance(stringInfuraBalance);
  } catch (error) {
    toast.error("error");
    console.error(error);
  }
};
