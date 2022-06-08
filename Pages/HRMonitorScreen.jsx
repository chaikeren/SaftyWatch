// //import liraries
// import React, { Component } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import Header from '../components/Header';
// // create a component
// export default function MyComponent() {
//   return (
//     <View style={styles.container}>
//       <Header/>
//     <View style={styles.HRMonitorBody}>
//     <View style={styles.HRMonitorGraph}>
//         <Text>Vitals hour Graph</Text>
//     </View>
//     <View style={styles.HRMonitorMidBOx}>
//         <Text>Mid Box</Text>
//     </View>
//     <View style={styles.HRMonitorWeekChart}>
//         <Text>Week Chart</Text>
//     </View>

//     </View>
    
//     </View>
//   );
// };

// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF',
//   },
//   HRMonitorBody:{
//     flex: 6,
//     backgroundColor:'yellow',
//     marginLeft:20,
//     marginRight:20
//     // alignItems:'center',

//   },
//   HRMonitorGraph:{
//     flex:1,
//     backgroundColor:'green'
//   },

//   HRMonitorMidBOx:{
//     flex:1,
//     backgroundColor:'pink',
//     margin:15,
//     borderRadius:10
// },

// HRMonitorWeekChart:{
//     flex:1,
//     backgroundColor:'purple'
// },


// });

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, TouchableOpacity } from 'react-native';
import { getUserDayVitals } from '../user_functions/Vitals';
import Header from '../components/Header';
import { FontAwesome, FontAwesome5, Fontisto  } from '@expo/vector-icons'; 




const HOURS = (new Array(25)).fill(0).map((x, i) => i % 4 == 0 ? `${i}` : '');


const USER_INFO = [
  {
    fieldName: 'Rest BPM:',
    icon: <FontAwesome name="heartbeat" size={20} color="#1D3557" />,
    val: 75
  },
  {
    fieldName: 'Activity BPM:',
    icon: <FontAwesome5 name="walking" size={20} color="#1D3557" />,
    val: 75
  },
  {
    fieldName: 'Blood presure:',
    icon: <Fontisto name="blood-drop" size={20} color="#1D3557" />,
    val: 75
  },
]

//! TO DELETE
const WEEK_CHART_INFO = [
  {
    name: 'sun',
    minVal: 20,
    maxVal: 80,
  },
  {
    name: 'mon',
    minVal: 30,
    maxVal: 90,
  },
  {
    name: 'tue',
    minVal: 45,
    maxVal: 50,
  },
  {
    name: 'wed',
    minVal: 20,
    maxVal: 60,
  },
  {
    name: 'thu',
    minVal: 30,
    maxVal: 95,
  },
  {
    name: 'fri',
    minVal: 45,
    maxVal: 115,
  },
  {
    name: 'sat', 
    minVal: 45,
    maxVal: 48,
  }
]

// create a component
export default function MyComponent () {

  const [dailyVitals, setDailyVitals] = useState([0]);
  const [isDayBarVisible, setIsDayBarVisible] = useState(false);
  const [dayBarData, setDayBarData] = useState(null);
  const [dayBarColor, setDayBarColor] = useState(-1);

  useEffect(() => {
    vitals();
  }, []);

  const vitals = async () => {
    const table = await getUserDayVitals();
    setDailyVitals(table);
  }

  const DailyVitalsChart = () => {
    return (
        <View>
          <LineChart
            data={{
              labels: HOURS,
              datasets: [
                {
                  data: dailyVitals
                }
              ]
            }}
            width={320} // from react-native
            height={180}
            yAxisInterval={9} // optional, defaults to 1
            withVerticalLines={false}
            chartConfig={{
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0,
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(231, 21, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(29, 53, 87, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "0",
                strokeWidth: "1",
              }
            }}
            bezier
            style={{
              borderRadius: 16,
            }}
          />
        </View>
    );
  }

  const MidBoxLines = () => {
    return USER_INFO.map((item) => 
    <View style={styles.HRMonitorMidBoxLine}>
      <Text style={styles.HRMonitorMidBoxText}>{item.fieldName}</Text>
      <View style={styles.HRMonitorMidBoxLineValues}>
        <Text style={styles.HRMonitorMidBoxText}>{item.val}</Text>
        {item.icon}
      </View>
    </View>
    )
  }

  //! TO CHANGE
  const WeekChart = () => {
    return WEEK_CHART_INFO.map((day, key) => 
      <TouchableOpacity 
        key={key} 
        style={styles.bar}
        onPress={() => handleBarPress(day, key)}>
        <View 
          style={[styles.day, {backgroundColor: dayBarColor == key ? '#E63946' : '#1D3557'}]}
          height={5 + (day.maxVal * 0.5)}></View>
        <Text style={styles.barDayText}>{day.name}</Text>
      </TouchableOpacity>
      );
  }

  const handleBarPress = (day, key) => {
    if(dayBarData != day) {
      setDayBarData(day);
      setIsDayBarVisible(true);
      setDayBarColor(key);
    } else {
      setDayBarData(null)
      setIsDayBarVisible(false)
      setDayBarColor(-1);
    }
  }

  const DayData = () => {
    return (
      <View style={styles.showDayBarData}>
        <Text style={styles.dayBarDataText}>Min: {dayBarData["minVal"]}</Text>
        <Text style={styles.dayBarDataText}>Max: {dayBarData["maxVal"]}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.HRMonitorBody}>
        <View style={styles.HRMonitorGraph}>
          <DailyVitalsChart/>
        </View>
        <View style={styles.HRMonitorMidBox}>
          <MidBoxLines/>
        </View>
        <View style={styles.HRMonitorWeekChart}>
          <View style={styles.weekChartTop}>
            { isDayBarVisible && 
              <DayData/>
            }
          </View>
          <View style={styles.weekChartBox}>
            <View style={styles.weekChartBoxWeekTable}>
              <WeekChart/>
            </View>
          </View>
          <View style={styles.weekChartBot}></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  HRMonitorBody:{
    flex: 6,
  },
  HRMonitorGraph:{
    flex:1,
    // backgroundColor: 'green',
  },

  HRMonitorMidBox:{
    flex:1,
    backgroundColor:'#C7EDEE',
    margin:25,
    borderRadius:10,
    justifyContent: 'center',
    elevation: 3
  },
  HRMonitorWeekChart:{
      flex:1,
      justifyContent: 'center',
  },
  HRMonitorMidBoxLine: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    height: 40,
  },
  HRMonitorMidBoxText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  HRMonitorMidBoxLineValues: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-between'
  },
  weekChartBox: {
    flex: 1,
  },
  weekChartBoxWeekTable: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  weekChartBot: {
    flex: 0.25,
  },
  weekChartTop: {
    flex: 0.25,
  },
  day: {
    width: 15,
    height: 10,
    margin: 10,
    borderRadius: 50,
  },
  bar: {
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  barDayText: {
    fontSize: 15,
    color: '#1D3557'
  },
  showDayBarData: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  dayBarDataText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#457B9D'
  }
});

