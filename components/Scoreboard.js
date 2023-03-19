import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import style from "../Styles/style";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { NBR_DICES } from "../constants/Game";
import Header from "./Header";
import Footer from "./Footer";
import { SCOREBOARD_KEY } from "../constants/Game";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataTable } from "react-native-paper";

            


export default Scoreboard = ({ navigation }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const getData = navigation.addListener("focus", () => {
      getScoreboardData();
    });
    return getData;
  }, [navigation]);

  const getScoreboardData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      if (jsonValue !== null) {
        let tmpScores = JSON.parse(jsonValue);
        tmpScores.sort((a,b)=> (b.points - a.points))
        setScores(tmpScores);
      }
    } catch (error) {
      console.log("Read error: " + error.message);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem(SCOREBOARD_KEY);
      setScores([]);
    } catch (e) {
      console.log("Removing error: " + error.message);
    }

    console.log("Removing done.");
  };

 
    

  return (
    <ScrollView>
    <View>
      <Header />
      <View>
        <AntDesign name="Trophy" size={50} color="black" style={style.icon} />
        <Text style={style.title}>Top Five Players</Text>
        <DataTable>
        <DataTable.Header>
            <DataTable.Title>Player</DataTable.Title>
            <DataTable.Title>Date&Time</DataTable.Title>
            <DataTable.Title>Score</DataTable.Title>
          </DataTable.Header>

          {scores.slice(0,5).map((player, i) => (
            <DataTable.Row key={i+1}>
              <DataTable.Cell>{player.name}</DataTable.Cell>
              <DataTable.Cell>
                {player.date} {player.time}
              </DataTable.Cell>
              <DataTable.Cell>{player.points}</DataTable.Cell>
            </DataTable.Row>
            
          ))}
        </DataTable>
        {/* <Pressable
        onPress={removeValue}
        >
          <Text style={style.button}>Remove Data</Text>
        </Pressable> */}
      </View>
      <Footer />
    </View>
    </ScrollView>
  );
};
