import React, { ReactNode } from "react";
import { Layout } from "antd";
import Head from "next/head";
import styles from "./Page.module.css";

const { Content } = Layout;

const Page = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}): JSX.Element => (
  <div className={styles.pageContainer}>
    <Head>
      <title>{title}</title>
    </Head>
    {children}
  </div>
);

export default Page;
