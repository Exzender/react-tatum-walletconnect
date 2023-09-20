# Sample react dApp (TatumSDK + WalletConnect v2)

This is just an example app that work with TatumSDK with integrated WalletConnect: [github](https://github.com/Exzender/tatum_v3_fork/tree/walletconnect) \
It has no any practical usage. And even has no any good interface.

## Base for the project

🔗 TatumSDK - https://github.com/tatumio/tatum-js <br />
🔗 WalletConnect - https://github.com/WalletConnect 

Usage of **WalletConnect** wallet provider inspired by [MetaMask provider](https://docs.tatum.io/docs/wallet-provider/metamask) and similar to it

## Running locally

Install the app's dependencies:

```bash
npm install
```

Get local copy of [TatumSDK fork](https://github.com/Exzender/tatum_v3_fork/tree/walletconnect) <br />
Link it as **npm package**

```bash
npm link 'path_to_tatum_v3_fork'
```
Set up your local environment variables by copying the example into your own `.env.local` file:

```bash
cp .env.local.example .env.local
```

Your `.env.local` now contains the following environment variables:

- `REACT_APP_WC_PROJECT_ID` (placeholder) - You can generate your own ProjectId at https://cloud.walletconnect.com
- `REACT_APP_TARGET_ADDRES` (placeholder) - Receiving address for test transactions
- `REACT_APP_TOKEN_ADDERSS` (placeholder) - Token (test token) address to use in test transactions
- `REACT_APP_TOKEN_AMOUNT` (already set) - Amount of tokens to use in transactions

## Working with WalletConnect provider

Only one additional step is required: provider initialization. \
Each add/dApp using WalletConnect should have PROJECT_ID, which can be obtained [here](https://cloud.walletconnect.com/)

Initialization object also could have metadata and other parameters.

```ts
const wcInitOpts = {
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
```
Initialization of WalletConnect:
```ts
const tatum = await TatumSDK.init<Ethereum>({network: Network.ETHEREUM})
await tatum.walletProvider.walletConnect.init(wcInitOpts)
```
Now provider can connect:
```ts
const wcAccount: string = await tatum.walletProvider.walletConnect.connect()
console.log(wcAccount)
```

## Available react Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Contacts

[LinkedIn](https://www.linkedin.com/in/aleksandr-s-terekhov/)