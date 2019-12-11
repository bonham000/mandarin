import React, { ComponentType } from "react";

import EVENTS from "@src/constants/AnalyticsEvents";
import { ListScoreSet } from "@src/lessons";
import GlobalStateContextValues, {
  APP_DIFFICULTY_SETTING,
  APP_LANGUAGE_SETTING,
  UserSettings,
  WordDictionary,
} from "@src/providers/GlobalStateContext";
import { HSKListSet, User } from "@src/tools/types";

/** ========================================================================
 * Types
 * =========================================================================
 */

export interface GlobalStateValues {
  user?: User;
  lessons: HSKListSet;
  updateAvailable: boolean;
  wordDictionary: WordDictionary;
}

export interface AdditionalProviderProps {
  experience: number;
  userScoreStatus: ListScoreSet;
  disableAudio: boolean;
  autoProceedQuestion: boolean;
  languageSetting: APP_LANGUAGE_SETTING;
  appDifficultySetting: APP_DIFFICULTY_SETTING;
}

export interface GlobalStateContextProps
  extends GlobalStateValues,
    AdditionalProviderProps {
  setToastMessage: (toastMessage: string) => void;
  handleUpdateApp: () => void;
  handleResetScores: () => void;
  handleSwitchLanguage: () => void;
  updateExperiencePoints: (experiencePoints: number) => void;
  setLessonScore: (
    updatedScoreStatus: ListScoreSet,
    exp: number,
  ) => Promise<void>;
  copyToClipboard: (text: string) => void;
  handleUpdateUserSettingsField: (
    data: Partial<UserSettings>,
    optionalSuccessCallback?: (args?: any) => any,
  ) => void;
  logAnalyticsEvent: (event: EVENTS) => void;
  handleSendContactEmail: (
    contactEmail: string,
    message: string,
    successCallback?: () => void,
  ) => void;
}

interface IProps {
  Component: ComponentType<any>;
}

/** ========================================================================
 * React Class
 * =========================================================================
 */

class GlobalStateProvider extends React.Component<IProps, {}> {
  render(): JSX.Element | null {
    const { Component, ...rest } = this.props;

    return (
      <GlobalStateContextValues.Consumer>
        {value => <Component {...rest} {...value} />}
      </GlobalStateContextValues.Consumer>
    );
  }
}

const withGlobalStateContext = (component: ComponentType<any>) => {
  return (props: any) => (
    <GlobalStateProvider {...props} Component={component} />
  );
};

/** ========================================================================
 * Export
 * =========================================================================
 */

export { withGlobalStateContext };

export default GlobalStateProvider;
