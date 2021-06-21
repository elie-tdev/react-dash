import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { render } from '@testing-library/react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { MockedProvider } from '@apollo/client/testing';

import { MenuContextProvider } from '@/contexts';
import i18n from '@/translations';
import { LightTheme } from '@/themes';

const wrapper = ({ mocks = [], menuContextProviderProps = {} }) => {
  const Wrapper = ({ children }) => {
    return (
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ThemeProvider theme={LightTheme}>
            <MenuContextProvider {...menuContextProviderProps}>
              <CssBaseline />
              <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
            </MenuContextProvider>
          </ThemeProvider>
        </MockedProvider>
      </Router>
    );
  };

  return Wrapper;
};

const customRender = (ui, { mocks, menuContextProviderProps, ...restOptions } = {}) =>
  render(ui, { wrapper: wrapper({ mocks, menuContextProviderProps }), ...restOptions });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
