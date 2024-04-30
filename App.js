import { StyleSheet, Text, View } from 'react-native';
import WeatherChart from './WeatherChart';
import { mockData } from './mockData';
import { useEffect, useState } from 'react';
import { getForecast } from './api-weather';

export default function App() {

  const [data, setData] = useState(mockData);  
  const hours = data.hourly.time;
  const temperatures = data.hourly.temperature_2m;
  const rainProbabilities = data.hourly.precipitation_probability;

  useEffect(() => {
    getForecast()
      .then(response => {
        console.log("load data");
        setData(response.data)
      })
  }, [])


  return (
    
    <View style={styles.container}>
      <WeatherChart
        hours={hours}
        values={temperatures}
        yDomain={{min: 10, max: 35}}
        color = {{
          from: '#f55',
          to: '#25f',
          line: '#888'
        }}
      />
      <WeatherChart
        hours={hours}
        values={rainProbabilities}
        yDomain={{min: 0, max: 100}}
        color = {{
          from: '#12a',
          to: '#ddd',
          line: '#888'
        }}
      />
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
