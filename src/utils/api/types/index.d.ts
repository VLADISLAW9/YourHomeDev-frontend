interface MutationSettings<Params = void, Func = unknown> {
  config?: ApiRequestConfig;
  options?: import('@tanstack/react-query').UseMutationOptions<
    Awaited<ReturnType<Func>>,
    any,
    Params,
    any
  >;
}

interface QuerySettings<Func = unknown> {
  config?: ApiRequestConfig;
  options?: Omit<
    import('@tanstack/react-query').UseQueryOptions<Awaited<ReturnType<Func>>>,
    'queryKey'
  >;
}
