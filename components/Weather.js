import React from "react";
import { View, Text, Image } from "react-native";
import { useEffect, useState } from "react";

const api = {
    url: process.env.EXPO_PUBLIC_API_URL,
    key: process.env.EXPO_PUBLIC_API_KEY,
    icons: process.env.EXPO_PUBLIC_ICONS_URL,
    geo: process.env.EXPO_PUBLIC_GEOREVERSE_URL
}

export default function Weather({ lat, lon }) {
    const [temp, setTemp] = useState(0)
    const [tempFeels, setTempFeels] = useState(0)
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')
    const [wind, setWind] = useState(0)
    const [city, setCity] = useState('')


    useEffect(() => {
        const url = api.url +
            'lat=' + lat +
            '&lon=' + lon +
            '&units=metric' +
            '&lang=fi' +
            '&appid=' + api.key

        fetch(url)
            .then(response => response.json())
            .then(json => {
                setTemp(json.main.temp)
                setDescription(json.weather[0].description)
                setIcon(api.icons + json.weather[0].icon + '@2x.png')
                setWind(json.wind.speed)
                setTempFeels(json.main.feels_like)

            }).catch(error => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        const geoUrl = api.geo +
            'lat=' + lat +
            '&lon=' + lon +
            '&appid=' + api.key

        fetch(geoUrl)
            .then(response => response.json())
            .then(json => {
                setCity(json[0].name)
            }).catch(error => {
                console.log(error)
            })
    }, [])


    return (
        <View>
            <Text>{city}</Text>
            <Text>Lämpötila {temp}&#8451;</Text>
            <Text>Tuntuu kuin {tempFeels}&#8451;</Text>
            <Text>Tuulen nopeus {wind} m/s</Text>
            <Text>{description}</Text>

            {icon &&
                <Image
                    style={{ width: 100, height: 100 }}
                    source={{ uri: icon }}
                />
            }

        </View>
    )
}