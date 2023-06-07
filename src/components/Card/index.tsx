import React from 'react';

import { Card as MuiCard } from '@mui/material';

type CardProps = React.ComponentProps<typeof MuiCard> & {
  title: string;
};

/**
 * Card com Props mescladas
 * @param props Props do MUI Card e novas propriedades
 * @returns JSX.Element
 */
export const Card = (props: CardProps) => <Card {...props} />;
