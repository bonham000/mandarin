import glamorous from "glamorous-native";
import React from "react";
import { ScrollView, TextStyle } from "react-native";
import { Text } from "react-native-paper";
import { NavigationScreenProp } from "react-navigation";

import {
  Lesson,
  LessonScreenParams,
  LessonSummaryType,
  Word,
} from "@src/api/types";
import {
  GlobalStateProps,
  withGlobalState,
} from "@src/components/GlobalStateProvider";
import { CHINESE_NUMBER_MAP } from "@src/constants/Characters";
import { COLORS } from "@src/constants/Colors";
import { ROUTE_NAMES } from "@src/constants/Routes";
import {
  getFinalUnlockedLesson,
  getGameModeLessonSet,
  getReviewLessonSet,
} from "@src/tools/utils";

/** ========================================================================
 * Types
 * =========================================================================
 */

interface IProps extends GlobalStateProps {
  navigation: NavigationScreenProp<{}>;
}

/** ========================================================================
 * React Class
 * =========================================================================
 */

class HomeScreen extends React.Component<IProps, {}> {
  render(): JSX.Element {
    const { lessons, userScoreStatus } = this.props;
    const unlockedLessonIndex = getFinalUnlockedLesson(userScoreStatus);
    return (
      <Container>
        <Text style={TextStyles}>Choose a lesson to start studying</Text>
        {this.renderLessons()}
        <LineBreak />
        <ReviewLink
          onPress={this.openLessonSummary(
            getGameModeLessonSet(lessons, unlockedLessonIndex),
            0,
            "GAME",
          )}
        >
          <Text style={{ fontWeight: "600" }}>Game Mode!</Text>
          <Text>🎲</Text>
        </ReviewLink>
        <ReviewLink
          onPress={this.openLessonSummary(
            getReviewLessonSet(lessons, unlockedLessonIndex),
            0,
            "SUMMARY",
          )}
        >
          <Text style={{ fontWeight: "600" }}>Review All Unlocked Content</Text>
          <Text>📚</Text>
        </ReviewLink>
      </Container>
    );
  }

  renderLessons = () => {
    const { lessons, userScoreStatus } = this.props;
    const unlockedLessonIndex = getFinalUnlockedLesson(userScoreStatus);
    return lessons.map((lesson, index) => {
      const isLocked = index > unlockedLessonIndex;
      return (
        <LessonBlock
          style={{
            backgroundColor: isLocked
              ? COLORS.lockedLessonBlock
              : COLORS.lessonBlock,
          }}
          onPress={this.handleSelectLesson(lesson, index, isLocked)}
        >
          <LessonBlockText isLocked={isLocked}>
            lesson {index + 1}
          </LessonBlockText>
          <Text style={{ color: isLocked ? COLORS.inactive : COLORS.dark }}>
            {CHINESE_NUMBER_MAP[index + 1]}
          </Text>
        </LessonBlock>
      );
    });
  };

  handleSelectLesson = (
    lesson: Lesson,
    index: number,
    isLocked: boolean,
  ) => () => {
    if (isLocked) {
      this.props.setToastMessage("Please complete the previous lesson first");
    } else {
      this.openLessonSummary(lesson, index)();
    }
  };

  openLessonSummary = (
    lesson: ReadonlyArray<Word>,
    index: number,
    type: LessonSummaryType = "LESSON",
  ) => () => {
    const params: LessonScreenParams = {
      type,
      lesson,
      lessonIndex: index,
    };
    this.props.navigation.navigate(ROUTE_NAMES.LESSON_SUMMARY, params);
  };
}

/** ========================================================================
 * Helpers & Styles
 * =========================================================================
 */

const Container = (props: { children: any }) => (
  <ScrollView
    contentContainerStyle={{
      flexGrow: 1,
      width: "100%",
      paddingTop: 25,
      paddingBottom: 150,
      alignItems: "center",
    }}
  >
    {props.children}
  </ScrollView>
);

const LessonBlock = glamorous.touchableOpacity({
  width: "90%",
  height: 50,
  padding: 12,
  margin: 4,
  borderRadius: 5,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "rgb(225,225,225)",
});

const ReviewLink = glamorous.touchableOpacity({
  width: "90%",
  height: 50,
  padding: 12,
  margin: 4,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: COLORS.actionButtonMint,
});

const TextStyles = {
  fontSize: 16,
  width: "88%",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 16,
};

const LineBreak = glamorous.view({
  width: "85%",
  height: 1,
  marginTop: 16,
  marginBottom: 16,
  backgroundColor: COLORS.line,
});

const LessonBlockText = glamorous.text(
  {},
  (props: { isLocked: boolean }) =>
    (props.isLocked
      ? {
          color: COLORS.inactive,
          fontWeight: "500",
          textDecorationStyle: "solid",
        }
      : {
          color: "black",
          fontWeight: "500",
          textDecorationLine: "normal",
        }) as TextStyle,
);

/** ========================================================================
 * Export
 * =========================================================================
 */

export default withGlobalState(HomeScreen);
