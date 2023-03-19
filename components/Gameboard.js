import React, { useState, useEffect } from "react";
import { Text, View, Pressable, Alert, TextComponent, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import style from "../Styles/style";
import Header from "./Header";
import Footer from "./Footer";
import {
  NBR_DICES,
  NBR_THROWS,
  Min_Spot,
  Max_Spot,
  BonusLimit,
  SCOREBOARD_KEY
} from "../constants/Game";
import { Col, Grid } from "react-native-easy-grid";
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


let board = [];
let getBonus = false;


export default Gameboard = ({ route }) => {
  const [playerName, setPlayerName] = useState("");
  const [nbrThrowsLeft, setNbrThrowsLeft] = useState(NBR_THROWS);
  const [status, setStatus] = useState("");
  const [BonusStatus, setBonusStatus] = useState("");
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedDices, setSelectedDices] = useState(
    new Array(NBR_DICES).fill(false)
  );
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_DICES).fill(0));
  const [selectedDicePoints, setSelectedDicePoints] = useState(
    new Array(Max_Spot).fill(false)
  );
  const [dicePointsTotal, setDicePointsTotal] = useState(
    new Array(Max_Spot).fill(0)
  );
  const [DicesThrown, setDicesThrown] = useState(false);

  const [scores, setScores] = useState([]);
  const picture = <FontAwesome5 name="dice" size={60} color="#ee6de8"/>



  //This will be done once when entering the gameboard 
  //Pass Playername from Home
  useEffect(() => {
    if (playerName === "" && route.params?.player) {
      setPlayerName(route.params.player);
      getScoreboardData();
      console.log('Got Scoredata'); 
    }
  },[]);

  //This will be done when number of throws changes
   useEffect(() => {
  
    if (selectedDicePoints.every(x => x)) {
      savePlayerPoints(); 
    }else if (nbrThrowsLeft === NBR_THROWS) {
      setStatus("Throw dices.");
   }
    else if (0 < nbrThrowsLeft) {
     setStatus("Select and throw dices again");
    }
    else {
      setStatus("Select your points.");  
  } 
  calcTotal();
   },[nbrThrowsLeft]);



  //Row of Dices
  const row = [];
  for (let i = 0; i < NBR_DICES; i++) {
    row.push(
      <Pressable key={"row" + i} onPress={() => selectDice(i)}>
        <MaterialCommunityIcons
          name={board[i]}
          key={"row" + i}
          size={70}
          color={getDiceColor(i)}
        />
      </Pressable>
    );
  }

  //Row of numbers for choosing
  const buttonRow = [];
  for (let diceButton = 0; diceButton < Max_Spot; diceButton++) {
    buttonRow.push(
      <Col key={"buttonRow" + diceButton}>
        <Pressable
          key={"buttonRow" + diceButton}
          onPress={() => selectDicePoints(diceButton)}
        >
          <MaterialCommunityIcons
            name={"numeric-" + (diceButton + 1) + "-circle"}
            key={"buttonRow" + diceButton}
            size={40}
            color={getDicePointsColor(diceButton)}
          ></MaterialCommunityIcons>
        </Pressable>
      </Col>
    );
  }

//Row of numeric points
const pointsRow = [];
  for (let spot = 0; spot < Max_Spot; spot++) {
    pointsRow.push(
      <Col key={"points" + spot}>
        <Text key={"points" + spot} style={style.points}>
          {getSpotTotal(spot)}
        </Text>
      </Col>
    );
    }

        //press Throw Dices - get a number
 const throwDices = () => {
  setDicesThrown(true);
  if (nbrThrowsLeft === 0) {
    setStatus("Select your points before next throw.");
    return;
  }
  let spots = [...diceSpots];
  for (let i = 0; i < NBR_DICES; i++) {
    if (!selectedDices[i]) {
      let randomNumber = Math.floor(Math.random() * 6 + 1);
      board[i] = "dice-" + randomNumber;
      spots[i] = randomNumber;
    }
  }
  setNbrThrowsLeft(nbrThrowsLeft - 1);
  setDiceSpots(spots);
};


    const selectDice = (i) => {
      if (nbrThrowsLeft === 3) {
        setStatus("You have to throw dices first.");
        return;
      }
      let dices = [...selectedDices];
      dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
    };

    //Select Points for one Number (after three throws)
   function selectDicePoints(i) {
    if (nbrThrowsLeft === 0){
      let selected = [...selectedDices];
      let selectedPoints = [...selectedDicePoints];
      let points = [...dicePointsTotal];
      if (!selectedPoints[i]) {
        selectedPoints[i] = true;
        let nbrOfDices = diceSpots.reduce(
          (total,x) => (x === (i + 1) ? total + 1 : total), 0);
        points[i] = nbrOfDices * (i + 1);
        setDicePointsTotal(points);
      }
      else {
        setStatus("You already selected points for " + (i + 1));
        return points[i];
      }
      selected.fill(false);
      setSelectedDices(selected);
      setSelectedDicePoints(selectedPoints);
      setNbrThrowsLeft(NBR_THROWS);
      return points[i];
    }
    else {
     setStatus("Throw 3 times before selecting points to get the best possible result.")
   }
 }


  

