import {
  Kysely,
  KyselyConfig,
  KyselyPlugin,
  OperationNodeTransformer,
  PluginTransformQueryArgs,
  PluginTransformResultArgs,
  PrimitiveValueListNode,
  QueryResult,
  RootOperationNode,
  sql,
  SqliteDialect,
  SqliteDialectConfig,
  UnknownRow,
} from "kysely";
import type {
  Repository,
  SeatingSummary,
  Subscription,
} from "@dotinc/bouncer-core";
import { getMysqlFormattedDateTime } from "@dotinc/bouncer-core";
import type { Database } from "./schema";
import SqliteDatabase, {
  Database as BetterSqlite3Database,
} from "better-sqlite3";

export * from "./schema";
export { sqliteMigrateToLatest } from "./migration";

// because json comes out as parsed object, but can only be inserted/updated as string
const actuallyItisJsonAlready = (seeminglyString: string) =>
  seeminglyString as unknown as Record<string, string> | null | undefined;

export const createRepository = (args: KyselyConfig): Repository => {
  const db = new Kysely<Database>(args);

  const repo: Repository = {
    getPublisher: async (publisherId) => {
      const row = await db
        .selectFrom("publishers")
        .innerJoin("seating_config", "seating_config.owner_id", "id")
        .innerJoin("product_config", "product_config.publisher_id", "id")
        .selectAll()
        .where("id", "=", publisherId)
        .executeTakeFirst();

      if (!row) return undefined;

      return {
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
    },
    getPublishers: async () => {
      const rows = await db
        .selectFrom("publishers")
        .innerJoin("seating_config", "seating_config.owner_id", "id")
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
          .where("seating_config.owner_id", "=", update.id)
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
        console.log("creating publisher", config.id);
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
            `Failed to save publisher configuration: [${config.id}]`
          );

        console.log(
          `creating product configuration for publisher [${config.id}]`
        );
        const prodConfig = await tx
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
            `Failed to save publisher configuration: [${config.id}]`
          );

        console.log(
          `creating default seating configuration for publisher [${config.id}]`
        );
        const seatingConfig = await tx
          .insertInto("seating_config")
          .values({
            owner_id: config.id,
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
            `Failed to save publisher configuration: [${config.id}]`
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
        .where("seats.seat_id", "=", seatId)
        .where("subscription_id", "=", subscriptionId)
        .executeTakeFirst();
      if (!row) return undefined;

      return {
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
                user_name: (row.occupant_user_name ?? undefined) as
                  | string
                  | undefined,
                email: (row.occupant_email ?? undefined) as string | undefined,
              }
            : null,
        reservation:
          row.reservation_tenant_id || row.reservation_email
            ? {
                identifier: row.reservation_tenant_id
                  ? {
                      user_id: row.reservation_user_id as string,
                      tenant_id: row.reservation_tenant_id as string, // ts wants to be smart
                    }
                  : {
                      email: row.reservation_email as string,
                    },
                invite_url: row.reservation_invite_url,
              }
            : null,
      };
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
        .where("seats.subscription_id", "=", subscriptionId)
        .where((qb) =>
          qb
            .where("expires_utc", "is", null)
            .orWhere("expires_utc", ">", getMysqlFormattedDateTime())
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
                user_name: (row.occupant_user_name ?? undefined) as
                  | string
                  | undefined,
                email: (row.occupant_email ?? undefined) as string | undefined,
              }
            : null,
        reservation:
          row.reservation_tenant_id || row.reservation_email
            ? {
                identifier: row.reservation_tenant_id
                  ? {
                      user_id: row.reservation_user_id as string,
                      tenant_id: row.reservation_tenant_id as string, // ts wants to be smart
                    }
                  : {
                      email: row.reservation_email as string,
                    },
                invite_url: row.reservation_invite_url,
              }
            : null,
      }));
    },
    replaceSeat: async (update) => {
      await db.transaction().execute(async (tx) => {
        const up = await tx
          .insertInto("seats")
          .values({
            seat_id: update.seat_id,
            created_utc: update.created_utc,
            subscription_id: update.subscription_id,
            expires_utc: update.expires_utc,
            redeemed_utc: update.redeemed_utc,
            seat_type: update.seat_type,
            seating_strategy_name: update.seating_strategy_name,
          })
          .onDuplicateKeyUpdate({
            expires_utc: update.expires_utc,
            redeemed_utc: update.redeemed_utc,
            seat_type: update.seat_type,
            seating_strategy_name: update.seating_strategy_name,
          })
          .executeTakeFirst();

        // TODO: this does not check for success
        if (!up) throw new Error(`Failed to save seat: [${update.seat_id}]`);

        // if there's no reservation present in the update
        //   try to delete it
        if (!update.reservation) {
          await tx
            .deleteFrom("seat_reservations")
            .where("seat_id", "=", update.seat_id)
            .execute();
        } else {
          const reservation = update.reservation;
          const res = await tx
            .insertInto("seat_reservations")
            .values({
              seat_id: update.seat_id,
              tenant_id:
                "tenant_id" in reservation.identifier
                  ? reservation.identifier.tenant_id
                  : null,
              user_id:
                "tenant_id" in reservation.identifier
                  ? reservation.identifier.user_id
                  : null,
              invite_url: reservation.invite_url,
              email:
                "email" in reservation.identifier
                  ? reservation.identifier.email
                  : null,
            })
            .onDuplicateKeyUpdate({
              tenant_id:
                "tenant_id" in reservation.identifier
                  ? reservation.identifier.tenant_id
                  : null,
              user_id:
                "tenant_id" in reservation.identifier
                  ? reservation.identifier.user_id
                  : null,
              invite_url: reservation.invite_url,
              email:
                "email" in reservation.identifier
                  ? reservation.identifier.email
                  : null,
            })
            .executeTakeFirst();
          // TODO: this does not check for success
          if (!res)
            throw new Error(
              `Failed to save seat reservation: [${update.seat_id}]`
            );
        }

        // if there's no occupant present in the update
        //   try to delete it
        if (!update.occupant) {
          await tx
            .deleteFrom("seat_occupants")
            .where("seat_id", "=", update.seat_id)
            .execute();
        } else {
          const occupant = update.occupant;

          const occ = await tx
            .insertInto("seat_occupants")
            .values({
              seat_id: update.seat_id,
              user_id: occupant.user_id,
              tenant_id: occupant.tenant_id,
              email: occupant.email,
              user_name: occupant.user_name,
            })
            .onDuplicateKeyUpdate({
              user_id: occupant.user_id,
              tenant_id: occupant.tenant_id,
              email: occupant.email,
              user_name: occupant.user_name,
            })
            .executeTakeFirst();

          if (!occ)
            throw new Error(
              `Failed to save seat occupant: [${update.seat_id}]`
            );
        }
      });

      return update;
    },
    createSeat: async (seat, subscription) => {
      const actualSeatSummaryRows = await db
        .selectFrom("seats")
        .select([sql`COUNT(1)`.as("seat_count"), "seat_type"])
        .where("subscription_id", "=", subscription.subscription_id)
        .where((w) =>
          w
            .where("expires_utc", "is", null)
            .orWhere("expires_utc", ">", getMysqlFormattedDateTime())
        )
        .groupBy("seat_type")
        .execute();

      const unknownToInt = (seatCount: unknown) => {
        if (!seatCount) return 0;
        if (typeof seatCount === "number") return seatCount;
        if (typeof seatCount === "string") return parseInt(seatCount);
        console.error(
          "got unknown type for seat count from aggregate query",
          seatCount,
          typeof seatCount
        );
        return 0; // unknown type
      };

      const actualSeatSummary: SeatingSummary = {
        standardSeatCount: unknownToInt(
          actualSeatSummaryRows.find((r) => r.seat_type === "standard")
            ?.seat_count
        ),
        limitedSeatCount: unknownToInt(
          actualSeatSummaryRows.find((r) => r.seat_type === "limited")
            ?.seat_count
        ),
      };

      console.log("seat_summary", JSON.stringify({ actualSeatSummary }));

      if (seat.seat_type === "standard") {
        if (
          subscription.total_seats &&
          subscription.total_seats <= actualSeatSummary.standardSeatCount
        ) {
          return {
            isSeatCreated: false,
            seatingSummary: actualSeatSummary,
          };
        }

        actualSeatSummary.standardSeatCount =
          actualSeatSummary.standardSeatCount + 1;
      } else {
        actualSeatSummary.limitedSeatCount =
          actualSeatSummary.limitedSeatCount + 1;
      }
      console.log("modified seat_summary", JSON.stringify(actualSeatSummary));

      await db.transaction().execute(async (tx) => {
        const ss = await tx
          .insertInto("seat_summary")
          .values({
            subscription_id: subscription.subscription_id,
            standard_seat_count: actualSeatSummary.standardSeatCount,
            limited_seat_count: actualSeatSummary.limitedSeatCount,
          })
          .onDuplicateKeyUpdate({
            standard_seat_count: actualSeatSummary.standardSeatCount,
            limited_seat_count: actualSeatSummary.limitedSeatCount,
          })
          .executeTakeFirst();
        // TODO: this doesn't check success
        if (!ss) {
          throw new Error(
            `Failed to save seat summary for subscription [${subscription.subscription_id}]`
          );
        }

        const up = await tx
          .insertInto("seats")
          .values({
            seat_id: seat.seat_id,
            created_utc: seat.created_utc,
            subscription_id: seat.subscription_id,
            expires_utc: seat.expires_utc,
            redeemed_utc: seat.redeemed_utc,
            seat_type: seat.seat_type,
            seating_strategy_name: seat.seating_strategy_name,
          })
          .executeTakeFirst();

        // TODO: this does not check for success
        if (!up) throw new Error(`Failed to save seat: [${seat.seat_id}]`);

        if (seat.reservation) {
          const reservation = seat.reservation;
          const res = await tx
            .insertInto("seat_reservations")
            .values({
              seat_id: seat.seat_id,
              tenant_id:
                "tenant_id" in reservation.identifier
                  ? reservation.identifier.tenant_id
                  : null,
              user_id:
                "tenant_id" in reservation.identifier
                  ? reservation.identifier.user_id
                  : null,
              invite_url: reservation.invite_url,
              email:
                "email" in reservation.identifier
                  ? reservation.identifier.email
                  : null,
            })
            .executeTakeFirst();
          // TODO: this does not check for success
          if (!res)
            throw new Error(
              `Failed to save seat reservation: [${seat.seat_id}]`
            );
        }

        if (seat.occupant) {
          const occupant = seat.occupant;

          const occ = await tx
            .insertInto("seat_occupants")
            .values({
              seat_id: seat.seat_id,
              user_id: occupant.user_id,
              tenant_id: occupant.tenant_id,
              email: occupant.email,
              user_name: occupant.user_name,
            })
            .executeTakeFirst();

          if (!occ)
            throw new Error(`Failed to save seat occupant: [${seat.seat_id}]`);
        }
      });

      const createdSeat = await repo.getSeat(
        seat.seat_id,
        seat.subscription_id!
      );
      if (!createdSeat) {
        console.error(
          "we failed to get a subscription which we just updated... wtf?"
        );
        throw new Error(
          "we failed to find the just updated subscription, please call us."
        );
      }

      return {
        isSeatCreated: true,
        seatingSummary: actualSeatSummary,
        createdSeat,
      };
    },
    deleteSeat: async (seatId, subscriptionId) => {
      await db.transaction().execute(async (tx) => {
        await tx
          .deleteFrom("seats")
          .where("seat_id", "=", seatId)
          .where("subscription_id", "=", subscriptionId);
        await tx.deleteFrom("seat_occupants").where("seat_id", "=", seatId);
        await tx.deleteFrom("seat_reservations").where("seat_id", "=", seatId);
      });
    },
    getSubscription: async (subscriptionId) => {
      const row = await db
        .selectFrom("subscriptions")
        .leftJoin("seating_config", "owner_id", "subscription_id")
        .selectAll()
        .where("subscription_id", "=", subscriptionId)
        .executeTakeFirst();

      if (!row) return undefined;

      return {
        subscription_id: row.subscription_id,
        subscriber_info: actuallyItisJsonAlready(row.subscriber_info),
        source_subscription: actuallyItisJsonAlready(row.source_subscription),
        is_setup_complete: row.is_setup_complete,
        subscription_name: row.subscription_name,
        tenant_id: row.tenant_id,
        tenant_name: row.tenant_name,
        offer_id: row.offer_id,
        plan_id: row.plan_id,
        state: row.state,
        admin_role_name: row.admin_role_name,
        user_role_name: row.user_role_name,
        management_urls: actuallyItisJsonAlready(row.management_urls),
        admin_name: row.admin_name,
        admin_email: row.admin_email,
        total_seats: row.total_seats,
        is_being_configured: row.is_being_configured,
        is_free_trial: row.is_free_trial,
        is_test_subscription: row.is_test_subscription,
        created_utc: row.created_utc,
        state_last_updated_utc: row.state_last_updated_utc,
        seating_config: row.seating_strategy_name
          ? {
              seat_reservation_expiry_in_days:
                row.seat_reservation_expiry_in_days ?? undefined,
              default_seat_expiry_in_days:
                row.default_seat_expiry_in_days ?? undefined,
              defaultLowSeatWarningLevelPercent:
                row.defaultLowSeatWarningLevelPercent ?? 0,
              seating_strategy_name: row.seating_strategy_name,
              low_seat_warning_level_pct: row.low_seat_warning_level_pct,
              limited_overflow_seating_enabled:
                row.limited_overflow_seating_enabled,
            }
          : null,
      };
    },
    getSubscriptions: async (publisherId) => {
      const rows = await db
        .selectFrom("subscriptions")
        .leftJoin("seating_config", "owner_id", "subscription_id")
        .selectAll()
        .where("publisher_id", "=", publisherId)
        .execute();

      return rows.map((row) => {
        const r: Subscription = {
          subscription_id: row.subscription_id,
          subscriber_info: actuallyItisJsonAlready(row.subscriber_info),
          source_subscription: actuallyItisJsonAlready(row.source_subscription),
          is_setup_complete: row.is_setup_complete,
          subscription_name: row.subscription_name,
          tenant_id: row.tenant_id,
          tenant_name: row.tenant_name,
          offer_id: row.offer_id,
          plan_id: row.plan_id,
          state: row.state,
          admin_role_name: row.admin_role_name,
          user_role_name: row.user_role_name,
          management_urls: actuallyItisJsonAlready(row.management_urls),
          admin_name: row.admin_name,
          admin_email: row.admin_email,
          total_seats: row.total_seats,
          is_being_configured: row.is_being_configured,
          is_free_trial: row.is_free_trial,
          is_test_subscription: row.is_test_subscription,
          created_utc: row.created_utc,
          state_last_updated_utc: row.state_last_updated_utc,
          seating_config: row.seating_strategy_name
            ? {
                seat_reservation_expiry_in_days:
                  row.seat_reservation_expiry_in_days ?? undefined,
                default_seat_expiry_in_days:
                  row.default_seat_expiry_in_days ?? undefined,
                defaultLowSeatWarningLevelPercent:
                  row.defaultLowSeatWarningLevelPercent ?? 0,
                seating_strategy_name: row.seating_strategy_name,
                low_seat_warning_level_pct: row.low_seat_warning_level_pct,
                limited_overflow_seating_enabled:
                  row.limited_overflow_seating_enabled,
              }
            : null,
        };
        return r;
      });
    },
    createSubscription: async (publisherId, sub) => {
      const defaultSeatConfig = await db
        .selectFrom("seating_config")
        .selectAll()
        .where("owner_id", "=", publisherId)
        .executeTakeFirstOrThrow();

      await db.transaction().execute(async (tx) => {
        const now = new Date();
        const up = await tx
          .insertInto("subscriptions")
          .values({
            subscription_id: sub.subscription_id,
            publisher_id: publisherId,
            subscriber_info: JSON.stringify(sub.subscriber_info),
            source_subscription: JSON.stringify(sub.source_subscription),
            is_setup_complete: sub.is_setup_complete ?? false,
            subscription_name: sub.subscription_name ?? sub.subscription_id,
            tenant_id: sub.tenant_id,
            tenant_name: sub.tenant_name,
            offer_id: sub.offer_id,
            plan_id: sub.plan_id,
            state: sub.state,
            admin_role_name: sub.admin_role_name,
            user_role_name: sub.user_role_name,
            management_urls: JSON.stringify(sub.management_urls),
            admin_name: sub.admin_name,
            admin_email: sub.admin_email,
            total_seats: sub.total_seats,
            is_being_configured: sub.is_being_configured,
            is_free_trial: sub.is_free_trial,
            is_test_subscription: sub.is_test_subscription,
            created_utc: sub.created_utc ?? getMysqlFormattedDateTime(now),
            state_last_updated_utc:
              sub.state_last_updated_utc ?? getMysqlFormattedDateTime(now),
          })
          .execute();

        // TODO: this does not check insert success
        if (!up)
          throw new Error(
            `Failed to save subscription: [${publisherId}, ${sub.subscription_id}]`
          );

        const seatConfig = sub.seating_config ?? defaultSeatConfig;

        const scUp = await tx
          .insertInto("seating_config")
          .values({
            owner_id: sub.subscription_id,
            seat_reservation_expiry_in_days:
              seatConfig.seat_reservation_expiry_in_days,
            default_seat_expiry_in_days: seatConfig.default_seat_expiry_in_days,
            defaultLowSeatWarningLevelPercent:
              seatConfig.defaultLowSeatWarningLevelPercent,
            seating_strategy_name: seatConfig.seating_strategy_name,
            low_seat_warning_level_pct: seatConfig.low_seat_warning_level_pct,
            limited_overflow_seating_enabled:
              seatConfig.limited_overflow_seating_enabled,
          })
          .execute();

        // TODO: this does not check insert success
        if (!scUp)
          throw new Error(
            `Failed to save seating_config for subscription: [${publisherId}, ${sub.subscription_id}]`
          );
      });

      return sub;
    },
    updateSubscription: async (sub) => {
      const defaultSeatConfig = await db
        .selectFrom("seating_config")
        .selectAll()
        .where(
          "owner_id",
          "=",
          db
            .selectFrom("subscriptions")
            .select("publisher_id")
            .where("subscription_id", "=", sub.subscription_id)
        )
        .executeTakeFirstOrThrow();

      await db.transaction().execute(async (tx) => {
        const up = await tx
          .updateTable("subscriptions")
          .set({
            plan_id: sub.plan_id,
            is_being_configured: sub.is_being_configured,
            source_subscription: JSON.stringify(sub.source_subscription),
            subscriber_info: JSON.stringify(sub.subscriber_info),
            subscription_name: sub.subscription_name,
            total_seats: sub.total_seats,
            admin_role_name: sub.admin_role_name,
            user_role_name: sub.user_role_name,
            is_setup_complete: sub.is_setup_complete,
            management_urls: JSON.stringify(sub.management_urls),
            admin_name: sub.admin_name,
            admin_email: sub.admin_email,
            tenant_name: sub.tenant_name,
            // TODO: state might not change,
            //   we should consider only updating the timestamp if state is different.
            state: sub.state,
            state_last_updated_utc: getMysqlFormattedDateTime(),
          })
          .where("subscription_id", "=", sub.subscription_id)
          .execute();

        // TODO: this does not check insert success
        if (!up)
          throw new Error(
            `Failed to save subscription: [${sub.subscription_id}]`
          );

        if (sub.seating_config) {
          const scUp = await tx
            .updateTable("seating_config")
            .set({
              seat_reservation_expiry_in_days:
                sub.seating_config.seat_reservation_expiry_in_days ??
                defaultSeatConfig.seat_reservation_expiry_in_days,
              default_seat_expiry_in_days:
                sub.seating_config.default_seat_expiry_in_days ??
                defaultSeatConfig.default_seat_expiry_in_days,
              seating_strategy_name:
                sub.seating_config.seating_strategy_name ??
                defaultSeatConfig.seating_strategy_name,
              limited_overflow_seating_enabled:
                sub.seating_config.limited_overflow_seating_enabled ??
                defaultSeatConfig.limited_overflow_seating_enabled,
              // these were originally not updated on patch
              defaultLowSeatWarningLevelPercent:
                sub.seating_config.defaultLowSeatWarningLevelPercent ??
                defaultSeatConfig.defaultLowSeatWarningLevelPercent,
              low_seat_warning_level_pct:
                sub.seating_config.low_seat_warning_level_pct ??
                defaultSeatConfig.low_seat_warning_level_pct,
            })
            .where("owner_id", "=", sub.subscription_id)
            .execute();

          // TODO: this does not check insert success
          if (!scUp)
            throw new Error(
              `Failed to save seating_config for subscription: [${sub.subscription_id}]`
            );
        }
      });

      // return the updated sub
      const updated = await repo.getSubscription(sub.subscription_id);
      if (!updated) {
        console.error(
          "we failed to get a subscription which we just updated... wtf?"
        );
        throw new Error(
          "we failed to find the just updated subscription, please call us."
        );
      }
      return updated;
    },
  };

  return repo;
};

export const createSqliteDatabase = (
  filepath: string
): BetterSqlite3Database => {
  return new SqliteDatabase(filepath, { verbose: console.log });
};

export const createSqliteRepository = (config: SqliteDialectConfig) => {
  return createRepository({
    dialect: new SqliteDialect(config),
    plugins: [new SqliteBooleanPlugin()],
    log: ["query", "error"],
  });
};

class SqliteBooleanPlugin implements KyselyPlugin {
  private readonly transformer = new SqliteBooleanTransformer();

  transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
    return this.transformer.transformNode(args.node);
  }

  transformResult(
    args: PluginTransformResultArgs
  ): Promise<QueryResult<UnknownRow>> {
    // FIXME: we can't get out boolean from sqlite...
    return Promise.resolve(args.result);
  }
}

class SqliteBooleanTransformer extends OperationNodeTransformer {
  protected transformPrimitiveValueList(
    node: PrimitiveValueListNode
  ): PrimitiveValueListNode {
    console.log("trasnforming values");
    const vnode = super.transformPrimitiveValueList(node);
    return {
      ...vnode,
      values: vnode.values.map((v) =>
        typeof v === "boolean" ? (v ? 1 : 0) : v
      ),
    };
  }
}
