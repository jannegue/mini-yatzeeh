import React from "react";
import { Text, View } from 'react-native';
import style from "../Styles/style";

export default Footer1 = () => {

    return (
        <View style={style.footer}>
            <Text style={style.author}>
                Author: Janne Günther
            </Text>
        </View>
    );

}