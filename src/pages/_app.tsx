import "@/styles/globals.css";
import type { AppProps } from "next/app";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, foundry, bscTestnet, bsc } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [bscTestnet, bsc, mainnet, polygon, optimism, arbitrum, foundry],
  [
    alchemyProvider({ apiKey: "FIOu28Q3CCOEkqymVRAu6impiDJtclAW" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "DAOVATION",
  projectId: "123",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});




export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#89D472",
          accentColorForeground: "white",
          borderRadius: "medium",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
