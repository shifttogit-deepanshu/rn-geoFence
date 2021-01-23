import React,{useState} from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { LocationGeofencingEventType } from 'expo-location';
import * as TaskManager from 'expo-task-manager'
import MyLoc from "./MyLoc"

TaskManager.defineTask("checkMyStatus", ({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  if (eventType === LocationGeofencingEventType.Enter) {
    console.log("You've entered region:", region);
  } else if (eventType === LocationGeofencingEventType.Exit) {
    console.log("You've left region:", region);
  }
});

export default function App() {
  
  const [locOnStartup,setLocOnStartup] = useState({coords:{latitude:"press start",longitude:"press start"}})
  
  const getLocOnStartup = async ()=>{
    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
    console.log(permissions)
    if (status === 'granted') {
      console.log(locOnStartup)
      const currentLoc = await Location.getCurrentPositionAsync();
      setLocOnStartup(currentLoc)

    } else {
      throw new Error('Location permission not granted');
    }
    
  }
 
  const geoFence = ()=>{
    Location.startGeofencingAsync("checkMyStatus",[{latitude:locOnStartup.coords.latitude,longitude:locOnStartup.coords.longitude,radius:10,notifyOnEnter:true,notifyOnExit:true}])
    console.log("reached here")
  }

  

  return (
    <View style={styles.container}>
      <Text>latitude: {locOnStartup.coords.latitude}</Text>
      <Text>longitude: {locOnStartup.coords.longitude}</Text>
      <Button title="start" onPress={()=>getLocOnStartup()}/>
      <MyLoc />
      <Button title="start geoFence" onPress={()=>geoFence()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
