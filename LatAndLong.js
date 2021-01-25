import React from "react"
import {View,Text,Button,StyleSheet} from "react-native"

const MyLoc = ()=>{
  
            const checkMyStatus= ()=>{
                Location.watchPositionAsync({accuracy:6},locObj=>{
                    setCurrLoc(locObj)
            })
        }
    const [currLoc,setCurrLoc] = useState({coords:{latitude:"press check",longitude:"press check"}})
    
    return (
        <View>
        <Text>latitude: {locOnStartup.latitude}</Text>
        <Text>longitude: {locOnStartup.longitude}</Text>
        <Button title="start" onPress={()=>getLocOnStartup()}/>
      </View>
    )

}

export default MyLoc