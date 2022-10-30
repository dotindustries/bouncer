export type InferParams<T extends (body: any, config: { params: any }) => any> =
  T extends (body: any, config: { params: infer P }) => any ? P : never;
