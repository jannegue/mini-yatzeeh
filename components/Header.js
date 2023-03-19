import React from "react";
import { Text, View} from 'react-native';
import style from "../Styles/style";

export default Header = () => {

    return(
        <View style={style.footer}>
        <Text style={style.author}>
           Mini-Yatzee 
        </Text>
    </View>
    );

}