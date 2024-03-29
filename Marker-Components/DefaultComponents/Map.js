import React, { useState, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import MapView from 'react-native-maps'; // MapView, { PROVIDER_GOOGLE }
import Colors from '../Variables/Colors';
import Variables from '../Variables/Variables';
import Marker from './Marker';

//▽▽ EXPORTED VARIABLES ▽▽

var POS_LATITUDE;
var POS_LONGITUDE;

//△△ EXPORTED VARIABLES △△

function Map(props) {

    const[LABEL_FILTERS, SET_LABEL_FILTERS] = useState(Variables.CURRENT_LABEL_FILTERS);
    const[CURRENT_MARKERS, SET_MARKERS] = useState(Variables.MARKERS);
    // OOO DET FUNGERAR, JAG BINDADE VARIABLES.CURRENT LABEL FILTERS TILL EN USESTATE HOOK OCH HOOKEN UPPDATERAS NÄR VARIABELN UPPDATERAS!!


    const[FOLLOW_USR_LOC, SET_FOLLOW_USR_LOC] = useState(true);
    setTimeout(() => {//FÖLJ USER LOCATIONEN FÖRSTA SEKUNDEN SÅ NÄR MAN GÅR IN PÅ APPEN SÅ BÖRJAN MAN DÄR MAN ÄR PÅ KARTAN
        SET_FOLLOW_USR_LOC(false);
    }, 500);

    function ARRAY_INTERSECTION(a1,a2){// kollar om 2 olika arrays har en eller fler av samma element, (för att jämföra labels)
        return a1.filter(function(n) { return a2.indexOf(n) !== -1;});
    }


    return(
        <MapView

            // mapType="hybrid" kanske ska vara en inställning...
            
            showsCompass={false}
            showsPointsOfInterest={false}
            showsBuildings={true}
            showsTraffic={false}
            userInterfaceStyle={props.UI}
            showsUserLocation={true}
            // provider={PROVIDER_GOOGLE}
            style={styles.map}

            initialRegion={{
                latitude: 0,
                longitude: 0,
                latitudeDelta: 5.0922,
                longitudeDelta: 5.0421,
            }}
            followsUserLocation={FOLLOW_USR_LOC}

            onUserLocationChange={(e) => {
                POS_LATITUDE = e.nativeEvent.coordinate.latitude;
                POS_LONGITUDE = e.nativeEvent.coordinate.longitude;
            }}

        >
            {
                                
                CURRENT_MARKERS.map((MARKER, INDEX) => {

                    if (LABEL_FILTERS != "") {
                        if (ARRAY_INTERSECTION(LABEL_FILTERS, MARKER.labels) != "") {
                            return(
                                <Marker 
                                    Marker={MARKER}
                                    key={INDEX}
                                />
                            );
                        }

                    }else{
                        return(
                            <Marker 
                                Marker={MARKER}
                                key={INDEX}
                            />
                        );
                    }
                })
            }
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
        
    },
})

export default Map;

export { POS_LONGITUDE, POS_LATITUDE }