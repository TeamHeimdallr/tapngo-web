import tw from 'twin.macro';

import { ButtonFilled } from '~/components/buttons';

export default {
  component: ButtonFilled,
  title: 'Components/Buttons',
  argTypes: {
    disabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
  },
};

const Template = arg => (
  <Wrapper>
    <ButtonFilled text={'large'} primary="large" width={96} {...arg} />
    <ButtonFilled text={'medium'} primary="medium" width={96} {...arg} />
  </Wrapper>
);

const Wrapper = tw.div`
  flex flex-col gap-10
`;

export const Default = Template.bind({});
