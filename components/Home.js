import React, { useState } from "react";
import { Text, View, TextInput, Pressable, Keyboard, ScrollView } from "react-native";
import style from "../Styles/style";
import Footer from "./Footer";
import Header from "./Header";
import { NBR_DICES, NBR_THROWS, Min_Spot, Max_Spot, BonusLimit } from "../constants/Game";



export default Home = ({ navigation }) => {
  const [playerName, setPlayerName] = useState("");
  const [hasPlayerName, setHasPlayerName] = useState("");

  const handlePlayerName = (value) => {
    if (value.trim().length > 0) {
      setHasPlayerName(true);
      Keyboard.dismiss();
    }
  };

  return (
    
     <ScrollView>
     <View style={style.container}>
     <Header/>
        <Text style={style.title}>Home</Text>
        {!hasPlayerName ? (
       <>
        <Text style={[style.text, { alignSelf: "center" }]}>
           Enter your name for the scoreboard
        </Text>
      <TextInput
           onChangeText={setPlayerName}
           autoFocus={true}
           style={style.textInput}
      />
      <Pressable
           onPress={() => handlePlayerName(playerName)}
           style={style.Pressable}
         >
           <Text style={[style.title, { marginTop: 0 }]}>OK</Text>
     </Pressable>
     </>
     ) : (
    <>
      <Text style={style.title}>Rules of the Game</Text>
      <Text style={style.instructions}>Test rules
            This is the upper section of the classic Yahtzee dice game. You have {NBR_DICES} dices and for the every dice you have {NBR_THROWS} throws. After
            each throw you can keep dices in order to get same dice spot counts
            as many as possible. In the end of the turn you must select your
            points from {Min_Spot} to {Max_Spot}. Game ends when all points have been
            selected. The order for selecting those is free. 
            POINTS: After each
            turn game calculates the sum for the dices you selected. Only the
           dices having the same spot count are calculated. Inside the game you
           can not select same points from {Min_Spot} to {Max_Spot} again. 
           GOAL: To get points as much as possible. {BonusLimit} points is the
           limit of getting bonus which gives you 50 points more.</Text>
        <Text style={[style.title, { marginButtom: 0 }]}>
           Good Luck, {playerName}
         </Text>
         <Pressable
           onPress={() =>
             navigation.navigate("Gameboard", { player:  playerName  })
           }
           style={style.Pressable}
         >
           <Text style={style.button}>Play Now!</Text>
         </Pressable> 
      </>
     )}
     <Footer/>
    
    </View>
       
  </ScrollView>
  );
}
