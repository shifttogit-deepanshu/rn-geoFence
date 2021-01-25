import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { LocationGeofencingEventType } from 'expo-location';
import * as TaskManager from 'expo-task-manager'
import MyLoc from "./MyLoc"
import database from "./Firebase/firebaseConfig"

TaskManager.defineTask("checkMyStatus", ({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  if (eventType === LocationGeofencingEventType.Enter) {
    database.ref('TestLoc').update({
      status:1
    })
    console.log("You've entered region:", region);
  } else if (eventType === LocationGeofencingEventType.Exit) {
    database.ref('TestLoc').update({
      status:0
    })
    console.log("You've left region:", region);
    
  }
});

export default function App() {
  useEffect(()=>{
    database.ref('TestLoc').on('value',snapshot=>{
      setStatus(snapshot.val().status)
      
    })
  })
  
  const [locOnStartup,setLocOnStartup] = useState({latitude:"press start",longitude:"press start",status:-1})
  const [status,setStatus] = useState(-1)
  const getLocOnStartup = async ()=>{
    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {

      const currentLoc = await Location.getCurrentPositionAsync();
      database.ref('TestLoc').update({
        latitude:currentLoc.coords.latitude,
        longitude:currentLoc.coords.longitude,
        status:status
      })
      database.ref('TestLoc').on('value',snapshot=>{
        setLocOnStartup(snapshot.val())
        
      })

    } else {
      throw new Error('Location permission not granted');
    }



  }

  
 
  const geoFence = async ()=>{
    await Location.startGeofencingAsync("checkMyStatus",[{latitude:locOnStartup.latitude,longitude:locOnStartup.longitude,radius:10,notifyOnEnter:true,notifyOnExit:true}])
    console.log("reached here")
  }

  return (
    <View style={styles.container}>
      <Text>latitude: {locOnStartup.latitude}</Text>
      <Text>longitude: {locOnStartup.longitude}</Text>
      <Button title="start" onPress={()=>getLocOnStartup()}/>
      <MyLoc />
      <Button title="start geoFence" onPress={()=>geoFence()} />
      {status==-1 && <Text>Geo Location Not accessed...</Text>}
      {status==1 && <Text>You are inside the region</Text>}
      {status==0 && <Text>You are outside the region</Text>}
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
