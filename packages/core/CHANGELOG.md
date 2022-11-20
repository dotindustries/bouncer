# v0.7.1 (Wed Nov 16 2022)

#### 🐛 Bug Fix

- chore: update zodios deps ([@nadilas](https://github.com/nadilas))

#### Authors: 1

- [@nadilas](https://github.com/nadilas)

---

# v0.7.0 (Wed Nov 02 2022)

#### 🚀 Enhancement

- feat: cli end-to-end test [#6](https://github.com/dotindustries/bouncer/pull/6) ([@nadilas](https://github.com/nadilas))

#### 🐛 Bug Fix

- fix: tenantId cannot be patched on subscription ([@nadilas](https://github.com/nadilas))
- fix: fall back to publisher default low seat warning percent ([@nadilas](https://github.com/nadilas))
- fix: clean up subscription patch types ([@nadilas](https://github.com/nadilas))
- fix: get userSeat tested ([@nadilas](https://github.com/nadilas))
- fix: myssql date regex was missing 20:mm:ss ([@nadilas](https://github.com/nadilas))
- fix: redeem seat tested ([@nadilas](https://github.com/nadilas))
- fix: reserve seat tested ([@nadilas](https://github.com/nadilas))
- fix: update subscription tested ([@nadilas](https://github.com/nadilas))
- fix: validate date string inputs ([@nadilas](https://github.com/nadilas))
- fix: make defaultLowSeatWarningLevelPercent default to 10% on server ([@nadilas](https://github.com/nadilas))
- fix: main of packages had wrong extensions ([@nadilas](https://github.com/nadilas))

#### Authors: 1

- [@nadilas](https://github.com/nadilas)

---

# v0.6.0 (Sun Oct 30 2022)

#### 🚀 Enhancement

- feat: API implementation [#2](https://github.com/dotindustries/bouncer/pull/2) ([@nadilas](https://github.com/nadilas))
- feat: release seat implemented ([@nadilas](https://github.com/nadilas))
- feat: reserve seat implemented ([@nadilas](https://github.com/nadilas))
- feat: request seat implemented ([@nadilas](https://github.com/nadilas))
- feat: add path parameters to schema ([@nadilas](https://github.com/nadilas))
- feat: redeemSeat implemented ([@nadilas](https://github.com/nadilas))
- feat: patch occupant implemented ([@nadilas](https://github.com/nadilas))
- feat: getUserSeat implemented ([@nadilas](https://github.com/nadilas))
- feat: update subscription implemented ([@nadilas](https://github.com/nadilas))
- feat: create subscription implemented ([@nadilas](https://github.com/nadilas))
- feat: get subscriptions implemented ([@nadilas](https://github.com/nadilas))
- feat: get subscription by id implemented ([@nadilas](https://github.com/nadilas))
- feat: create publisher config implemented ([@nadilas](https://github.com/nadilas))

#### 🐛 Bug Fix

- fix: overlapping api spec ([@nadilas](https://github.com/nadilas))
- refactor: move event collector to its own scope ([@nadilas](https://github.com/nadilas))
- refactor: remove zodios shorthand ([@nadilas](https://github.com/nadilas))
- fix: add error handlers to config endpoints ([@nadilas](https://github.com/nadilas))

#### ⚠️ Pushed to `main`

- Merge branch 'main' of github.com:dotindustries/bouncer ([@nadilas](https://github.com/nadilas))
- refactor: all publishers endpoint should be plural ([@nadilas](https://github.com/nadilas))

#### Authors: 1

- [@nadilas](https://github.com/nadilas)

---

# v0.5.0 (Fri Oct 28 2022)

#### 🚀 Enhancement

- feat: add update publisher config implementation ([@nadilas](https://github.com/nadilas))

#### 🐛 Bug Fix

- fix: publishers sql query ([@nadilas](https://github.com/nadilas))

#### ⚠️ Pushed to `main`

- Merge branch 'main' of github.com:dotindustries/bouncer ([@nadilas](https://github.com/nadilas))

#### Authors: 1

- [@nadilas](https://github.com/nadilas)

---

# v0.4.0 (Mon Oct 24 2022)

#### 🚀 Enhancement

- feat: publisherConfigurations route ([@nadilas](https://github.com/nadilas))
- feat: publisherConfigurationById route ([@nadilas](https://github.com/nadilas))

#### ⚠️ Pushed to `main`

- chore: upgrade deps and clean old deps ([@nadilas](https://github.com/nadilas))
- chore: merge changelog ([@nadilas](https://github.com/nadilas))

#### Authors: 1

- [@nadilas](https://github.com/nadilas)

---

# v0.3.0 (Sun Oct 23 2022)

#### 🚀 Enhancement

- feat: add sqlite migration provider to sql package ([@nadilas](https://github.com/nadilas))

#### Authors: 1

- [@nadilas](https://github.com/nadilas)

---

# v0.2.0 (Sun Oct 23 2022)

:tada: This release contains work from a new contributor! :tada:

Thank you, Eelco Wiersma ([@Pagebakers](https://github.com/Pagebakers)), for all your work!

#### 🚀 Enhancement

- feat: publish packages ([@nadilas](https://github.com/nadilas))
- feat: add sql package for shared tables ([@nadilas](https://github.com/nadilas))
- feat: add planetscale repository adapter ([@nadilas](https://github.com/nadilas))
- feat: expose api merged oas3 spec /api/spec ([@nadilas](https://github.com/nadilas))
- feat: add all api routes ([@nadilas](https://github.com/nadilas))
- feat: add base models ([@nadilas](https://github.com/nadilas))
- feat: simplify build ([@Pagebakers](https://github.com/Pagebakers))

#### 🐛 Bug Fix

- Bump independent versions \[skip ci\] ([@nadilas](https://github.com/nadilas))
- fix: revive lost patch method ([@nadilas](https://github.com/nadilas))

#### ⚠️ Pushed to `main`

- refactor: middleware hangs request, change to central repo ([@nadilas](https://github.com/nadilas))
- refactor: move to new hook ([@nadilas](https://github.com/nadilas))
- chore: force vscode intellisense to always show complete type definitions in hover ([@nadilas](https://github.com/nadilas))
- refactor: move away from shorthand ([@nadilas](https://github.com/nadilas))
- refactor: clean api base url ([@nadilas](https://github.com/nadilas))
- chore: add dev script to core package ([@nadilas](https://github.com/nadilas))
- refactor: move out reservation ([@nadilas](https://github.com/nadilas))
- chore: clean up app router ([@nadilas](https://github.com/nadilas))
- Merge branch 'main' of github.com:dotindustries/bouncer ([@Pagebakers](https://github.com/Pagebakers))
- chore: update deps ([@nadilas](https://github.com/nadilas))
- chore: remove auto-build of core on install ([@nadilas](https://github.com/nadilas))
- chore: pnpm stuff ([@nadilas](https://github.com/nadilas))
- chore: zodios baseline ([@nadilas](https://github.com/nadilas))

#### Authors: 2

- [@nadilas](https://github.com/nadilas)
- Eelco Wiersma ([@Pagebakers](https://github.com/Pagebakers))
