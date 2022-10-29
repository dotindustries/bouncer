import {
  Kysely,
  KyselyConfig,
  SqliteDialect,
  SqliteDialectConfig,
} from "kysely";
import type {
  Seat,
  Repository,
  PublisherConfiguration,
} from "@dotinc/bouncer-core";
import type { Database } from "./schema";
import SqliteDatabase, {
  Database as BetterSqlite3Database,
} from "better-sqlite3";

export * from "./schema";
export { sqliteMigrateToLatest } from "./migration";

export const createRepository = (args: KyselyConfig): Repository => {
  const db = new Kysely<Database>(args);

  return {
    getPublisher: async (publisherId) => {
      const row = await db
        .selectFrom("publishers")
        .innerJoin("seating_config", "seating_config.publisher_id", "id")
        .innerJoin("product_config", "product_config.publisher_id", "id")
        .selectAll()
        .where("id", "=", publisherId)
        .executeTakeFirst();

      if (!row) return undefined;

      const pc: PublisherConfiguration = {
        id: row.id,
        product_name: row.product_name,
        publisher_name: row.publisher_name,
        home_page_url: row.home_page_url,
        contact_page_url: row.contact_page_url,
        privacy_notice_page_url: row.privacy_notice_page_url,
        contact_sales_email: row.contact_sales_email,
        contact_sales_url: row.contact_sales_url,
        contact_support_email: row.contact_support_email,
        contact_support_url: row.contact_support_url,
        mona_base_storage_url: row.mona_base_storage_url,
        mona_subscription_state: row.mona_subscription_state,
        mona_subscription_is_being_configured:
          row.mona_subscription_is_being_configured,
        is_setup_complete: row.is_setup_complete,
        default_seating_config: {
          defaultLowSeatWarningLevelPercent:
            row.defaultLowSeatWarningLevelPercent,
          seating_strategy_name: row.seating_strategy_name,
          low_seat_warning_level_pct: row.low_seat_warning_level_pct,
          limited_overflow_seating_enabled:
            row.limited_overflow_seating_enabled,
          seat_reservation_expiry_in_days: row.seat_reservation_expiry_in_days,
          default_seat_expiry_in_days: row.default_seat_expiry_in_days,
        },
        product_config: {
          on_access_denied_url: row.on_access_denied_url,
          on_access_granted_url: row.on_access_granted_url,
          on_no_seat_available_url: row.on_no_seat_available_url,
          on_subscription_not_ready_url: row.on_subscription_not_ready_url,
          on_subscription_canceled_url: row.on_subscription_canceled_url,
          on_subscription_suspended_url: row.on_subscription_suspended_url,
          on_subscription_not_found_url: row.on_subscription_not_found_url,
          on_no_subscriptions_found_url: row.on_no_subscriptions_found_url,
        },
      };
      return pc;
    },
    getPublishers: async () => {
      const rows = await db
        .selectFrom("publishers")
        .innerJoin("seating_config", "seating_config.publisher_id", "id")
        .innerJoin("product_config", "product_config.publisher_id", "id")
        .selectAll()
        .execute();

      return rows.map((row) => ({
        id: row.id,
        product_name: row.product_name,
        publisher_name: row.publisher_name,
        home_page_url: row.home_page_url,
        contact_page_url: row.contact_page_url,
        privacy_notice_page_url: row.privacy_notice_page_url,
        contact_sales_email: row.contact_sales_email,
        contact_sales_url: row.contact_sales_url,
        contact_support_email: row.contact_support_email,
        contact_support_url: row.contact_support_url,
        mona_base_storage_url: row.mona_base_storage_url,
        mona_subscription_state: row.mona_subscription_state,
        mona_subscription_is_being_configured:
          row.mona_subscription_is_being_configured,
        is_setup_complete: row.is_setup_complete,
        default_seating_config: {
          defaultLowSeatWarningLevelPercent:
            row.defaultLowSeatWarningLevelPercent,
          seating_strategy_name: row.seating_strategy_name,
          low_seat_warning_level_pct: row.low_seat_warning_level_pct,
          limited_overflow_seating_enabled:
            row.limited_overflow_seating_enabled,
          seat_reservation_expiry_in_days: row.seat_reservation_expiry_in_days,
          default_seat_expiry_in_days: row.default_seat_expiry_in_days,
        },
        product_config: {
          on_access_denied_url: row.on_access_denied_url,
          on_access_granted_url: row.on_access_granted_url,
          on_no_seat_available_url: row.on_no_seat_available_url,
          on_subscription_not_ready_url: row.on_subscription_not_ready_url,
          on_subscription_canceled_url: row.on_subscription_canceled_url,
          on_subscription_suspended_url: row.on_subscription_suspended_url,
          on_subscription_not_found_url: row.on_subscription_not_found_url,
          on_no_subscriptions_found_url: row.on_no_subscriptions_found_url,
        },
      }));
    },
    updatePublisher: async (update) => {
      await db.transaction().execute(async (tx) => {
        const up = await tx
          .updateTable("publishers")
          .set({
            product_name: update.product_name,
            publisher_name: update.publisher_name,
            home_page_url: update.home_page_url,
            contact_page_url: update.contact_page_url,
            privacy_notice_page_url: update.privacy_notice_page_url,
            contact_sales_email: update.contact_sales_email,
            contact_sales_url: update.contact_sales_url,
            contact_support_email: update.contact_support_email,
            contact_support_url: update.contact_support_url,
            mona_base_storage_url: update.mona_base_storage_url,
            mona_subscription_state: update.mona_subscription_state,
            mona_subscription_is_being_configured:
              update.mona_subscription_is_being_configured,
            is_setup_complete: update.is_setup_complete,
          })
          .where("id", "=", update.id)
          .executeTakeFirst();

        if (up.numUpdatedRows !== 1n)
          throw new Error(
            `Failed to update publisher configuration: [${update.id}]`
          );

        // TODO: only update if we have a delta?
        const prodConfig = await db
          .updateTable("product_config")
          .set({
            on_access_denied_url: update.product_config.on_access_denied_url,
            on_access_granted_url: update.product_config.on_access_granted_url,
            on_no_seat_available_url:
              update.product_config.on_no_seat_available_url,
            on_no_subscriptions_found_url:
              update.product_config.on_no_subscriptions_found_url,
            on_subscription_canceled_url:
              update.product_config.on_subscription_canceled_url,
            on_subscription_not_found_url:
              update.product_config.on_subscription_not_found_url,
            on_subscription_not_ready_url:
              update.product_config.on_subscription_not_ready_url,
            on_subscription_suspended_url:
              update.product_config.on_subscription_suspended_url,
          })
          .where("publisher_id", "=", update.id)
          .executeTakeFirst();

        if (prodConfig.numUpdatedRows !== 1n)
          throw new Error(
            `Failed to update publisher configuration: [${update.id}]`
          );

        // TODO: only update if we have a delta?
        const seatingConfig = await db
          .updateTable("seating_config")
          .set({
            default_seat_expiry_in_days:
              update.default_seating_config.default_seat_expiry_in_days,
            defaultLowSeatWarningLevelPercent:
              update.default_seating_config.defaultLowSeatWarningLevelPercent,
            limited_overflow_seating_enabled:
              update.default_seating_config.limited_overflow_seating_enabled,
            low_seat_warning_level_pct:
              update.default_seating_config.low_seat_warning_level_pct,
            seat_reservation_expiry_in_days:
              update.default_seating_config.seat_reservation_expiry_in_days,
            seating_strategy_name:
              update.default_seating_config.seating_strategy_name,
          })
          .where("seating_config.publisher_id", "=", update.id)
          .executeTakeFirst();

        if (seatingConfig.numUpdatedRows !== 1n)
          throw new Error(
            `Failed to update publisher configuration: [${update.id}]`
          );
      });

      return update;
    },
    createPublisher: async (config) => {
      await db.transaction().execute(async (tx) => {
        const up = await tx
          .insertInto("publishers")
          .values({
            id: config.id,
            product_name: config.product_name,
            publisher_name: config.publisher_name,
            home_page_url: config.home_page_url,
            contact_page_url: config.contact_page_url,
            privacy_notice_page_url: config.privacy_notice_page_url,
            contact_sales_email: config.contact_sales_email,
            contact_sales_url: config.contact_sales_url,
            contact_support_email: config.contact_support_email,
            contact_support_url: config.contact_support_url,
            mona_base_storage_url: config.mona_base_storage_url,
            mona_subscription_state: config.mona_subscription_state,
            mona_subscription_is_being_configured:
              config.mona_subscription_is_being_configured,
            is_setup_complete: config.is_setup_complete,
          })
          .executeTakeFirst();

        if (!up)
          throw new Error(
            `Failed to update publisher configuration: [${config.id}]`
          );

        // TODO: only update if we have a delta?
        const prodConfig = await db
          .insertInto("product_config")
          .values({
            publisher_id: config.id,
            on_access_denied_url: config.product_config.on_access_denied_url,
            on_access_granted_url: config.product_config.on_access_granted_url,
            on_no_seat_available_url:
              config.product_config.on_no_seat_available_url,
            on_no_subscriptions_found_url:
              config.product_config.on_no_subscriptions_found_url,
            on_subscription_canceled_url:
              config.product_config.on_subscription_canceled_url,
            on_subscription_not_found_url:
              config.product_config.on_subscription_not_found_url,
            on_subscription_not_ready_url:
              config.product_config.on_subscription_not_ready_url,
            on_subscription_suspended_url:
              config.product_config.on_subscription_suspended_url,
          })
          .executeTakeFirst();

        if (!prodConfig)
          throw new Error(
            `Failed to update publisher configuration: [${config.id}]`
          );

        // TODO: only update if we have a delta?
        const seatingConfig = await db
          .insertInto("seating_config")
          .values({
            publisher_id: config.id,
            default_seat_expiry_in_days:
              config.default_seating_config.default_seat_expiry_in_days,
            defaultLowSeatWarningLevelPercent:
              config.default_seating_config.defaultLowSeatWarningLevelPercent,
            limited_overflow_seating_enabled:
              config.default_seating_config.limited_overflow_seating_enabled,
            low_seat_warning_level_pct:
              config.default_seating_config.low_seat_warning_level_pct,
            seat_reservation_expiry_in_days:
              config.default_seating_config.seat_reservation_expiry_in_days,
            seating_strategy_name:
              config.default_seating_config.seating_strategy_name,
          })
          .executeTakeFirst();

        if (!seatingConfig)
          throw new Error(
            `Failed to update publisher configuration: [${config.id}]`
          );
      });

      return config;
    },
    getSeat: async (seatId, subscriptionId) => {
      const row = await db
        .selectFrom("seats")
        .leftJoin("seat_occupants", "seat_occupants.seat_id", "seats.seat_id")
        .leftJoin(
          "seat_reservations",
          "seat_reservations.seat_id",
          "seats.seat_id"
        )
        .select([
          "seats.subscription_id",
          "seats.seat_id",
          "seats.seat_type",
          "seats.seating_strategy_name",
          "seats.redeemed_utc",
          "seats.created_utc",
          "seats.expires_utc",
          "seat_occupants.user_id as occupant_user_id",
          "seat_occupants.user_name as occupant_user_name",
          "seat_occupants.tenant_id as occupant_tenant_id",
          "seat_occupants.email as occupant_email",
          "seat_reservations.email as reservation_email",
          "seat_reservations.invite_url as reservation_invite_url",
          "seat_reservations.tenant_id as reservation_tenant_id",
          "seat_reservations.user_id as reservation_user_id",
        ]) // explicitly select the non-nullable seat_id to make typescript happy
        .where("seat_id", "=", seatId)
        .where("subscription_id", "=", subscriptionId)
        .executeTakeFirst();
      if (!row) return undefined;

      const seat: Seat = {
        subscription_id: row.subscription_id,
        seat_id: row.seat_id,
        seat_type: row.seat_type,
        seating_strategy_name: row.seating_strategy_name,
        redeemed_utc: row.redeemed_utc,
        created_utc: row.created_utc,
        expires_utc: row.expires_utc,
        occupant:
          row.occupant_user_id && row.occupant_tenant_id
            ? {
                tenant_id: row.occupant_tenant_id,
                user_id: row.occupant_user_id,
                user_name: row.occupant_user_name,
                email: row.occupant_email,
              }
            : null,
        reservation:
          row.reservation_tenant_id || row.reservation_email
            ? {
                identifier: row.reservation_tenant_id
                  ? {
                      user_id: row.reservation_user_id,
                      tenant_id: row.reservation_tenant_id as string | null, // ts wants to be smart
                    }
                  : {
                      email: row.reservation_email,
                    },
                invite_url: row.reservation_invite_url,
              }
            : null,
      };
      return seat;
    },
    getSeats: async (subscriptionId, byUserId, byEmail) => {
      const q = db
        .selectFrom("seats")
        .leftJoin("seat_occupants", "seat_occupants.seat_id", "seats.seat_id")
        .leftJoin(
          "seat_reservations",
          "seat_reservations.seat_id",
          "seats.seat_id"
        )
        .select([
          "seats.subscription_id",
          "seats.seat_id",
          "seats.seat_type",
          "seats.seating_strategy_name",
          "seats.redeemed_utc",
          "seats.created_utc",
          "seats.expires_utc",
          "seat_occupants.user_id as occupant_user_id",
          "seat_occupants.user_name as occupant_user_name",
          "seat_occupants.tenant_id as occupant_tenant_id",
          "seat_occupants.email as occupant_email",
          "seat_reservations.email as reservation_email",
          "seat_reservations.invite_url as reservation_invite_url",
          "seat_reservations.tenant_id as reservation_tenant_id",
          "seat_reservations.user_id as reservation_user_id",
        ]) // explicitly select the non-nullable seat_id to make typescript happy
        .selectAll()
        .where("seats.subscription_id", "=", subscriptionId)
        .where((qb) =>
          qb
            .where("expires_utc", "is", null)
            .orWhere("expires_utc", ">", new Date())
        );

      if (byUserId) {
        q.where((qb) =>
          qb
            .where("seat_occupants.user_id", "=", byUserId)
            .orWhere("seat_reservations.user_id", "=", byUserId)
        );
      }
      if (byEmail) {
        q.where((qb) =>
          qb
            .where("seat_occupants.email", "=", byEmail)
            .orWhere("seat_reservations.email", "=", byEmail)
        );
      }
      const rows = await q.execute();

      return rows.map((row) => ({
        subscription_id: row.subscription_id,
        seat_id: row.seat_id,
        seat_type: row.seat_type,
        seating_strategy_name: row.seating_strategy_name,
        redeemed_utc: row.redeemed_utc,
        created_utc: row.created_utc,
        expires_utc: row.expires_utc,
        occupant:
          row.occupant_user_id && row.occupant_tenant_id
            ? {
                tenant_id: row.occupant_tenant_id,
                user_id: row.occupant_user_id,
                user_name: row.occupant_user_name,
                email: row.occupant_email,
              }
            : null,
        reservation:
          row.reservation_tenant_id || row.reservation_email
            ? {
                identifier: row.reservation_tenant_id
                  ? {
                      user_id: row.reservation_user_id,
                      tenant_id: row.reservation_tenant_id as string | null, // ts wants to be smart
                    }
                  : {
                      email: row.reservation_email,
                    },
                invite_url: row.reservation_invite_url,
              }
            : null,
      }));
    },
  };
};

export const createSqliteDatabase = (
  filepath: string
): BetterSqlite3Database => {
  return new SqliteDatabase(filepath, { verbose: console.log });
};

export const createSqliteRepository = (config: SqliteDialectConfig) => {
  return createRepository({
    dialect: new SqliteDialect(config),
    log: ["query", "error"],
  });
};
