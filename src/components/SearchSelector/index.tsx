import React, { useState } from "react";
import { List, Avatar } from "antd";
import InputSearch from "../InputSearch";
import { capitalizeFirst } from "../../utils";
import styles from "./SearchSelector.module.css";

const SearchSelector = ({
  data,
  placeholder,
  onSelect,
}: {
  data: string[];
  placeholder: string;
  onSelect: (breed: string) => void;
}) => {
  const [searchResult, setSearchResult] = useState<string[] | undefined>(data);
  return (
    <>
      <InputSearch
        data={data}
        onSearch={(value) => setSearchResult(value)}
        placeholder={placeholder}
      />
      <div className={styles.searchSelectorListContainer}>
        <List
          itemLayout="horizontal"
          dataSource={searchResult}
          bordered
          renderItem={(breed, index) => (
            <List.Item
              key={index}
              onClick={() => onSelect(breed)}
              style={{ cursor: "pointer" }}
            >
              <List.Item.Meta
                avatar={<Avatar src="dogpaw.png" />}
                title={capitalizeFirst(breed)}
                description="Lorem ipsum dolor sit amet"
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default SearchSelector;
