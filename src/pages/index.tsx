import React from "react";
import { Typography, Spin, Result } from "antd";
import { useRouter } from "next/router";
import useSwr from "swr";
import BodyWrapper from "../components/BodyWrapper";
import HeadingWrapper from "../components/HeadingWrapper";
import Page from "../components/Page";
import SearchSelector from "../components/SearchSelector";
import { routes } from "../utils/routes";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((response) => response.json());

const { Title } = Typography;

const Home = () => {
  const router = useRouter();
  const current = routes.find(({ path }) => path === router.pathname);
  const { data, error } = useSwr(
    `https://dog.ceo/api/breeds/list/all`,
    fetcher
  );

  const onSelect = (breed: string) => {
    router.push(`/breed/${breed}`);
  };

  return (
    <Page title={current?.heading ?? ""}>
      <HeadingWrapper>
        <Title level={1}>{current?.title}</Title>
      </HeadingWrapper>
      <BodyWrapper>
        {error ? (
          <Result
            status="error"
            title="Request failed"
            subTitle="Please check your network connection"
          />
        ) : !data ? (
          <Spin />
        ) : (
          <SearchSelector
            data={Object.keys(data.message)}
            onSelect={(breed) => onSelect(breed)}
            placeholder="Type a breed"
          />
        )}
      </BodyWrapper>
    </Page>
  );
};

export default Home;
