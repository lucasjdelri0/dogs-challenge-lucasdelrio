import React from "react";
import { Typography, Image, Button, List } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { LikeOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import useSwr from "swr";
import styles from "./Breed.module.css";
import HeadingWrapper from "../../components/HeadingWrapper";
import Page from "../../components/Page";
import * as actionTypes from "../../redux/actionTypes";
import { capitalizeFirst } from "../../utils";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((response) => response.json());

const { Title } = Typography;

const Post = () => {
  const router = useRouter();
  const screens = useBreakpoint();
  const dispatch = useDispatch();

  const { name } = router.query;

  const { data, error } = useSwr(
    `https://dog.ceo/api/breed/${name}/images/random/100`,
    fetcher
  );

  if (error) return <div>Something went wrong ...</div>;

  const addToMyTeam = (img: string) => {
    const PAYLOAD: IDog = { breed: name as string, srcImage: img };
    dispatch({ type: actionTypes.ADD_DOG, payload: PAYLOAD });
  };

  return (
    <Page title={capitalizeFirst(name as string)}>
      <HeadingWrapper>
        <Title level={1}>{capitalizeFirst(name as string)}</Title>
      </HeadingWrapper>
      {data && (
        <List
          className={styles.breedList}
          grid={{ gutter: 16, column: 6 }}
          dataSource={data.message}
          renderItem={(img: string) => (
            <List.Item className={styles.breedListItem}>
              <Image alt={img} src={img} />
              <Button
                onClick={() => addToMyTeam(img)}
                className={styles.breedButton}
                type="primary"
                placeholder="Add to my team"
              >
                {screens.lg ? "Add to my team" : <LikeOutlined />}
              </Button>
            </List.Item>
          )}
          pagination={{
            pageSize: 18,
            position: "top",
            style: {
              marginBottom: 16,
            },
            total: data.message.length,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
            showSizeChanger: false,
          }}
          loading={!data}
        />
      )}
    </Page>
  );
};

export default Post;
