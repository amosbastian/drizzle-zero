import type { DBConnection, DBTransaction, Row } from "@rocicorp/zero/pg";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import pg, { type PoolClient, type QueryResultRow } from "pg";
import * as schema from "./schema/index.js";

const client = new pg.Pool({
  connectionString: process.env["DATABASE_URL"],
});

await client.connect();

export const db = drizzle(client, {
  schema,
});

// My Drizzle instance type, assuming $client is the raw pg.PoolClient, matches how
// `drizzle()` inits when using `node-postgres`
type Drizzle = NodePgDatabase<typeof schema> & { $client: PoolClient };

// Extract the Drizzle-specific transaction type
export type DrizzleTransaction = Parameters<Parameters<Drizzle["transaction"]>[0]>[0];

export class DrizzleConnection implements DBConnection<DrizzleTransaction> {
  drizzle: Drizzle;

  constructor(drizzle: Drizzle) {
    this.drizzle = drizzle;
  }

  // `query` is used by Zero's ZQLDatabase for ZQL reads on the server
  async query(sql: string, params: unknown[]): Promise<Row[]> {
    return this.drizzle.$client.query<QueryResultRow>(sql, params).then(({ rows }) => rows);
  }

  // `transaction` wraps Drizzle's transaction
  transaction<T>(fn: (tx: DBTransaction<DrizzleTransaction>) => Promise<T>): Promise<T> {
    return this.drizzle.transaction((drizzleTx) =>
      // Pass a new Zero DBTransaction wrapper around Drizzle's one
      fn(new ZeroDrizzleTransaction(drizzleTx)),
    );
  }
}

class ZeroDrizzleTransaction implements DBTransaction<DrizzleTransaction> {
  readonly wrappedTransaction: DrizzleTransaction;

  constructor(drizzleTx: DrizzleTransaction) {
    this.wrappedTransaction = drizzleTx;
  }

  // This `query` method would be used if ZQL reads happen *within*
  // a custom mutator that is itself running inside this wrapped transaction.
  async query(sql: string, params: unknown[]): Promise<Row[]> {
    // Drizzle's transaction object might hide the raw client,
    // this is one way to get at it for `pg` driver. Adjust if needed.
    const session = this.wrappedTransaction._.session as unknown as {
      client: Drizzle["$client"];
    };
    return session.client.query<QueryResultRow>(sql, params).then(({ rows }) => rows);
  }
}
