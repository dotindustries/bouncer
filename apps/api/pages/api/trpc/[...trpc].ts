import { appRouter, createTRPCContext } from "@dotinc/bouncer-api";
import { createNextApiHandler } from "@dotinc/bouncer-admin/src/server";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
});

// If you need to enable cors, you can do so like this:
// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   // Enable cors
//   await cors(req, res);

//   // Let the tRPC handler do its magic
//   return createNextApiHandler({
//     router: appRouter,
//     createContext,
//   })(req, res);
// };

// export default handler;
