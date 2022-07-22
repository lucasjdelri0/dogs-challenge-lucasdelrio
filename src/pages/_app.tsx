import type { AppProps } from "next/app";
import Head from "next/head";
import "antd/dist/antd.css";
import { wrapper } from "../redux";
import Header from "../components/Header";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(MyApp);
