export type InferParams<T extends (body: any, config: { params: any }) => any> =
  T extends (body: any, config: { params: infer P }) => any ? P : never;

export type InferQueries<T extends (config: { queries: any }) => any> =
  T extends (config: { queries: infer Q }) => any ? Q : never;

export type InferQueryParam<T extends (config: { params: any }) => any> =
  T extends (config: { params: infer P }) => any ? P : never;
