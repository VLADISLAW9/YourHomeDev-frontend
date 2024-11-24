import { createLazyFileRoute } from '@tanstack/react-router';

const AboutUsPage = () => <></>;

export const Route = createLazyFileRoute('/_layout/about-us/')({
  component: AboutUsPage
});
