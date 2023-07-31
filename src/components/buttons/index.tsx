import lottie from 'lottie-web';
import { ButtonHTMLAttributes, useEffect, useRef } from 'react';
import tw, { css, styled } from 'twin.macro';

import loading from '~/assets/lottie/loading-dot.json';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  width?: number;
  height?: number;
  isLoading?: boolean;
  disabled?: boolean;
  primary: 'large' | 'medium';
}
export const ButtonFilled = ({ text, isLoading, disabled, primary, ...rest }: Props) => {
  const warpperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!warpperRef.current || !isLoading) return;
    lottie.loadAnimation({
      container: warpperRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loading,
    });

    return () => {
      lottie.destroy();
    };
  }, [warpperRef, isLoading]);

  return (
    <Wrapper primary={primary} isLoading={isLoading} disabled={disabled} {...rest}>
      <TextWrapper primary={primary} isLoading={isLoading} disabled={disabled}>
        {text}
      </TextWrapper>
      <LottieWrapper ref={warpperRef} />
    </Wrapper>
  );
};

interface LoadingProps {
  isLoading?: boolean;
  disabled?: boolean;
  width?: number;
  height?: number;
  primary: 'large' | 'medium';
}
const Wrapper = styled.button<LoadingProps>(({ primary, isLoading, width, height = 48 }) => [
  tw`
    flex-center relative
    rounded-8 bg-green clickable
    hover:bg-darkGreen
    disabled:(bg-gray2 non-clickable hover:(bg-gray2)) 
  `,
  css`
    width: ${width}px;
    height: ${height}px;
  `,
  primary === 'large' && tw`py-16 px-24 h-56`,
  primary === 'medium' && tw`py-9 px-20 h-38`,
  isLoading && tw`text-transparent non-clickable bg-gray2`,
]);

const TextWrapper = styled.div<LoadingProps>(({ isLoading, disabled }) => [
  tw`
    font-sb-16 text-black
  `,
  disabled && tw`text-gray4`,
  isLoading && tw`opacity-0`,
]);
const LottieWrapper = tw.div`
  w-full h-full flex-center absolute absolute-center
`;
