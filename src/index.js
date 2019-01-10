import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import { defaults, resolvers } from './state';
import { themeHandler } from './theme';
import { ThemeProvider } from 'styled-components';
import { GET_THEME } from './queries';
import 'semantic-ui-css/semantic.min.css';
import App from './app/layout/App';
import { configureStore } from './app/store/configureStore';
import ScrollToTop from './app/common/util/scroll-to-top';

const store = configureStore();

const rootEl = document.getElementById('root');

// Set up the apollo-client to point at the server
const client = new ApolloClient({
  clientState: {
    defaults,
    resolvers
  }
});

let render = () => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Query query={GET_THEME}>
          {({ data }) => {
            return (
              <ThemeProvider theme={themeHandler(data.theme)}>
                <BrowserRouter>
                  <ScrollToTop>
                    <App />
                  </ScrollToTop>
                </BrowserRouter>
              </ThemeProvider>
            );
          }}
        </Query>
      </Provider>
    </ApolloProvider>,
    rootEl
  );
};

// hot reloading for production [REMOVE] when dist
if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render);
  });
}

render();
