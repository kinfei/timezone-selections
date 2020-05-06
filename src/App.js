import React from "react";
import { Select } from "antd";
import { map } from "lodash";

import { getTimezonesNames } from "./utils";

import "./App.css";

function renderOptions(Option, timezones) {
  return map(timezones, (x, i) => {
    return (
      <Option key={x.value} value={x.value}>
        {x.displayName}
      </Option>
    );
  });
}

function App() {
  //  console.log({ getTimezonesNames: getTimezonesNames("en-gb") });

  const { Option } = Select;

  const timezones = getTimezonesNames();

  if (!timezones) return <div />;

  return (
    <div className="App">
      <header className="App-header">
        <Select
          showSearch
          style={{ width: 400 }}
          placeholder="Select your timezone"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {renderOptions(Option, timezones)}
        </Select>
      </header>
    </div>
  );
}

export default App;
