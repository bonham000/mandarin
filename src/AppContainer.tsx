import React from "react";
import { AppState, BackHandler, View } from "react-native";

import AppContext from "@src/AppContext";
import { CustomToast } from "@src/Components/ToastProvider";
import createAppNavigator from "@src/NavigatorConfig";

/** ========================================================================
 * Types
 * =========================================================================
 */

interface IState {
  appState: string;
  toastMessage: string;
  tryingToCloseApp: boolean;
}

/** ========================================================================
 * React Class
 * =========================================================================
 */

class NotesApp extends React.Component<{}, IState> {
  timeout: any = null;
  navigationRef: any = null;

  constructor(props: {}) {
    super(props);

    this.state = {
      appState: AppState.currentState,
      toastMessage: "",
      tryingToCloseApp: false,
    };
  }

  async componentDidMount(): Promise<void> {
    /**
     * Manage state to assign a toast warning if user tries to
     * press the back button when it will close the app. Show them
     * a toast and allow them to press again to close the app.
     */
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.canCloseApp()) {
        if (!this.state.tryingToCloseApp) {
          this.setState(
            {
              tryingToCloseApp: true,
            },
            () => this.setToastMessage("Press again to close app ✌"),
          );
          return true;
        } else {
          return this.setState(
            {
              tryingToCloseApp: false,
            },
            BackHandler.exitApp,
          );
        }
      }

      return false;
    });
  }

  componentWillUnmount(): void {
    BackHandler.removeEventListener("hardwareBackPress", () => {
      return;
    });

    this.clearTimer();
  }

  render(): JSX.Element | null {
    return (
      <View style={{ flex: 1 }}>
        <AppContext.Provider
          value={{
            setToastMessage: this.setToastMessage,
          }}
        >
          <CustomToast
            close={this.clearToast}
            message={this.state.toastMessage}
          />
          <AppPureComponent assignNavigatorRef={this.assignNavRef} />
        </AppContext.Provider>
      </View>
    );
  }

  assignNavRef = (ref: any) => {
    // @ts-ignore
    this.navigationRef = ref;
  };

  clearTimer = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };

  abortTryingToClose = () => {
    this.setState({ tryingToCloseApp: false });
  };

  setToastMessage = (toastMessage: string): void => {
    this.clearTimer();
    this.setState(
      {
        toastMessage,
      },
      () => {
        this.timeout = setTimeout(() => {
          this.clearToast();
          this.abortTryingToClose();
        }, 2000);
      },
    );
  };

  clearToast = () => {
    this.setState({
      toastMessage: "",
    });
  };

  canCloseApp = () => {
    try {
      return this.navigationRef.state.nav.routes[0].routes.length === 1;
    } catch (_) {
      return true;
    }
  };
}

/** ========================================================================
 * App Component
 * =========================================================================
 */

// tslint:disable-next-line
class AppPureComponent extends React.Component<
  { assignNavigatorRef: (ref: any) => void },
  {}
> {
  shouldComponentUpdate(nextProps: any): boolean {
    return false;
  }

  render(): JSX.Element {
    const AppNavigator = createAppNavigator();
    return <AppNavigator ref={this.props.assignNavigatorRef} />;
  }
}

/** ========================================================================
 * Export
 * =========================================================================
 */

export default NotesApp;