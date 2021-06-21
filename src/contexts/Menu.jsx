import { createContext, useState } from 'react';

export const MenuContext = createContext({});
export const MenuContextProvider = ({ children, ...props }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(props.isMenuOpen || false);
  const [routeParams, setRouteParams] = useState(props.routeParams || {});

  return (
    <MenuContext.Provider
      value={{
        actions: {
          setIsMenuOpen,
          setRouteParams,
        },
        state: {
          isMenuOpen,
          routeParams,
        },
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
