import styled, { css } from 'styled-components';

interface LinkStyledProps {
  $variant?: 'button' | 'link';
}

export const LinkStyled = styled.a<LinkStyledProps>`
  text-decoration: none;
  color: #fff;
  white-space: nowrap;

  ${({ $variant = 'link' }) =>
    $variant === 'link'
      ? css`
          opacity: 0.75;

          &:hover {
            opacity: 1;
          }
        `
      : css`
          display: inline-block;
          margin-top: 20px;
          padding: 20px 46px;
          border-radius: 4px;
          text-transform: uppercase;
          font-weight: bold;
          text-align: center;
          background-color: #e07e7b;
          opacity: 1;
          transition: all 400ms;

          &:hover {
            background-color: #ce5856;
          }

          @media (max-width: 800px) {
            padding: 15px 40px;
          }
        `}
`;
