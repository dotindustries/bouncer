#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import App from "./ui.js";
import { program, Option } from "commander";
import pkg from "../package.json";
import updateNotifier from "update-notifier";

let commandMatched = false;
// Checking for available updates
const notifier = updateNotifier({ pkg });
// Show update notification
notifier.notify();

program
  .name("bouncer")
  .description("CLI to bouncer SaaS seat management")
  .version(pkg.version, "-v, --version");
program
  .command("test")
  .addOption(
    new Option("-h, --host", "API base url").default(
      "http://localhost:3000/api/v1"
    )
  )
  .description("test API layer end-to-end")
  .action(async (_, args) => {
    commandMatched = true;

    const { waitUntilExit } = render(<App func={"test"} host={args.host} />);
    await waitUntilExit();
  });

program.parse(process.argv);

if (!commandMatched) {
  program.help();
}