//conditional styling for rows
function getDiceColor(i) {
     return selectedDices[i] ? "black" : "#ee6de8";
  }

 function getDicePointsColor(i) {
     return selectedDicePoints[i] ? "black" : "#ee6de8";
 }


   function getSpotTotal(i) {
     return dicePointsTotal[i];
  }


   function calcTotal() {
    let total = dicePointsTotal.reduce((a, b) => a + b, 0)
     setTotalPoints(total);
   }
  

 const getBonusPointStatus = () => {
  if (totalPoints >= BonusLimit) {
    getBonus = true;
    return "You got the bonus! + 50 points were added."
  }
  else {
    return "You are " + (BonusLimit - totalPoints) + " points away from bonus."
  }
  }
  

   function newGame(){
     setNbrThrowsLeft(NBR_THROWS);
     setBonusStatus("");
     setStatus("First, throw Dices");
     setTotalPoints(0);
     setSelectedDicePoints(new Array(Max_Spot).fill(false));
     setSelectedDices(new Array(NBR_DICES).fill(false));
     setDicePointsTotal(new Array(Max_Spot).fill(0));
     setDicesThrown(false);
  }


  const getScoreboardData = async() => {
    try{
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      if(jsonValue !== null) {
        let tmpScores = JSON.parse(jsonValue);
        setScores(tmpScores)
      }
    } catch(error) {
      console.log('Read error: ' + error.message);
    }
  }

   const savePlayerPoints = async () => {

    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
  
    let total = getBonus ? totalPoints + 50 : totalPoints;

      const playerPoints = {
        name: playerName,
        date: `${date}.${month}.${year}`,
        time: `${hours}:${minutes}`,
        points: total
     }
     try{
       const newScore = [...scores, playerPoints];
       const jsonValue = JSON.stringify(newScore);
       await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
     }
     catch (error) {
       console.log('Save error: ' + error.message);
     }
   }




  return (
    <ScrollView>
    <View style={style.container}>
      <Header />
      <Text style={style.player}> Player: {playerName} </Text>
      <View style={style.gameboard}>
      {DicesThrown 
      ? 
      <View style={style.flex}>{row}</View> 
      : 
      <View style={style.flex}>{picture}</View>}
        <Text style={style.gameinfo}>Throws Left: {nbrThrowsLeft}</Text>
        <Text style={style.gameinfo}>{status}</Text>
        <Pressable style={style.button} 
          onPress={() => {let allThrown = true;
                    for (let i = 0; i < selectedDicePoints.length; i++) {
                      if (!selectedDicePoints[i]) {
                          allThrown = false;
                          break;
                        }
                      }
                      if (allThrown) {
                        newGame();
                      } else {
                        throwDices();
                      }
                    }}>
          
          <Text style={style.buttonText}>Throw Dices!</Text>
        </Pressable>
        <Text style={style.text}>{getBonusPointStatus()}</Text>
        <View style={style.dicepoints}>
          <Grid>{buttonRow}</Grid>
        </View>
        <View style={style.dicepoints}>
          <Grid>{pointsRow}</Grid>
        </View>
        <Text style={style.title}>Total: {getBonus ? totalPoints + 50 : totalPoints} </Text> 
      </View>
      <Footer />
    </View>
    </ScrollView>
  );
};