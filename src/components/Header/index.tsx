import React from "react";
import {
  Layout,
  Row,
  Col,
  Space,
  Menu,
  Badge,
  Dropdown,
  Button,
  Avatar,
} from "antd";
import { BellOutlined, GitlabOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { routes } from "../../utils/routes";
import styles from "./Header.module.css";

const { Header: AntHeader } = Layout;

const Header = (): JSX.Element => {
  const router = useRouter();
  return (
    <AntHeader className={styles.headerContainer}>
      <Row justify="space-between" wrap={false}>
        <Col>
          <a href="https://gitlab.com/greencodesoftware/interview-challenges/dogs-challenge-lucasdelrio">
            <GitlabOutlined className={styles.headerLogo} />
          </a>
        </Col>

        <Col>
          <Menu mode="horizontal" selectedKeys={[router.pathname]}>
            {routes.map(({ path, heading }) => (
              <Menu.Item key={path}>
                <Link href={path} passHref>
                  <a>{heading}</a>
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Col>

        <Col>
          <Space align="center">
            <Badge count={8}>
              <Button
                icon={<BellOutlined />}
                shape="circle"
                size="small"
                type="link"
              />
            </Badge>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item className={styles.headerMenuItem} key={0}>
                    <Link href="/profile/dog-team" passHref>
                      <a>My dog team</a>
                    </Link>
                  </Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <Button
                icon={
                  <Avatar
                    alt="User avatar"
                    src="https://randomuser.me/api/portraits/women/72.jpg"
                  />
                }
                type="link"
              />
            </Dropdown>
          </Space>
        </Col>
      </Row>
    </AntHeader>
  );
};

export default Header;
