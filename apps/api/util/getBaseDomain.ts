export const getBaseDomain = () => {
  if (typeof window !== "undefined") return window.location.origin; // vercel hack https://supertokens.com/blog/how-to-deploy-supertokens-with-react-nodejs-express-on-vercel
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};
