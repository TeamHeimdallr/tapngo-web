import tw from 'twin.macro';

import { Gnb } from '~/components/gnb';

export default {
  component: Gnb,
  title: 'Components/Gnb',
};

const Template = arg => (
  <Wrapper>
    <Gnb {...arg} />
  </Wrapper>
);

const Wrapper = tw.div`
  flex flex-col gap-10
  
`;

export const Default = Template.bind({});
