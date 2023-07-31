import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider } from 'connectkit';
import { WagmiConfig } from 'wagmi';

import { config } from '~/configs/setup-wallet';

import MainPage from '.';

const meta = {
  title: 'Pages/Main',
  component: MainPage,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof MainPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const queryClient = new QueryClient();
export const _MainPage: Story = {
  render: () => (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <ConnectKitProvider theme="soft">
          <MainPage />
        </ConnectKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  ),
  args: {},
};
