
interface WalletState {
    walletType: 'METAMASK' | 'WALLETCONNECT' | 'MY_ALGO_WALLET' | 'NONE';
    connector: any;
    accounts: AccountState[]
  }

interface AccountState {
    address: string;
    name: string;
}

interface TxnState {
    connector: any,
    address: string
}

interface MessageProps {
  auth_message: string
}

interface SignWCTxnProps {
  message: string;
  address: string;
  walletType: string;
}

export type {
    WalletState,
    TxnState,
    MessageProps,
    SignWCTxnProps
}