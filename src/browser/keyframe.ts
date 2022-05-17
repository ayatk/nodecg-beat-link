import { Keyframes, keyframes } from "@emotion/react"

export const FadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const FadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

export const SlideLeft = (fadeIn: boolean): Keyframes => keyframes`
  from {
    opacity: ${fadeIn ? 0 : 1};
    transform: translateX(${fadeIn ? -100 : 0}%);
  }
  to {
    opacity: ${fadeIn ? 1 : 0};
    transform: translateX(${fadeIn ? 0 : -100}%);
  }
`
