import React from "react";
import { StargazerRouteConfigObject } from "react-native-stargazer";
import { NavigationScreenProp } from "react-navigation";

import { ROUTE_NAMES } from "@src/constants/RouteNames";
import { QUIZ_TYPE } from "@src/providers/GlobalStateContext";
import AboutDetailScreenComponent from "@src/screens/AboutDetailScreen";
import AboutScreenComponent from "@src/screens/AboutScreen";
import { AccountScreenComponent } from "@src/screens/AccountScreen";
import { AudioReviewAllScreen } from "@src/screens/AudioReviewAllScreen";
import { ContactScreenComponent } from "@src/screens/ContactScreen";
import { FlashcardsScreenComponent } from "@src/screens/FlashcardsScreen";
import { HomeScreenComponent } from "@src/screens/HomeScreen";
import IntroScreenComponent from "@src/screens/IntroScreen";
import { LessonSummaryScreenComponent } from "@src/screens/LessonSummaryScreen";
import { ListSummaryScreenComponent } from "@src/screens/ListSummaryScreen";
import { NotePadScreen } from "@src/screens/NotePadScreen";
import { QuizScreenComponent } from "@src/screens/QuizScreen";
import { SettingsScreenComponent } from "@src/screens/SettingsScreen";
import { TranslationScreenComponent } from "@src/screens/TranslationScreen";
import { ViewAllScreenComponent } from "@src/screens/ViewAllScreen";
import { WelcomeScreenComponent } from "@src/screens/WelcomeScreen";
import { LessonScreenParams, ListScreenParams } from "@src/tools/types";
import MOCKS from "@tests/mocks";

/** ========================================================================
 * Stargazer Route Config
 * =========================================================================
 */

interface StargazerRouteProps<Params = {}> {
  navigation: NavigationScreenProp<{}, Params>;
  screenProps: {
    viewRef: any;
    captureImage: (photoData: any, finalScreen?: boolean) => Promise<void>;
  };
}

