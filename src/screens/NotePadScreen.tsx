import glamorous from "glamorous-native";
import React from "react";
import { Alert, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { NavigationScreenProp } from "react-navigation";

import { Button, ScrollContainer } from "@src/components/SharedComponents";
import { COLORS } from "@src/constants/Theme";
import {
  GlobalStateContextProps,
  withGlobalStateContext,
} from "@src/providers/GlobalStateProvider";
import {
  getWordStudyList,
  setWordStudyList,
  WordStudyList,
} from "@src/tools/async-store";

/** ========================================================================
 * Types
 * =========================================================================
 */

interface IProps extends GlobalStateContextProps {
  navigation: NavigationScreenProp<{}>;
}

interface IState {
  value: string;
  loading: boolean;
  initialized: boolean;
  wordList: WordStudyList;
}

/** ========================================================================
 * React Class
 * =========================================================================
 */

export class NotePadScreen extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: "",
      wordList: [],
      loading: false,
      initialized: false,
    };
  }

  async componentDidMount(): Promise<void> {
    const wordList = await getWordStudyList();
    this.setState({ wordList, initialized: true });
  }

  render(): JSX.Element {
    const { initialized, wordList } = this.state;
    return (
      <ScrollContainer>
        <SectionTitle>Words to Study</SectionTitle>
        <InfoText>Add words here to study later</InfoText>
        <TextInput
          mode="outlined"
          label="Add a new word"
          style={TextInputStyles}
          value={this.state.value}
          onChangeText={(value: string) => this.setState({ value })}
        />
        <Button
          onPress={this.handleAddWord}
          style={{ marginTop: 15, marginBottom: 15 }}
        >
          Add Word
        </Button>
        <LineBreak />
        {initialized ? (
          wordList.length ? (
            <React.Fragment>
              {this.state.wordList.map((word, index) => {
                return <InfoText key={`${word}-${index}`}>{word}</InfoText>;
              })}
              <Button
                onPress={this.handleClearList}
                style={{
                  marginTop: 15,
                  marginBottom: 15,
                  backgroundColor: COLORS.actionButtonRed,
                }}
              >
                Remove All
              </Button>
            </React.Fragment>
          ) : (
            <InfoText>No words exist yet</InfoText>
          )
        ) : null}
      </ScrollContainer>
    );
  }

  handleAddWord = async () => {
    const { value, loading } = this.state;

    if (loading || !value) {
      return;
    }

    this.setState(
      {
        loading: true,
      },
      async () => {
        const list = await getWordStudyList();
        const newList: ReadonlyArray<string> = [...list, value];
        await setWordStudyList(newList);
        this.setState({ loading: false, wordList: newList });
      },
    );
  };

  handleClearList = () => {
    Alert.alert(
      "Are you sure?",
      "This will clear the word list.",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => null,
        },
        {
          text: "OK",
          onPress: async () => {
            await setWordStudyList([]);
            this.setState({ wordList: [] });
            this.props.setToastMessage("List cleared!");
          },
        },
      ],
      { cancelable: false },
    );
  };
}

/** ========================================================================
 * Helpers & Styles
 * =========================================================================
 */

const SectionTitle = glamorous.text({
  fontSize: 22,
  fontWeight: "bold",
  marginTop: 5,
  marginBottom: 5,
});

const LineBreak = glamorous.view({
  width: "85%",
  marginTop: 12,
  marginBottom: 12,
  backgroundColor: "black",
  height: StyleSheet.hairlineWidth,
});

const TextInputStyles = {
  width: "90%",
  fontSize: 34,
  marginTop: 6,
  backgroundColor: "rgb(231,237,240)",
};

const InfoText = glamorous.text({
  marginTop: 5,
  marginBottom: 5,
  width: "80%",
  textAlign: "center",
});

/** ========================================================================
 * Export
 * =========================================================================
 */

export default withGlobalStateContext(NotePadScreen);
