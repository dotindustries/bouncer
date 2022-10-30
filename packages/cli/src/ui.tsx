import React from "react";
import { Text } from "ink";

type AppProps = {
  func: `test`;
  host: string;
};

const App = ({ func }: AppProps) => (
  <Text>
    Running: <Text color="green">{func}</Text>
  </Text>
);

export default App;