const stargazerConfig: ReadonlyArray<StargazerRouteConfigObject> = [
  {
    name: "Home Screen",
    screenName: ROUTE_NAMES.HOME,
    screen: (props: StargazerRouteProps) => (
      <HomeScreenComponent
        navigation={props.navigation}
        {...MOCKS.GLOBAL_STATE_PROPS}
      />
    ),
    paramsForNextScreen: MOCKS.LIST_SCREEN_PARAMS,
  },
  {
    name: "List Summary Screen",
    screenName: ROUTE_NAMES.LIST_SUMMARY,
    screen: (props: StargazerRouteProps<ListScreenParams>) => (
      <ListSummaryScreenComponent
        navigation={props.navigation}
        {...MOCKS.GLOBAL_STATE_PROPS}
        {...MOCKS.SOUND_RECORDING_PROPS}
      />
    ),
    paramsForNextScreen: MOCKS.LESSON_SCREEN_PARAMS,
  },
  {
    name: "Lesson Summary Screen",
    screenName: ROUTE_NAMES.LESSON_SUMMARY,
    screen: (props: StargazerRouteProps<LessonScreenParams>) => (
      <LessonSummaryScreenComponent
        navigation={props.navigation}
        {...MOCKS.GLOBAL_STATE_PROPS}
        {...MOCKS.SOUND_RECORDING_PROPS}
      />
    ),
    paramsForNextScreen: MOCKS.LESSON_SCREEN_PARAMS,
  },
  {
    name: "English Multiple Choice",
    screenName: ROUTE_NAMES.MULTIPLE_CHOICE_ENGLISH,
    screen: (props: StargazerRouteProps<LessonScreenParams>) => (
      <QuizScreenComponent
        navigation={props.navigation}
        quizType={QUIZ_TYPE.ENGLISH}
        {...MOCKS.GLOBAL_STATE_PROPS}
        {...MOCKS.SOUND_RECORDING_PROPS}
      />
    ),
    paramsForNextScreen: MOCKS.LESSON_SCREEN_PARAMS,
  },
  {
    name: "Chinese Multiple Choice",
    screenName: ROUTE_NAMES.MULTIPLE_CHOICE_MANDARIN,
    screen: (props: StargazerRouteProps<LessonScreenParams>) => (
      <QuizScreenComponent
        navigation={props.navigation}
        quizType={QUIZ_TYPE.MANDARIN}
        {...MOCKS.GLOBAL_STATE_PROPS}
        {...MOCKS.SOUND_RECORDING_PROPS}
      />
    ),
    paramsForNextScreen: MOCKS.LESSON_SCREEN_PARAMS,
  },
  {
    name: "Audio Multiple Choice",
    screenName: ROUTE_NAMES.MULTIPLE_CHOICE_VOICE,
    screen: (props: StargazerRouteProps<LessonScreenParams>) => (
      <QuizScreenComponent
        navigation={props.navigation}
        quizType={QUIZ_TYPE.PRONUNCIATION}
        {...MOCKS.GLOBAL_STATE_PROPS}
        {...MOCKS.SOUND_RECORDING_PROPS}
      />
    ),
    paramsForNextScreen: MOCKS.LESSON_SCREEN_PARAMS,
  },
  {
    name: "Characters Quiz",
    screenName: ROUTE_NAMES.QUIZ,
    screen: (props: StargazerRouteProps<LessonScreenParams>) => (
      <QuizScreenComponent
        navigation={props.navigation}
        quizType={QUIZ_TYPE.QUIZ_TEXT}
        {...MOCKS.GLOBAL_STATE_PROPS}
        {...MOCKS.SOUND_RECORDING_PROPS}
      />
    ),
    paramsForNextScreen: MOCKS.LESSON_SCREEN_PARAMS,
  },
  {
    name: "Daily Quiz Challenge",
    screenName: ROUTE_NAMES.DAILY_CHALLENGE,
    screen: (props: StargazerRouteProps<LessonScreenParams>) => (
      <QuizScreenComponent
        navigation={props.navigation}
        quizType={QUIZ_TYPE.QUIZ_TEXT}
        {...MOCKS.GLOBAL_STATE_PROPS}
        {...MOCKS.SOUND_RECORDING_PROPS}
      />
    ),
    paramsForNextScreen: MOCKS.LESSON_SCREEN_PARAMS,
  },
  {
    name: "HSK Quiz Challenge",
    screenName: ROUTE_NAMES.HSK_TEST_OUT,
    screen: (props: StargazerRouteProps<LessonScreenParams>) => (
      <QuizScreenComponent
        navigation={props.navigation}
        quizType={QUIZ_TYPE.QUIZ_TEXT}
        {...MOCKS.GLOBAL_STATE_PROPS}
        {...MOCKS.SOUND_RECORDING_PROPS}
      />
    ),
    paramsForNextScreen: MOCKS.LESSON_SCREEN_PARAMS,
  },
  {
    name: "Audio Quiz Screen",
    screenName: ROUTE_NAMES.AUDIO_REVIEW_QUIZ,
    screen: (props: StargazerRouteProps<LessonScreenParams>) => (
      <AudioReviewAllScreen
        navigation={props.navigation}
        {...MOCKS.GLOBAL_STATE_PROPS}
        {...MOCKS.SOUND_RECORDING_PROPS}
      />
    ),
  },
  {
    name: "Flashcards Screen",
    screenName: ROUTE_NAMES.FLASHCARDS,
    screen: (props: StargazerRouteProps<LessonScreenParams>) => (
      <FlashcardsScreenComponent
        navigation={props.navigation}
        {...MOCKS.GLOBAL_STATE_PROPS}
      />
    ),
    paramsForNextScreen: MOCKS.LESSON_SCREEN_PARAMS,
  },
  {
    name: "View All Screen",
    screenName: ROUTE_NAMES.VIEW_ALL,
    screen: (props: StargazerRouteProps<LessonScreenParams>) => (
      <ViewAllScreenComponent
        navigation={props.navigation}
        {...MOCKS.GLOBAL_STATE_PROPS}
        {...MOCKS.SOUND_RECORDING_PROPS}
      />
    ),
  },
  {
    name: "Translation Screen",
    screenName: ROUTE_NAMES.TRANSLATION,
    screen: (props: StargazerRouteProps) => (
      <TranslationScreenComponent
        navigation={props.navigation}
        {...MOCKS.GLOBAL_STATE_PROPS}
      />
    ),
  },
  {
    name: "Note Pad Screen",
    screenName: ROUTE_NAMES.NOTE_PAD,
    screen: (props: StargazerRouteProps) => (
      <NotePadScreen
        navigation={props.navigation}
        {...MOCKS.GLOBAL_STATE_PROPS}
      />
    ),
  },
  {
    name: "Settings Screen",
    screenName: ROUTE_NAMES.SETTINGS,
    screen: (props: StargazerRouteProps) => (
      <SettingsScreenComponent
        navigation={props.navigation}
        {...MOCKS.GLOBAL_STATE_PROPS}
      />
    ),
  },
  {
    name: "Account Screen",
    screenName: ROUTE_NAMES.ACCOUNT,
    screen: (props: StargazerRouteProps) => (
      <AccountScreenComponent
        navigation={props.navigation}
        {...MOCKS.GLOBAL_STATE_PROPS}
      />
    ),
  },
  {
    name: "Welcome Screen",
    screenName: ROUTE_NAMES.WELCOME,
    screen: (props: StargazerRouteProps) => (
      <WelcomeScreenComponent
        navigation={props.navigation}
        {...MOCKS.GLOBAL_STATE_PROPS}
      />
    ),
  },
  {
    name: "Intro Screen",
    screenName: ROUTE_NAMES.INTRO,
    screen: (props: StargazerRouteProps) => (
      <IntroScreenComponent navigation={props.navigation} />
    ),
  },
  {
    name: "About Screen",
    screenName: ROUTE_NAMES.ABOUT,
    screen: (props: StargazerRouteProps) => (
      <AboutScreenComponent navigation={props.navigation} />
    ),
  },
  {
    name: "About Detail Screen",
    screenName: ROUTE_NAMES.ABOUT_DETAIL,
    screen: (props: StargazerRouteProps) => (
      <AboutDetailScreenComponent navigation={props.navigation} />
    ),
  },
  {
    name: "Contact Screen",
    screenName: ROUTE_NAMES.CONTACT,
    screen: (props: StargazerRouteProps) => (
      <ContactScreenComponent
        navigation={props.navigation}
        {...MOCKS.GLOBAL_STATE_PROPS}
      />
    ),
  },
];

/** ========================================================================
 * Export
 * =========================================================================
 */

export default stargazerConfig;
