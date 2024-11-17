import { createFileRoute } from '@tanstack/react-router';

import { Layout, PageLoader } from '../components';

export const Route = createFileRoute('/_layout')({
  component: Layout,
  pendingComponent: PageLoader
});
