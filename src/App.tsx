import React from 'react';
import { useState } from 'react';
import { TatumSDK, Network, Polygon } from '@tatumio/tatum';
import logo from './logo.svg';
import toast, {Toaster} from 'react-hot-toast';
import './App.css';

if (!process.env.REACT_APP_WC_PROJECT_ID)
    throw new Error("`REACT_APP_WC_PROJECT_ID` env variable is missing.");

const PROJECT_ID = process.env.REACT_APP_WC_PROJECT_ID;
const TARGET_ADDRES = process.env.REACT_APP_TARGET_ADDRES;
const TOKEN_ADDERSS = process.env.REACT_APP_TOKEN_ADDERSS;
const TOKEN_AMOUNT = Number(process.env.REACT_APP_TOKEN_AMOUNT);

function SignButton({setAddress, tatum, setTatum}: {setAddress: any, tatum: any, setTatum: any}) {

    // walletConnect initialization options
    const wcInitOpts =
    {
        projectId: PROJECT_ID,
        // optional parameters
        // relayUrl: '<YOUR RELAY URL>',
        metadata: {
            name: 'Test Tatum Dapp',
            description: 'Test Tatum Dapp',
            url: '#',
            icons: ['https://walletconnect.com/walletconnect-logo.png']
        }
    }
    async function signIn() {
        try {
            let _tatum: any;

            if (!tatum) {
                // Init Tatum
                _tatum = await TatumSDK.init<Polygon>({network: Network.POLYGON_MUMBAI});
                setTatum(_tatum);
                // Init WalletConnect provider
                await _tatum.walletProvider.walletConnect.init(wcInitOpts);
            } else {
                _tatum = tatum;
            }

            // connect to WalletConnect
            const address = await _tatum.walletProvider.walletConnect.connect();
            // update address label
            setAddress(address)
        } catch (e) {
            toast.error((e as Error).message, {
                position: "bottom-left",
            });
        }
    }

  return (
      <button onClick={signIn} >
        WalletConnect
      </button>
  );
}

function DisconnectButton({setAddress, tatum}: {setAddress: any, tatum: any}) {

    async function disconnect() {
        try {
            if (tatum) {
                // disconnect from WalletConnect client
                await tatum.walletProvider.walletConnect.disconnect();
                // update address label
                setAddress('0')
                // show notification
                toast.success('Disconnected successfully', {
                    position: "bottom-left",
                });
            }
        } catch (e) {
            toast.error((e as Error).message, {
                position: "bottom-left",
            });
        }
    }

  return (
      <button onClick={disconnect} >
        DisConnect WC
      </button>
  );
}

function SignMessageButton({setResult, tatum}: {setResult: any, tatum: any}) {

    async function signMessage() {
        let handler: string = '';
        try {
            if (tatum) {
                const msg = 'This is a test message';
                // clear result label
                setResult('')
                // display waiting popup
                handler = toast.loading('Waiting for the User to sign Message in his Wallet....', {
                    position: "bottom-left",
                });
                // signing text message via WalletConnect
                const result = await tatum.walletProvider.walletConnect.signPersonal(msg);
                // display success popup
                toast.success('Signed Message', {position: "bottom-left"})
                // update result label
                setResult(result)
            }
        } catch (e) {
            // update result label
            setResult('Error occurred')
            // display error popup
            toast.error((e as Error).message, {
                position: "bottom-left",
            });
        }  finally {
            if (handler) toast.dismiss(handler);
        }
    }

  return (
      <button onClick={signMessage} >
        Sign Message
      </button>
  );
}


