import React,{useState,useEffect} from "react"
import {View,Text,Button,StyleSheet} from "react-native"
import * as Location from 'expo-location';


const MyLoc = ()=>{
  
            const checkMyStatus= ()=>{
                Location.watchPositionAsync({accuracy:6},locObj=>{
                    setCurrLoc(locObj)
            })
        }
    const [currLoc,setCurrLoc] = useState({coords:{latitude:"press check",longitude:"press check"}})
    
    return (
    <View>
    <Text>Current Position: </Text>
      <Text>latitude:{currLoc.coords.latitude} longitude:{currLoc.coords.longitude}</Text>
      <Button title="check" onPress={()=>checkMyStatus()}/>
      </View>
    )

}

export default MyLoc