import { HTMLAttributes } from 'react';
import { styled } from '@mui/material';

const Button = styled('button')`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  cursor: pointer;
  text-decoration: none;
  display: inline;
`;

export type InlineActionProps = HTMLAttributes<HTMLButtonElement>;

export const InlineAction = (props: InlineActionProps) => (
  <Button {...props} />
);
