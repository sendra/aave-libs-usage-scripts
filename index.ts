import { providers } from 'ethers';
import {
  ReservesData,
  UiIncentiveDataProvider,
  UiPoolDataProvider,
  WalletBalanceProvider,
} from '@aave/contract-helpers';

const config = {
  mainnet: {
    providerUrl: 'https://eth-mainnet.alchemyapi.io/v2/demo',
    walletBalanceProviderAddress: '0x8e8dad5409e0263a51c0ab5055da66be28cff922',
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
    uiPoolDataProvider: '0x5343b5bA672Ae99d627A1C87866b8E53F47Db2E6',
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
  reservesRaw.forEach((reserve) => {
    // const object = {
    //   id: `${chainId}-${reserve.underlyingAsset}-${lendingPoolAddressProvider}`.toLowerCase(),
    //   underlyingAsset: reserve.underlyingAsset.toLowerCase(),
    //   name: reserve.name,
    //   symbol: reserve.symbol,
    //   decimals: reserve.decimals.toNumber(),
    //   baseLTVasCollateral: reserve.baseLTVasCollateral.toString(),
    //   reserveLiquidationThreshold:
    //     reserve.reserveLiquidationThreshold.toString(),
    //   reserveLiquidationBonus: reserve.reserveLiquidationBonus.toString(),
    //   reserveFactor: reserve.reserveFactor.toString(),
    //   usageAsCollateralEnabled: reserve.usageAsCollateralEnabled,
    //   borrowingEnabled: reserve.borrowingEnabled,
    //   stableBorrowRateEnabled: reserve.stableBorrowRateEnabled,
    //   isActive: reserve.isActive,
    //   isFrozen: reserve.isFrozen,
    //   liquidityIndex: reserve.liquidityIndex.toString(),
    //   variableBorrowIndex: reserve.variableBorrowIndex.toString(),
    //   liquidityRate: reserve.liquidityRate.toString(),
    //   variableBorrowRate: reserve.variableBorrowRate.toString(),
    //   stableBorrowRate: reserve.stableBorrowRate.toString(),
    //   lastUpdateTimestamp: reserve.lastUpdateTimestamp,
    //   aTokenAddress: reserve.aTokenAddress.toString(),
    //   stableDebtTokenAddress: reserve.stableDebtTokenAddress.toString(),
    //   variableDebtTokenAddress: reserve.variableDebtTokenAddress.toString(),
    //   interestRateStrategyAddress:
    //     reserve.interestRateStrategyAddress.toString(),
    //   availableLiquidity: reserve.availableLiquidity.toString(),
    //   totalPrincipalStableDebt: reserve.totalPrincipalStableDebt.toString(),
    //   averageStableRate: reserve.averageStableRate.toString(),
    //   stableDebtLastUpdateTimestamp:
    //     reserve.stableDebtLastUpdateTimestamp.toNumber(),
    //   totalScaledVariableDebt: reserve.totalScaledVariableDebt.toString(),
    //   priceInMarketReferenceCurrency:
    //     reserve.priceInMarketReferenceCurrency.toString(),
    //   priceOracle: reserve.priceOracle,
    //   variableRateSlope1: reserve.variableRateSlope1.toString(),
    //   variableRateSlope2: reserve.variableRateSlope2.toString(),
    //   stableRateSlope1: reserve.stableRateSlope1.toString(),
    //   stableRateSlope2: reserve.stableRateSlope2.toString(),
    //   baseStableBorrowRate: reserve.baseStableBorrowRate.toString(),
    //   baseVariableBorrowRate: reserve.baseVariableBorrowRate.toString(),
    //   optimalUsageRatio: reserve.optimalUsageRatio.toString(),

    //   isPaused: reserve.isPaused,
    //   debtCeiling: reserve.debtCeiling.toString(),
    //   eModeCategoryId: reserve.eModeCategoryId,
    //   borrowCap: reserve.borrowCap.toString(),
    //   supplyCap: reserve.supplyCap.toString(),
    //   eModeLtv: reserve.eModeLtv,
    //   eModeLiquidationThreshold: reserve.eModeLiquidationThreshold,
    //   eModeLiquidationBonus: reserve.eModeLiquidationBonus,
    //   eModePriceSource: reserve.eModePriceSource.toString(),
    //   eModeLabel: reserve.eModeLabel.toString(),
    //   borrowableInIsolation: reserve.borrowableInIsolation,
    //   accruedToTreasury: reserve.accruedToTreasury.toString(),
    //   unbacked: reserve.unbacked.toString(),
    //   isolationModeTotalDebt: reserve.isolationModeTotalDebt.toString(),
    //   debtCeilingDecimals: reserve.debtCeilingDecimals.toNumber(),
    // };
    console.log(reserve.symbol);
    if (reserve.symbol !== 'AAVE') {
      console.log(reserve.eModeLabel);
    }
  });

  // console.log(data);
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

// callIncentives()
//   .then()
//   .catch((error) => console.log(error));

callDataProvider()
  .then()
  .catch((error) => console.log(error));
