import React, { ReactNode } from "react";
import styles from "./HeadingWrapper.module.css";

const HeadingWrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <div className={styles.headingWrapperContainer}>{children}</div>
);

export default HeadingWrapper;
