import { AsyncStorage } from "react-native";

import { getLessonSet } from "@src/content/index.ts";
import { LessonScoreType, ScoreStatus } from "@src/GlobalContext";
import { randomInRange } from "@src/tools/utils";
import { Lesson, LessonSummaryType } from "./types";

const STORE_KEY = "SCORES";
const EXPERIENCE_KEY = "EXPERIENCE";

const LESSON_SET = getLessonSet("Mandarin");

export const getExistingUserScoresAsync = async () => {
  try {
    const result = await AsyncStorage.getItem(STORE_KEY);
    let parsedResult = JSON.parse(result);

    if (!parsedResult) {
      throw new Error("Data uninitialized");
    } else {
      if (parsedResult.length < LESSON_SET.length) {
        parsedResult = parsedResult.concat(
          new Array(LESSON_SET.length - parsedResult.length)
            .fill("")
            .map(fillLesson),
        );
      }
    }

    return parsedResult;
  } catch (err) {
    return initialLessonScoreState;
  }
};

export const saveProgressToAsyncStorage = async (
  userScoreStatus: ScoreStatus,
) => {
  try {
    AsyncStorage.setItem(STORE_KEY, JSON.stringify(userScoreStatus));
  } catch (err) {
    return;
  }
};

export const resetUserScoresAsync = async () => {
  try {
    AsyncStorage.setItem(STORE_KEY, JSON.stringify(initialLessonScoreState));
  } catch (err) {
    return;
  }
};

export const getUserExperience = async (): Promise<number> => {
  try {
    const result = await AsyncStorage.getItem(EXPERIENCE_KEY);
    const parsedResult = JSON.parse(result);
    return parsedResult || 0;
  } catch (err) {
    return 0;
  }
};

export const addExperiencePoints = async (
  quizType: LessonScoreType,
  lessonType: LessonSummaryType,
): Promise<number | undefined> => {
  try {
    const existingExp = await getUserExperience();
    const MAX = quizType === "q" ? 1250 : 750;
    const OFFSET = lessonType === "LESSON" ? 500 : 0;
    const additionalExp = randomInRange(500, MAX - OFFSET);
    const newExp = existingExp + additionalExp;
    await AsyncStorage.setItem(EXPERIENCE_KEY, JSON.stringify(newExp));
    return newExp;
  } catch (err) {
    return;
  }
};

const fillLesson = (item: Lesson) => ({
  mc: false,
  q: false,
});

export const initialLessonScoreState: ScoreStatus = LESSON_SET.map(fillLesson);
