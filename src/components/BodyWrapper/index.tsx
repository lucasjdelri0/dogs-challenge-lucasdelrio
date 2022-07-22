import React, { ReactNode } from "react";
import { Row, Col } from "antd";

const BodyWrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <Row>
    <Col
      lg={{ span: 12, offset: 6 }}
      md={{ span: 16, offset: 4 }}
      sm={{ span: 18, offset: 3 }}
      xl={{ span: 8, offset: 8 }}
      xs={{ span: 20, offset: 2 }}
    >
      {children}
    </Col>
  </Row>
);

export default BodyWrapper;
