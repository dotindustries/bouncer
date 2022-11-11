import path from 'path'
// import ntm from "next-transpile-modules";
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
// const withTM = ntm(["@dotinc/bouncer-core"]);

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config
}

export default // withTM(
defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
  },
})
// );
