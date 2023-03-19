import { StyleSheet } from 'react-native';

export default style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   // justifyContent: 'space-between'
  },
  header: {
    marginBottom: 15,
    backgroundColor: '#d66dc3',
    flexDirection: 'row',
    fontFamily: "Lato-Regular"
  },
  footer: {
    marginTop: 20,
    backgroundColor: '#d66dc3',
    flexDirection: 'row',
    fontFamily: "Lato-Regular"
  },
  title: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center',
    marginTop:10,
    marginBottom: 10,
    marginLeft: 10,
    fontFamily: "Lato-Regular"
  },
  text:{
    color: '#000000',
    fontSize: 15,
    textAlign: 'left',
    marginTop:10,
    marginBottom: 10, 
    marginLeft: 10,
    fontFamily: "Lato-Regular"
  },
  instructions:{
    color: '#000000',
    fontSize: 15,
    textAlign: 'center',
    marginTop:10,
    marginBottom: 10, 
    marginLeft: 20,
    marginRight: 20,
    lineHeight: 30,
    fontFamily: "Lato-Regular"
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    fontFamily: "Lato-Regular"
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    margin: 10,
    fontFamily: "Lato-Regular"
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    backgroundColor: "#d66dc3",
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: "Lato-Regular"

  },
  textInput: {
    backgroundColor:'#f8def6',
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    fontSize: 20,
    height: 50,
    fontFamily: "Lato-Regular"
  },
  Pressable:{
    padding: 10
  }, 
  points: {
    justifyContent:'center',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
  
  },
  dicepoints:{
   flexDirection: 'row',
   width: 280,
   alignContent: 'center', 
   marginBottom: 10,
  
  },
  icon:{
    marginTop: 10,
    alignSelf: 'center'
  },
  player:{
    fontSize: 15,
    marginLeft: 10,
    marginTop: 10,
    fontFamily: "Lato-Regular"
  }

});