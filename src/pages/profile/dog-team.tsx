import React from "react";
import { Typography, Button, List, Row, Image } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { DislikeOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import HeadingWrapper from "../../components/HeadingWrapper";
import Page from "../../components/Page";
import * as actionTypes from "../../redux/actionTypes";
import { routes } from "../../utils/routes";
import { capitalizeFirst } from "../../utils";
import styles from "./DogTeam.module.css";

const { Title } = Typography;

const MyTeam = () => {
  const screens = useBreakpoint();
  const router = useRouter();
  const current = routes.find(({ path }) => path === router.pathname);
  const dogs = useSelector((state: MyTeamState) => state.dogs);
  const dispatch = useDispatch();

  const myBreeds: string[] = [];

  dogs.forEach(({ breed }) => {
    if (!myBreeds.includes(breed)) myBreeds.push(breed);
  });

  const removeFromMyTeam = (dog: IDog) => {
    const PAYLOAD: IDog = { breed: dog.breed, srcImage: dog.srcImage };
    dispatch({ type: actionTypes.DELETE_DOG, payload: PAYLOAD });
  };

  return (
    <Page title={current?.heading ?? ""}>
      <HeadingWrapper>
        <Title level={1}>{current?.title}</Title>
      </HeadingWrapper>
      {myBreeds.map((current, index) => {
        const dogsInBreed: IDog[] = dogs.filter(
          ({ breed }) => current === breed
        );
        const dogsArray: string[] = [];
        dogsInBreed.forEach(({ srcImage }) => dogsArray.push(srcImage));
        return (
          <Row className={styles.dogTeamRow} key={index}>
            <List
              className={styles.dogTeamList}
              grid={{ gutter: 16, column: 6 }}
              dataSource={dogsArray}
              header={<Title level={3}>{capitalizeFirst(current)}</Title>}
              split={false}
              renderItem={(img: string, i: number) => (
                <List.Item
                  key={`${current}-${i}`}
                  className={styles.dogTeamListItem}
                >
                  <Image alt={img} src={img} />
                  <Button
                    onClick={() =>
                      removeFromMyTeam({ breed: current, srcImage: img })
                    }
                    className={styles.dogTeamButton}
                    type="primary"
                  >
                    {screens.lg ? "Remove from team" : <DislikeOutlined />}
                  </Button>
                </List.Item>
              )}
            />
          </Row>
        );
      })}
    </Page>
  );
};

export default MyTeam;
