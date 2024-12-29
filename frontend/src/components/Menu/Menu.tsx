import { Box } from '@gravity-ui/uikit';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Icon } from '../Icon/Icon';
import { CloudIcon } from './MenuIcons/CloudIcon';
import { CommunityIcon } from './MenuIcons/Community';
import { SettingsIcon } from './MenuIcons/Settings';
import { Root } from './styles/Root';

const iconsArray = [
  { data: CommunityIcon, index: 0, path: '/' },
  { data: SettingsIcon, index: 1, path: '/upload' },
  { data: CloudIcon, index: 2, path: '/cloud' },
];

const defaultActiveIndex: Record<string, number> = {
  '/': 0,
  '/upload': 1,
  '/cloud': 2,
};

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIconClick = (index: number) => {
    const handleIcon: Record<number, () => void> = {
      0: handleCommunityClick,
      1: handleSettingsClick,
      2: handleCloudClick,
    };

    handleIcon[index]();
    setActiveIndex(index);
  };

  const handleCommunityClick = () => {
    navigate('/');
    setIsOpen(false);
  };

  const handleSettingsClick = () => {
    navigate('/upload');

    setIsOpen(false);
  };

  const handleCloudClick = () => {
    navigate('/cloud');
    setIsOpen(false);
  };

  useEffect(() => {
    setActiveIndex(defaultActiveIndex[location.pathname]);
  }, [location.pathname]);

  return (
    <Root isOpen={isOpen}>
      {!isOpen && (
        <Box onClick={() => setIsOpen(true)}>
          <Icon data={iconsArray[activeIndex].data} isOpen={isOpen} index={activeIndex} />
        </Box>
      )}
      {isOpen &&
        iconsArray.map(({ data, index }) => (
          <Box key={index} onClick={() => handleIconClick(index)}>
            <Icon data={data} isOpen={isOpen} index={index} />
          </Box>
        ))}
    </Root>
  );
};

export default Menu;
