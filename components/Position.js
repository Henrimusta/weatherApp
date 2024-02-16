import { View, Text } from "react-native";
import { React, useEffect, useState } from "react";
import * as Location from "expo-location";
import Weather from "./Weather";

export default function Position() {
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [message, setMessage] = useState('Haetaan sijaintia...')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync()
                if (status !== 'granted') {
                    setMessage('Ei lupaa sijainnin hakuun')
                } else {
                    const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                    setMessage('Sää sijainnissa')
                    setIsLoading(false)
                }
            } catch (error) {
                setMessage('Virhe sijainnin haussa')
                console.log(error)
            }
        })()
    }, [])


    return (
        <View>
            <Text>{message}</Text>
            {isLoading === false &&
                <Weather lat={latitude} lon={longitude} />
            }
        </View>
    )
}