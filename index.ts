import { providers } from 'ethers';
import {
  ReservesData,
  UiIncentiveDataProvider,
  UiPoolDataProvider,
  UserReserveData,
  WalletBalanceProvider,
  ERC20Service,
} from '@aave/contract-helpers';

const config = {
  mainnet: {
    providerUrl: 'https://rpc.flashbots.net',
    walletBalanceProviderAddress: '0x8e8dad5409e0263a51c0ab5055da66be28cff922',
    lendingPoolAddressProvider: '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5',
    uiPoolDataProvider: '0xff115c660f57dcc19a933dbf5ba3677979adcaec',
    chainId: 1,
  },
  polygon: {
    uiIncentiveDataProviderAddress:
      '0x25F1044684bF7f63b149191Ba6A685c612d5a225',
    lendingPoolAddressProvider: '0xd05e3E715d945B59290df0ae8eF85c1BdB684744',
    providerUrl: 'https://polygon-rpc.com',
  },
  mumbai: {
    uiIncentiveDataProviderAddress:
      '0x070a7D8F4d7A7A87452C5BaBaB3158e08411907E',
    lendingPoolAddressProvider: '0x178113104fEcbcD7fF8669a0150721e231F0FD4B',
    providerUrl: 'https://rpc-mumbai.maticvigil.com',
    uiPoolDataProvider: '0x1931722c81F8A6b27d21a8Abfc167134D2F1a790',
    chainId: 80001,
  },
  rinkeby: {
    uiIncentiveDataProviderAddress:
      '0x0240dEBeEe7F019bfe89f752f6aeffF95a11352f',
    lendingPoolAddressProvider: '0xA55125A90d75a95EC00130E8E8C197dB5641Eb19',
    providerUrl: 'https://eth-rinkeby.alchemyapi.io/v2/demo',
    uiPoolDataProvider: '0x407287b03D1167593AF113d32093942be13A535f',
    chainId: 4,
  },
  arb: {
    uiIncentiveDataProviderAddress:
      '0x2fe91f5ab0bc5Aad0995Ea78d314B033988003De',
    lendingPoolAddressProvider: '0x9AB5EC42fC6A12b1A8D902Fd2f4Efae59982bfdb',
    providerUrl: 'https://rinkeby.arbitrum.io/rpc',
  },
  fuji: {
    uiIncentiveDataProviderAddress:
      '0x9842E5B7b7C6cEDfB1952a388e050582Ff95645b',
    lendingPoolAddressProvider: '0x7fdC1FdF79BE3309bf82f4abdAD9f111A6590C0f',
    providerUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
  },
};

const callIncentives = async () => {
  const {
    providerUrl,
    uiIncentiveDataProviderAddress,
    lendingPoolAddressProvider,
  } = config.fuji;

  const provider = new providers.StaticJsonRpcProvider(providerUrl);

  const instance = new UiIncentiveDataProvider({
    provider,
    uiIncentiveDataProviderAddress,
    chainId: 1,
  });

  const incentives = await instance.getUserReservesIncentivesDataHumanized({
    lendingPoolAddressProvider,
    user: '0x4f86A75764710683DAC3833dF49c72de3ec65465',
  });

  console.log('incentives: ', JSON.stringify(incentives));
};

const callDataProvider = async () => {
  const {
    providerUrl,
    uiPoolDataProvider,
    chainId,
    lendingPoolAddressProvider,
  } = config.rinkeby;
  const provider = new providers.StaticJsonRpcProvider(providerUrl);

  const instance = new UiPoolDataProvider({
    provider,
    uiPoolDataProviderAddress: uiPoolDataProvider,
    chainId,
  });

  const { 0: reservesRaw, 1: poolBaseCurrencyRaw }: ReservesData =
    await instance.getReservesData({
      lendingPoolAddressProvider,
    });
};

const callUserDataProvider = async () => {
  const {
    providerUrl,
    uiPoolDataProvider,
    chainId,
    lendingPoolAddressProvider,
  } = config.mainnet;
  const provider = new providers.StaticJsonRpcProvider(providerUrl);
  const user = '0x4f86A75764710683DAC3833dF49c72de3ec65465';
  const instance = new UiPoolDataProvider({
    provider,
    uiPoolDataProviderAddress: uiPoolDataProvider,
    chainId,
  });

  const { 0: userReservesRaw, 1: userEmodeCategoryId }: UserReserveData =
    await instance.getUserReservesData({ lendingPoolAddressProvider, user });

  console.log('emode: ', userEmodeCategoryId);
  console.log('userReservesRaw:: ', userReservesRaw);
};

const callWalletBalanceProvider = async () => {
  const { providerUrl, walletBalanceProviderAddress } = config.mainnet;

  const provider = new providers.StaticJsonRpcProvider(providerUrl);

  const instance = new WalletBalanceProvider({
    provider,
    walletBalanceProviderAddress,
  });

  const data = await instance.getUserWalletBalancesForLendingPoolProvider(
    '0x9edec77dd2651ce062ab17e941347018ad4eaea9',
    '0xB953a066377176092879a151C07798B3946EEa4b',
  );
  console.log('data', data);
};

const validateApproval = async () => {
  const { providerUrl } = config.polygon;
  const provider = new providers.StaticJsonRpcProvider(providerUrl);

  const erc20Service = new ERC20Service(provider);
  const erc20Contract = await erc20Service.getContractInstance(
    '0x6d80113e533a2c0fe82eabd35f1875dcea89ea97',
  );

  // const allowance = await erc20Contract.allowance(
  //   '0x4f86A75764710683DAC3833dF49c72de3ec65465',
  //   '0xd0e8f168d297dfa0f3ee1711c538bcc0663320af',
  // );

  const tokenData = await erc20Service.getTokenData(
    '0x625e7708f30ca75bfd92586e17077590c60eb4cd',
  );
  // isApproved({
  //   token: '0x82e64f49ed5ec1bc6e43dad4fc8af9bb3a2312ee',
  //   user: '0x4f86A75764710683DAC3833dF49c72de3ec65465',
  //   spender: '0xd0e8f168d297dfa0f3ee1711c538bcc0663320af',
  //   amount: '0.000008920376157489',
  // });

  console.log('allowance: ', tokenData);
};

// callIncentives()
//   .then()
//   .catch((error) => console.log(error));

const getStorageSlot = async (address: string, slot: string) => {
  const { providerUrl } = config.mainnet;
  const provider = new providers.StaticJsonRpcProvider(providerUrl);

  const res = await provider.getStorageAt(address, slot);

  console.log('res ===> ', res);
};

getStorageSlot(
  '0x25F2226B597E8F9514B3F68F00f494cF4f286491',
  '0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103',
)
  .then()
  .catch(console.log);

// validateApproval()
//   .then()
//   .catch((error) => console.log(error));
