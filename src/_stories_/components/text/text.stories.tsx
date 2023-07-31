import { Meta } from '@storybook/react';
import tw from 'twin.macro';

import { Text } from '~/components/text';

export default {
  component: Text,
  title: 'Components/Text',
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'text' },
  },
} satisfies Meta<typeof Text>;

const Template = () => (
  <Wrapper>
    <Text type="r-12">Regular 12/20</Text>
    <Text type="r-14">Regular 14/22</Text>
    <Text type="r-16">Regular 16/24</Text>
    <Text type="r-18">Regular 18/26</Text>
    <br />
    <Text type="sb-12">Semibold 12/20</Text>
    <Text type="sb-14">Semibold 14/22</Text>
    <Text type="sb-16">Semibold 16/24</Text>
    <Text type="sb-18">Semibold 18/26</Text>
    <Text type="sb-20">Semibold 20/28</Text>
    <Text type="sb-24">Semibold 24/32</Text>
    <Text type="sb-28">Semibold 28/38</Text>
  </Wrapper>
);

const Wrapper = tw.div`
  flex flex-col gap-5
`;

export const Default = Template.bind({});
