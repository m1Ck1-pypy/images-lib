import { Card, CardType, CardView } from '@gravity-ui/uikit';
import { FC } from 'react';

type Props = {
  children: React.ReactNode;
  type?: CardType | undefined;
  view?: CardView | undefined;
  style?: React.CSSProperties | undefined;
};

const Container: FC<Props> = ({ children, type = 'container', view = 'clear', style }) => {
  return (
    <Card type={type} view={view} style={{ ...style, borderRadius: 0 }}>
      {children}
    </Card>
  );
};

export default Container;
