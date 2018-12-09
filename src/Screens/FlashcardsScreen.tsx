import glamorous from "glamorous-native";
import React from "react";
import { Alert, Dimensions, ScrollView, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import FlipCard from "react-native-flip-card";
import { NavigationScreenProp } from "react-navigation";

import WordSource, { Word } from "@src/Content/Source";
import { COLORS } from "@src/Styles/Colors";
import { knuthShuffle } from "@src/utils";

/** ========================================================================
 * Types
 * =========================================================================
 */

interface IProps {
  navigation: NavigationScreenProp<{}>;
}

interface IState {
  completed: number;
  cards: ReadonlyArray<Word>;
}

export const { width, height } = Dimensions.get("window");

/** ========================================================================
 * React Class
 * =========================================================================
 */

class FlashcardsScreen extends React.Component<IProps, IState> {
  swiper: any = null;

  constructor(props: IProps) {
    super(props);

    this.state = {
      completed: 0,
      cards: knuthShuffle(WordSource),
    };
  }

  render(): JSX.Element {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Swiper
          marginTop={32}
          animateCardOpacity
          verticalSwipe={false}
          cardVerticalMargin={0}
          cardHorizontalMargin={0}
          cards={this.state.cards}
          renderCard={this.renderCard}
          onSwiped={this.handleSwipe}
          onSwipedAll={this.handleFinish}
          ref={this.handleAssignSwiperRef}
          backgroundColor={COLORS.lightWhite}
          animateOverlayLabelsOpacity
        />
        <ProgressText>
          Progress: {this.state.completed} flashcards completed (
          {this.state.cards.length} total)
        </ProgressText>
      </View>
    );
  }

  renderCard = (card: Word) => {
    return card ? (
      <ScrollView>
        <FlipCard
          style={FlipCardStyles}
          perspective={1000}
          flipHorizontal={true}
          flipVertical={false}
        >
          <FlipSideView>
            <FaceText>{card.mandarin}</FaceText>
          </FlipSideView>
          <FlipSideView>
            <BackText>{card.pinyin}</BackText>
            <BackText style={{ fontSize: 22, marginTop: 18 }}>
              "{card.english}"
            </BackText>
          </FlipSideView>
        </FlipCard>
      </ScrollView>
    ) : null;
  };

  randomizeDeck = () => {
    this.setState({
      cards: knuthShuffle(WordSource),
    });
  };

  handleSwipe = () => {
    this.setState(prevState => ({
      completed: prevState.completed + 1,
    }));
  };

  handleAssignSwiperRef = (swiper: any) => {
    this.swiper = swiper;
  };

  handleFinish = () => {
    Alert.alert(
      "You finished all the flashcards!!! 🎉",
      "The deck will be shuffled and restarted now.",
      [
        {
          text: "OK!",
          onPress: this.randomizeDeck,
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

const FlipCardStyles = {
  backgroundColor: "white",
  alignItems: "center",
  shadowOpacity: 0.5,
  shadowOffset: {
    height: 12,
    width: 12,
  },
  elevation: 12,
  width: width - 20,
  height: height - 200,
  marginTop: 5,
  marginLeft: 10,
  marginRight: 10,
  borderWidth: 0,
};

const FlipSideView = glamorous.view({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});

const FaceText = glamorous.text({
  fontSize: 75,
  textAlign: "center",
  width: width - 40,
  color: COLORS.primaryRed,
});

const BackText = glamorous.text({
  fontSize: 32,
  textAlign: "center",
  width: width - 40,
  color: COLORS.primaryBlue,
});

const ProgressText = glamorous.text({
  position: "absolute",
  left: 5,
  top: 5,
  fontSize: 10,
});

/** ========================================================================
 * Types
 * =========================================================================
 */

export default FlashcardsScreen;