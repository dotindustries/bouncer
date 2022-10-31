import React from "react";
import { Text } from "ink";
import { TestSuiteContainer } from "./functions/test-suite.js";
import { FunctionComponentSharedProps } from "./functions/shared.js";

type FunctionType = `test`;

type AppProps = {
  func: FunctionType;
  host: string;
};

const getFunctionComponent = (
  func: FunctionType
): false | ((props: FunctionComponentSharedProps) => JSX.Element) => {
  switch (func) {
    case "test":
      return TestSuiteContainer;
    default:
      return false;
  }
};

const App = ({ func }: AppProps) => {
  const FunctionComponent = getFunctionComponent(func);
  if (FunctionComponent) {
    return <FunctionComponent />;
  } else {
    return <Text color={"red"}>Function '{func}' is not supported</Text>;
  }
};

export default App;
