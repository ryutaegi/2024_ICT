import styled, { css } from 'styled-components';
import UserContext from '../contexts/users';
import { useContext, useState } from 'react';

const ToggleContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233, 233, 234);
    transition: background-color 0.5s;
  }

  .toggle--checked {
    background-color: rgb(50, 50, 50);
  }

  .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: left 0.5s;
  }

  .toggle-circle.toggle--checked {
    left: 27px;
  }
`;

const DarkToggle = () => {
  const [user, setUser] = useContext(UserContext);
  const toggleHandler = () => {
    setUser((prevUser) => ({ ...prevUser, dark: !user.dark }));
  };
  return (
    <ToggleContainer onClick={toggleHandler}>
      <div className={`toggle-container ${user.dark ? 'toggle--checked' : ''}`} />
      <div className={`toggle-circle ${user.dark ? 'toggle--checked' : ''}`} />
    </ToggleContainer>
  );
};

export default DarkToggle;

