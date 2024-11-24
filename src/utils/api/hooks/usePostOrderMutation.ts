import { useMutation } from '@tanstack/react-query';

import type { PostOrderConfig } from '@/utils/api';

import { postOrder } from '@/utils/api';

export const usePostOrderMutation = (
  settings?: MutationSettings<PostOrderConfig, typeof postOrder>
) =>
  useMutation({
    mutationKey: ['postOrder'],
    mutationFn: ({ params, config }) =>
      postOrder({
        params,
        config: { ...settings?.config, ...config }
      }),
    ...settings?.options
  });