function TransferButton({setResult, tatum}: {setResult: any, tatum: any}) {

    async function transferNative() {
        let handler: string = '';
        try {
            if (tatum) {
                // destination address
                const receiverAddress = TARGET_ADDRES;
                // sending amount
                const amount = String(0.01);
                // display waiting popup
                handler = toast.loading('Waiting for the User to sign the transaction in his Wallet...', {
                    position: "bottom-left",
                });
                // clear result label
                setResult('')
                // signing Tx & sending native tokens via WalletConnect
                const result = await tatum.walletProvider.walletConnect.transferNative(receiverAddress, amount);
                // update result label
                setResult(result)
                toast.success('Transactions successfully sent', {position: "bottom-left"})
            }
        } catch (e) {
            // update result label
            setResult('Error occurred')
            toast.error((e as Error).message, {
                position: "bottom-left",
            });
        } finally {
            if (handler) toast.dismiss(handler);
        }
    }

  return (
      <button onClick={transferNative} >
        Transfer Native
      </button>
  );
}


function TransferErc20Button({setResult, tatum}: {setResult: any, tatum: any}) {

    async function transferErc20() {
        let handler: string = '';
        try {
            if (tatum) {
                const receiverAddress = TARGET_ADDRES;
                const amount = String(TOKEN_AMOUNT);
                const tokenAddress = TOKEN_ADDERSS; // test token on Mumbai
                // display waiting popup
                handler = toast.loading('Waiting for the User to sign the transaction in his Wallet....',
                    { position: "bottom-left" });
                // clear result label
                setResult('')
                // signing Tx & sending ERC20 tokens via WalletConnect
                const result = await tatum.walletProvider.walletConnect.transferErc20(receiverAddress, amount, tokenAddress);
                toast.success('Transactions successfully sent', {position: "bottom-left"})
                // update result label
                setResult(result)
            }
        } catch (e) {
            // update result label
            setResult('Error occurred')
            toast.error((e as Error).message, {
                position: "bottom-left",
            });
        } finally {
            if (handler) toast.dismiss(handler);
        }
    }

  return (
      <button onClick={transferErc20} >
        Transfer ERC20
      </button>
  );
}



function ApproveErc20Button({setResult, tatum}: {setResult: any, tatum: any}) {

    async function approveErc20() {
        let handler: string = '';
        try {
            if (tatum) {
                const targetContractAddress = TARGET_ADDRES;
                const amount = String(TOKEN_AMOUNT);
                const tokenAddress = TOKEN_ADDERSS;
                // display waiting popup
                handler = toast.loading('Waiting for the User to sign the transaction in his Wallet....',
                    { position: "bottom-left" });
                setResult('')
                // NOTE: approval not possible on POLYGON_MUMBAI network
                // signing & sending Approval transaction for ERC20 tokens via WalletConnect
                const result = await tatum.walletProvider.walletConnect.approveErc20(targetContractAddress, amount, tokenAddress);
                toast.success('Transactions successfully sent', {position: "bottom-left"})
                setResult(result)
            }
        } catch (e) {
            setResult('Error occurred')
            toast.error((e as Error).message, {
                position: "bottom-left",
            });
        } finally {
            if (handler) toast.dismiss(handler);
        }
    }

  return (
      <button onClick={approveErc20} >
        Approve ERC20
      </button>
  );
}


function App() {
  const [address, setAddress] = useState('0');
  const [strresult, setResult] = useState('0');
  const [tatum, setTatum] = useState(null);
  return (
    <div className="App">
      <Toaster />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <p>
              {/*Edit <code>src/App.tsx</code> and save to reload.*/}
              <SignButton setAddress={setAddress} tatum={tatum} setTatum={setTatum}/>
              <DisconnectButton setAddress={setAddress} tatum={tatum}/>
          </p>
          <p>
              <SignMessageButton setResult={setResult} tatum={tatum}/>
              <TransferButton setResult={setResult} tatum={tatum}/>
          </p>
          <p>
              <TransferErc20Button setResult={setResult} tatum={tatum}/>
              <ApproveErc20Button setResult={setResult} tatum={tatum}/>
          </p>
          <p>
              Connected Address: {address}
          </p>
          Result: {strresult}
      </header>
    </div>
  );
}

export default App;
