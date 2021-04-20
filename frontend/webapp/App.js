import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";
import storeFactory from "./src/flux/store/store";
import AppRoutes from './src/mobile.routes';
import ClearCache from 'react-clear-cache';
import { withSnackbar } from "notistack";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newVersionAvailable: false,
      waitingWorker: {},
    };
  }

  onServiceWorkerUpdate = (registration) => {
    this.setState({
      waitingWorker: registration && registration.waiting,
      newVersionAvailable: true,
    });
  };

  updateServiceWorker = () => {
    const { waitingWorker } = this.state;
    waitingWorker && waitingWorker.postMessage({ type: "SKIP_WAITING" });
    this.setState({ newVersionAvailable: false });
    window.location.reload();
  };

  refreshAction = (key) => { //render the snackbar button
    return (
      <Fragment>
        <Button
          className="snackbar-button"
          size="small"
          onClick={this.updateServiceWorker}
        >
          {"refresh"}
        </Button>
      </Fragment>
    );
  };


  componentDidMount = () => {
    const { enqueueSnackbar } = this.props;
    const { newVersionAvailable } = this.state;
if (process.env.NODE_ENV === 'production') {
    serviceWorker.register({ onUpdate: this.onServiceWorkerUpdate });
}

    if (newVersionAvailable) //show snackbar with refresh button
      enqueueSnackbar("A new version was released", {
        persist: true,
        variant: "success",
        action: this.refreshAction(),
      });
  };

  render() {
    return (
              <Provider store={storeFactory}>
                <AppRoutes />
              </Provider>
    );
  }
}


export default withSnackbar(App)