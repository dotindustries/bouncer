import React from "react";
import chalk from "chalk";
import test from "ava";
import { render } from "ink-testing-library";
import App from "./ui.js";

test("greet user with a name", (t) => {
  const { lastFrame } = render(
    <App func="test" host="http://localhost:3000/api/v1" />
  );

  t.is(lastFrame(), chalk`Running: {green test}`);
});
