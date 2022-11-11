# v0.7.0 (Wed Nov 02 2022)

#### 🚀 Enhancement

- feat: cli end-to-end test [#6](https://github.com/dotindustries/bouncer/pull/6) ([@nadilas](https://github.com/nadilas))

#### 🐛 Bug Fix

- fix: fall back to publisher default low seat warning percent ([@nadilas](https://github.com/nadilas))
- fix: clean up subscription patch types ([@nadilas](https://github.com/nadilas))
- fix: release seat tested ([@nadilas](https://github.com/nadilas))
- fix: get userSeat tested ([@nadilas](https://github.com/nadilas))
- fix: seat summary counter ([@nadilas](https://github.com/nadilas))
- fix: forgot to add limitSeatCount increase ([@nadilas](https://github.com/nadilas))
- fix: limit seat summary to current subscription ([@nadilas](https://github.com/nadilas))
- fix: reserve seat tested ([@nadilas](https://github.com/nadilas))
- fix: update subscription tested ([@nadilas](https://github.com/nadilas))
- fix: validate date string inputs ([@nadilas](https://github.com/nadilas))
- chore: mark sqlite number-to-boolean conversion error on query output ([@nadilas](https://github.com/nadilas))
- fix: create publisher sql insert ([@nadilas](https://github.com/nadilas))
- fix: main of packages had wrong extensions ([@nadilas](https://github.com/nadilas))

#### Authors: 1

- [@nadilas](https://github.com/nadilas)

---

# v0.6.0 (Sun Oct 30 2022)

#### 🚀 Enhancement

- feat: API implementation [#2](https://github.com/dotindustries/bouncer/pull/2) ([@nadilas](https://github.com/nadilas))
- feat: release seat implemented ([@nadilas](https://github.com/nadilas))
- feat: request seat implemented ([@nadilas](https://github.com/nadilas))
- feat: redeemSeat implemented ([@nadilas](https://github.com/nadilas))
- feat: patch occupant implemented ([@nadilas](https://github.com/nadilas))
- feat: update subscription implemented ([@nadilas](https://github.com/nadilas))
- feat: create subscription implemented ([@nadilas](https://github.com/nadilas))
- feat: get subscriptions implemented ([@nadilas](https://github.com/nadilas))
- feat: get subscription by id implemented ([@nadilas](https://github.com/nadilas))
- feat: create publisher config implemented ([@nadilas](https://github.com/nadilas))

#### 🐛 Bug Fix

- fix: subscription table schema missing publisher_id field ([@nadilas](https://github.com/nadilas))
- fix: patch seat was not running reservation update ([@nadilas](https://github.com/nadilas))
- refactor: remove zodios shorthand ([@nadilas](https://github.com/nadilas))
- fix: create and update subscription logic by adding default seating config ([@nadilas](https://github.com/nadilas))
- refactor: remove unused imports ([@nadilas](https://github.com/nadilas))

#### ⚠️ Pushed to `main`

- Merge branch 'main' of github.com:dotindustries/bouncer ([@nadilas](https://github.com/nadilas))

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
- feat: add planetscale migration ([@nadilas](https://github.com/nadilas))

#### ⚠️ Pushed to `main`

- chore: upgrade deps and clean old deps ([@nadilas](https://github.com/nadilas))
- chore: merge changelog ([@nadilas](https://github.com/nadilas))

#### Authors: 1

- [@nadilas](https://github.com/nadilas)

---

# v0.3.0 (Sun Oct 23 2022)

#### 🚀 Enhancement

- feat: add sqlite migration provider to sql package ([@nadilas](https://github.com/nadilas))
- feat: add sqlite migrations to db instance ([@nadilas](https://github.com/nadilas))

#### 🐛 Bug Fix

- fix: filter seats to subscription id as well ([@nadilas](https://github.com/nadilas))

#### Authors: 1

- [@nadilas](https://github.com/nadilas)

---

# v0.2.0 (Sun Oct 23 2022)

#### 🚀 Enhancement

- feat: publish packages ([@nadilas](https://github.com/nadilas))
- feat: add logging to sql layer ([@nadilas](https://github.com/nadilas))
- feat: add sql package for shared tables ([@nadilas](https://github.com/nadilas))

#### 🐛 Bug Fix

- Bump independent versions \[skip ci\] ([@nadilas](https://github.com/nadilas))

#### ⚠️ Pushed to `main`

- ci: release packages ([@nadilas](https://github.com/nadilas))

#### Authors: 1

- [@nadilas](https://github.com/nadilas)
