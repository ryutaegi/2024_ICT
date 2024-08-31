import styled, { css } from 'styled-components';
import UserContext from '../contexts/users';
import { useContext, useState } from 'react';

const ToggleContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  .toggle-container {
    width: 24px;
    height: 50px;
    border-radius: 30px;
    background-color: ${props=>props.colors};
    transition: background-color 0.5s;
  }

  .toggle--checked {
    background-color: rgb(240, 240, 240);
  }

  .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: top 0.5s;
  }

  .toggle-circle.toggle--checked {
    top: 27px;
  }
`;

const HorizontalToggle = ({colors}) => {
  const [user, setUser] = useContext(UserContext);
  const [tf, setTf] = useState(true);
  const ToggleClick = () => {
	setTf(!tf);
  }
	return (
    <ToggleContainer colors={colors} onClick={ToggleClick}>
      <div className={`toggle-container ${tf ? 'toggle--checked' : ''}`} />
      <div className={`toggle-circle ${tf ? 'toggle--checked' : ''}`} />
    </ToggleContainer>
  );
};

export default HorizontalToggle;

