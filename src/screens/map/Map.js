import React,{useState,useEffect,useRef} from "react"
import { View,StyleSheet,Alert,Animated,Dimensions,TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE ,Marker, Callout} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from "react-native-geolocation-service";
import { Button } from "react-native";
import { connect } from "react-redux";
import { setAddress } from "../../redux/action/restaurant";
import { useRoute } from "@react-navigation/native";
import { PermissionsAndroid } from 'react-native';
import Card from "../../components/Cards";
const Map = ({navigation,...props}) => {
 
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const region = {
    latitude: 22.62938671242907,
    longitude: 88.4354486029795,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  }
  const { width } = Dimensions.get("window");
  const CARD_WIDTH = width;
  const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
  const route = useRoute();
  const mapRef = useRef(null);
  let mapIndex = 0;
  const _scrollView = React.useRef(null);
  const mapAnimation = new Animated.Value(0);

  useEffect(() => {
    requestPermissions();
  }, [])

  useEffect(() => {
    // Animate to move card on the marker click
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= props.restaurants.length) {
        index = props.restaurants.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if( mapIndex !== index ) {
          mapIndex = index;
          const { coordinate } = props.restaurants[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta:region.latitudeDelta,
              longitudeDelta:region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }, [])

  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization("whenInUse");
      if(auth === "granted") {
        getLocation();
      }
    }
  
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.getLocation,
        {
          title: "Need Location Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
        if (granted) {
        console.log( "You can use the ACCESS_FINE_LOCATION" );
        getLocation();
      } 
      else {
        console.log( "ACCESS_FINE_LOCATION permission denied" )
      }
    }
  }

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      error => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      }
    );
  }

  const setCoordinates = (coordinates) => {
    setPosition({
      latitude:coordinates.latitude,
      longitude:coordinates.longitude
    })
  }

  const getAddress = (e) => {
    let camera = mapRef.current.getCamera();
    camera.then(data=>mapRef.current.animateCamera(data,{duration:1000}));
    setPosition({
      latitude:e.nativeEvent.coordinate.latitude,
      longitude:e.nativeEvent.coordinate.longitude,
    })
   
  }
  
  //Send address to store in restaurant form
  const handleMap = () => {
    props.setAddress(JSON.stringify(position));
    navigation.goBack();
  }

  const onMarkerPress = (e) => {
    const markerID = e._targetInst.return.key;
    let x = (markerID * CARD_WIDTH); 
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  }

  const interpolations = props.restaurants.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

  return(
    <View >
      <View style={styles.container}>
        <MapView
          ref = {mapRef}
          provider={PROVIDER_GOOGLE}
          style={[styles.map,{flex:1}]}
          showsUserLocation={true}
          followsUserLocation={true}
          loadingEnabled={true}
          showsMyLocationButton={true}
          mapType="standard"
          initialRegion={{
            latitude: 22.62938671242907,
            longitude: 88.4354486029795,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
          }}
          onPress={getAddress}
        >
          {/* Shows marker on adding restaurant address */}
        {
          route.name === "Map" &&(
            <Marker
              coordinate={position}
              pinColor="red"
              draggable
              onDragEnd={(event)=>{setCoordinates(event.nativeEvent.coordinate)}}
            />
          )
        }
        {
         props.restaurants.map((res,index)=>{
          const obj = JSON.parse(res.address);
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return(
            <MapView.Marker
            onPress={(e)=>onMarkerPress(e)}
            key={index}
            coordinate={obj}  
            pinColor="purple"
            title={res.resName}
            >
               <Animated.View style={[styles.markerWrap,scaleStyle]}>
                <Animated.Image
                  source={require('../../../assets/map_marker.png')}
                  style={[styles.marker]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          )
        })
      }
        </MapView>
      </View>
      <Animated.ScrollView
          ref = {_scrollView} 
          horizontal
          scrollEventThrottle = {1}
          showsHorizontalScrollIndicator = {false}
          pagingEnabled
          snapToAlignment="center"
          style={styles.scrollView}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x:mapAnimation
                }
              }
            }
          ],{useNativeDriver:true})}
        >
          {
            props.restaurants.map((res,index)=>{
              return(
                <TouchableOpacity key = {res.key} onPress = {()=>navigation.navigate("MenuList",{id:res.key})}>
                   <Card
                    item={res} 
                    />
                </TouchableOpacity>
              ) 
            })
          }
        </Animated.ScrollView>

       {/* Shows button when adding restaurant address */}
      {
        route.name === "Map" &&(
          <View style={styles.btnAlign}>
            <Button 
              title="done" 
              style={styles.button}
              onPress={handleMap}
            />
            <Button 
              title="cancel" 
              style={styles.button}
              onPress={()=>{props.navigation.goBack()}}
            />
          </View>
        ) 
      }
      
    </View>
  )
}

const mapStateToProps = ({restaurant}) => {
  return{
    restaurants:restaurant.restaurants
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    setAddress:(payload)=>dispatch(setAddress(payload))
  }
}


const styles = StyleSheet.create({
  container: {
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button:{
    right:0,
    marginBottom:10,
  },
  btnAlign:{
    flexDirection:"row",
    justifyContent:'center'
  },
  scrollView: {
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
  marker: {
    width: 30,
    height: 30,
  },
 });


 export default connect(mapStateToProps,mapDispatchToProps)(Map);
