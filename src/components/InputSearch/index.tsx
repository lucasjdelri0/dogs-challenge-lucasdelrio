import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchInput = ({
  placeholder,
  data,
  onSearch,
}: {
  placeholder?: string;
  data: string[];
  onSearch: (value?: string[]) => void;
}): JSX.Element => {
  const onChange = (search: string) => {
    onSearch(
      data.filter((item: string) =>
        item.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <Input
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      prefix={<SearchOutlined />}
      allowClear
    />
  );
};

export default SearchInput;
