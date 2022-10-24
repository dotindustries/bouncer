import {
  Kysely,
  Migrator,
  MigrationProvider as IMigrationProvider,
  Migration,
  Dialect,
} from "kysely";
import type { Database } from "@dotinc/bouncer-sql";
import {
  PlanetScaleDialect,
  PlanetScaleDialectConfig,
} from "kysely-planetscale";

export class MigrationProvider implements IMigrationProvider {
  getMigrations(): Promise<Record<string, Migration>> {
    return Promise.resolve({
      "2022-10-23_base": {
        up: async (db) => {
          await db.schema
            .createTable("publishers")
            .addColumn("id", "varchar(30)", (col) => col.primaryKey())
            .addColumn("product_name", "varchar(255)", (col) => col.notNull())
            .addColumn("publisher_name", "varchar(255)", (col) => col.notNull())
            .addColumn("home_page_url", "varchar(500)")
            .addColumn("contact_page_url", "varchar(500)")
            .addColumn("privacy_notice_page_url", "varchar(500)")
            .addColumn("contact_sales_email", "varchar(255)")
            .addColumn("contact_sales_url", "varchar(500)")
            .addColumn("contact_support_email", "varchar(255)")
            .addColumn("contact_support_url", "varchar(500)")
            .addColumn("mona_base_storage_url", "varchar(500)")
            .addColumn("mona_subscription_state", "varchar(50)")
            .addColumn("mona_subscription_is_being_configured", "boolean")
            .addColumn("is_setup_complete", "boolean")
            .execute();

          await db.schema
            .createTable("seating_config")
            .addColumn("publisher_id", "varchar(30)", (col) =>
              col.unique().notNull().primaryKey()
            )
            .addColumn("defaultLowSeatWarningLevelPercent", "real", (col) =>
              col.notNull()
            )
            .addColumn("seating_strategy_name", "varchar(50)")
            .addColumn("low_seat_warning_level_pct", "real")
            .addColumn("limited_overflow_seating_enabled", "boolean")
            .addColumn("seat_reservation_expiry_in_days", "integer")
            .addColumn("default_seat_expiry_in_days", "integer")
            .execute();
          // await db.schema
          //   .createIndex("fk_idx_seating_config_publisher")
          //   .on("seating_config")
          //   .columns(["publisher_id"])
          //   .execute();

          await db.schema
            .createTable("product_config")
            .addColumn("publisher_id", "varchar(30)", (col) =>
              col.unique().notNull().primaryKey()
            )
            .addColumn("on_access_denied_url", "varchar(500)")
            .addColumn("on_access_granted_url", "varchar(500)")
            .addColumn("on_no_seat_available_url", "varchar(500)")
            .addColumn("on_subscription_not_ready_url", "varchar(500)")
            .addColumn("on_subscription_canceled_url", "varchar(500)")
            .addColumn("on_subscription_suspended_url", "varchar(500)")
            .addColumn("on_subscription_not_found_url", "varchar(500)")
            .addColumn("on_no_subscriptions_found_url", "varchar(500)")
            .execute();
          // await db.schema
          //   .createIndex("fk_idx_product_config_publisher")
          //   .on("product_config")
          //   .columns(["publisher_id"])
          //   .execute();

          await db.schema
            .createTable("seats")
            .addColumn("seat_id", "varchar(30)", (col) =>
              col.notNull().primaryKey()
            )
            .addColumn("seating_strategy_name", "varchar(50)")
            .addColumn("subscription_id", "varchar(30)")
            .addColumn("created_utc", "datetime")
            .addColumn("seat_type", "varchar(50)")
            .addColumn("expires_utc", "datetime")
            .addColumn("redeemed_utc", "datetime")
            .execute();

          await db.schema
            .createTable("seat_reservations")
            .addColumn("seat_id", "varchar(30)", (col) =>
              col.primaryKey().notNull()
            )
            .addColumn("tenant_id", "varchar(30)")
            .addColumn("user_id", "varchar(30)")
            .addColumn("email", "varchar(255)")
            .addColumn("invite_url", "varchar(500)")
            .execute();

          await db.schema
            .createTable("seat_occupants")
            .addColumn("seat_id", "varchar(30)", (col) =>
              col.primaryKey().notNull()
            )
            .addColumn("user_id", "varchar(30)", (col) => col.notNull())
            .addColumn("tenant_id", "varchar(30)", (col) => col.notNull())
            .addColumn("email", "varchar(255)")
            .addColumn("user_name", "varchar(255)")
            .execute();

          await db.schema
            .createTable("subscriptions")
            .addColumn("subscription_id", "varchar(30)", (col) =>
              col.primaryKey().notNull()
            )
            .addColumn("is_setup_complete", "boolean")
            .addColumn("created_utc", "datetime")
            .addColumn("tenant_id", "varchar(30)")
            .addColumn("subscriber_info", "json")
            .addColumn("source_subscription", "json")
            .addColumn("subscription_name", "varchar(255)")
            .addColumn("tenant_name", "varchar(255)")
            .addColumn("offer_id", "varchar(30)")
            .addColumn("plan_id", "varchar(30)")
            .addColumn("state", "varchar(15)", (col) => col.notNull())
            .addColumn("admin_role_name", "varchar(50)")
            .addColumn("user_role_name", "varchar(50)")
            .addColumn("management_urls", "json")
            .addColumn("admin_name", "varchar(50)")
            .addColumn("admin_email", "varchar(255)")
            .addColumn("total_seats", "integer")
            .addColumn("is_being_configured", "boolean")
            .addColumn("is_free_trial", "boolean")
            .addColumn("is_test_subscription", "boolean")
            .addColumn("state_last_updated_utc", "datetime")
            .execute();
        },
        down: async (db) => {
          await db.schema.dropTable("subscriptions").execute();
          await db.schema.dropTable("seat_occupants").execute();
          await db.schema.dropTable("seat_reservations").execute();
          // await db.schema
          //   .dropIndex("fk_idx_product_config_publisher")
          //   .execute();
          await db.schema.dropTable("product_config").execute();
          // await db.schema
          //   .dropIndex("fk_idx_seating_config_publisher")
          //   .execute();
          await db.schema.dropTable("seating_config").execute();
          await db.schema.dropTable("publishers").execute();
        },
      },
    });
  }
}

const toLatest = async (dialect: Dialect, provider: MigrationProvider) => {
  const db = new Kysely<Database>({
    dialect,
  });

  const migrator = new Migrator({
    db,
    provider,
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
};

export const migrateToLatest = (config: PlanetScaleDialectConfig) => {
  const dialect = new PlanetScaleDialect(config);
  const provider = new MigrationProvider();
  toLatest(dialect, provider);
};
