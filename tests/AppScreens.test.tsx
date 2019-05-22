import React from "react";
import renderer from "react-test-renderer";

import { MockLessonScreenParams, MockListScreenParams } from "./data";
import stargazerConfig from "./StargazerRouteConfig";

// @ts-ignore — for someone reason Jest throws an error React is not defined?
global.React = React; // tslint:disable-line

/**
 * Catch all mock navigation params.
 */
const params = {
  ...MockLessonScreenParams,
  ...MockListScreenParams,
};

/**
 * Mock screen props.
 */
const mockProps = {
  navigation: {
    getParam: (key: string) => {
      // @ts-ignore
      return params[key];
    },
  },
};

/**
 * Helper to render and snapshot a component.
 */
const snapshotScreenComponent = (
  screenName: string,
  screenFunction: (props: object) => JSX.Element,
) => {
  const tree = renderer.create(screenFunction(mockProps)).toJSON();
  expect(tree).toMatchSnapshot(screenName);
};

describe("App Screen Components", () => {
  test("Each screen component renders with props provided", () => {
    for (const config of stargazerConfig) {
      const { name, screen } = config;
      snapshotScreenComponent(name, screen);
    }
  });
});
