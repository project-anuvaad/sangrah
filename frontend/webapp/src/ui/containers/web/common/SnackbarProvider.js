import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <React.StrictMode>
      <SnackbarProvider>
          <App/>
      </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);