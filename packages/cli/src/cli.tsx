#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import App from "./ui.js";
import { program, Option } from "commander";
const pkg = require("../package.json");
import updateNotifier from "update-notifier";

let commandMatched = false;
// Checking for available updates
const notifier = updateNotifier({ pkg, isGlobal: true });
// Show update notification
notifier.notify();

program
  .name("bouncer")
  .description("CLI to bouncer SaaS seat management")
  .version(pkg.version, "-v, --version");
program
  .command("test")
  .option(
    new Option("-h, --host", "API base url").defaultValue(
      '"http://localhost:3000/api/v1"'
    )
  )
  .description("test API layer end-to-end")
  .action((_, args) => {
    commandMatched = true;

    render(<App func={"test"} host={args.host} />);
  });

program.parse(process.argv);

if (!commandMatched) {
  program.help();
}
