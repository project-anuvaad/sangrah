import React, { Component } from "react";
import { Provider } from "react-redux";
import storeFactory from "./src/flux/store/store";
import AppRoutes from './src/mobile.routes';
import ClearCache from 'react-clear-cache';

export default class App extends Component {
  render() {
    return (
      <div>
        <ClearCache>
          {({ isLatestVersion, emptyCacheStorage }) => (
            <div>
              {!isLatestVersion && (
                <p>
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      emptyCacheStorage();
                    }}
                  >
                    Update version
                </a>
                </p>
              )}
              <Provider store={storeFactory}>
                <AppRoutes />
              </Provider>
            </div>
          )}
        </ClearCache>

      </div>
    );
  }
}

