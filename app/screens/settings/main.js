import React, { Fragment, useContext } from "react";
import { Button, Text, Pressable, StyleSheet, View } from "react-native";
import { SocketContext } from "../../providers/socket"
import { SafeAreaView } from "react-native-safe-area-context";


export default function App({ navigation }) {
  const { serverState, ws, reconnect } = useContext(SocketContext)

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.circle} />
        <View style={{height:18, alignItems:"center", justifyContent: "center", marginBottom:15}}>
          <Text style={styles.userName}>Test User</Text>
        </View>
        <Pressable style={styles.pressable} onPress={()=> reconnect()}>
          <Text style={styles.pressableText}>Connect Socket</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={()=> ws.close()}>
          <Text style={styles.pressableText}>Disconnect Socket</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={()=> navigation.navigate('order-book')}>
          <Text style={styles.pressableText}>View Order</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"#fff",
    paddingHorizontal: 16,
    
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: "grey",
    alignSelf:"center",
    marginBottom:15
  },
   userName:{
     fontWeight:"bold",
     fontSize: 18,
     textTransform:"uppercase",
     lineHeight:18
   },
   pressable: {
     padding: 8,
     marginBottom: 10,
     borderWidth: StyleSheet.hairlineWidth,
     height: 60,
     alignItems:"center",
     justifyContent:"center"
   },
   pressableText:{
    fontWeight:"bold",
    fontSize: 14,
    textTransform:"uppercase"
   }
})