import React, { useState, useContext } from 'react';
import NavContext from './navContext';
const ModalsContext = React.createContext({
  isModalOpen: false,
  //   searchInputChangeHandler: () => {},
});
export const ModalsContextProvider = (props) => {
  const navCtx = useContext(NavContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ModalsContext.Provider
      value={{
        isModalOpen: isModalOpen,
      }}
    >
      {props.children}
    </ModalsContext.Provider>
  );
};

export default ModalsContext;
