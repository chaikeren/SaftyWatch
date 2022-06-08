import React, { useState, useEffect }       from 'react'
import { 
          View, Text, 
          StyleSheet, Dimensions 
        }                                   from 'react-native';
import Svg, { Path }                        from 'react-native-svg';

const WAVES = [
  "M0,0L24,5.3C48,11,96,21,144,48C192,75,240,117,288,128C336,139,384,117,432,106.7C480,96,528,96,576,117.3C624,139,672,181,720,176C768,171,816,117,864,112C912,107,960,149,1008,186.7C1056,224,1104,256,1152,266.7C1200,277,1248,267,1296,234.7C1344,203,1392,149,1416,122.7L1440,96L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z",
  "M0,192L30,170.7C60,149,120,107,180,90.7C240,75,300,85,360,106.7C420,128,480,160,540,165.3C600,171,660,149,720,128C780,107,840,85,900,106.7C960,128,1020,192,1080,234.7C1140,277,1200,299,1260,293.3C1320,288,1380,256,1410,240L1440,224L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z",
  "M0,32L30,42.7C60,53,120,75,180,74.7C240,75,300,53,360,74.7C420,96,480,160,540,160C600,160,660,96,720,64C780,32,840,32,900,80C960,128,1020,224,1080,245.3C1140,267,1200,213,1260,208C1320,203,1380,245,1410,266.7L1440,288L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z",
  "M0,128L30,138.7C60,149,120,171,180,149.3C240,128,300,64,360,69.3C420,75,480,149,540,186.7C600,224,660,224,720,197.3C780,171,840,117,900,122.7C960,128,1020,192,1080,234.7C1140,277,1200,299,1260,272C1320,245,1380,171,1410,133.3L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z",
  "M0,128L30,138.7C60,149,120,171,180,149.3C240,128,300,64,360,69.3C420,75,480,149,540,186.7C600,224,660,224,720,197.3C780,171,840,117,900,122.7C960,128,1020,192,1080,234.7C1140,277,1200,299,1260,272C1320,245,1380,171,1410,133.3L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z",
  "M0,96L30,122.7C60,149,120,203,180,229.3C240,256,300,256,360,234.7C420,213,480,171,540,133.3C600,96,660,64,720,48C780,32,840,32,900,64C960,96,1020,160,1080,181.3C1140,203,1200,181,1260,160C1320,139,1380,117,1410,106.7L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z",
  "M0,32L24,69.3C48,107,96,181,144,218.7C192,256,240,256,288,245.3C336,235,384,213,432,213.3C480,213,528,235,576,250.7C624,267,672,277,720,234.7C768,192,816,96,864,74.7C912,53,960,107,1008,154.7C1056,203,1104,245,1152,245.3C1200,245,1248,203,1296,202.7C1344,203,1392,245,1416,266.7L1440,288L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z",
  "M0,224L24,197.3C48,171,96,117,144,101.3C192,85,240,107,288,112C336,117,384,107,432,85.3C480,64,528,32,576,64C624,96,672,192,720,218.7C768,245,816,203,864,170.7C912,139,960,117,1008,144C1056,171,1104,245,1152,250.7C1200,256,1248,192,1296,170.7C1344,149,1392,171,1416,181.3L1440,192L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z",
  "M0,192L24,197.3C48,203,96,213,144,202.7C192,192,240,160,288,133.3C336,107,384,85,432,106.7C480,128,528,192,576,208C624,224,672,192,720,160C768,128,816,96,864,74.7C912,53,960,43,1008,80C1056,117,1104,203,1152,245.3C1200,288,1248,288,1296,272C1344,256,1392,224,1416,208L1440,192L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z",
  "M0,320L24,309.3C48,299,96,277,144,261.3C192,245,240,235,288,234.7C336,235,384,245,432,250.7C480,256,528,256,576,245.3C624,235,672,213,720,176C768,139,816,85,864,96C912,107,960,181,1008,202.7C1056,224,1104,192,1152,170.7C1200,149,1248,139,1296,149.3C1344,160,1392,192,1416,208L1440,224L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z",
  "M0,256L24,261.3C48,267,96,277,144,288C192,299,240,309,288,272C336,235,384,149,432,133.3C480,117,528,171,576,176C624,181,672,139,720,117.3C768,96,816,96,864,128C912,160,960,224,1008,240C1056,256,1104,224,1152,229.3C1200,235,1248,277,1296,250.7C1344,224,1392,128,1416,80L1440,32L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z",
  "M0,128L24,138.7C48,149,96,171,144,192C192,213,240,235,288,234.7C336,235,384,213,432,186.7C480,160,528,128,576,122.7C624,117,672,139,720,170.7C768,203,816,245,864,266.7C912,288,960,288,1008,266.7C1056,245,1104,203,1152,176C1200,149,1248,139,1296,144C1344,149,1392,171,1416,181.3L1440,192L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z",
]

const WAVE_HEIGHT   = 120;
const WAVE_WIDTH    = 100;
const CIRCLE_HEIGHT = 200;
const CIRCLE_WIDTH  = Dimensions.get('screen').width;
const HEADER_TEXT   = Dimensions.get('screen').height * 0.1;


export default function Header(props) {

  const [wave, setWave] = useState('');

  useEffect(() => {

    var index = Math.floor(Math.random() * WAVES.length);
    setWave(WAVES[index]);
  }, []);

  return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.header}>
            <Text style={styles.headerTxt}>{props.headerTitle}</Text>
            <Svg 
              height={WAVE_HEIGHT}
              width={WAVE_WIDTH}
              viewBox="0 0 1440 320"
              style={styles.profile}>
              <Path fill="#A8DADC" d="M512 16C238 16 16 238 16 512s222 496 496 496 496-222 496-496S786 16 512 16z"/>
            </Svg>
          </View>
          <View style={styles.box}>
            <Svg 
              height={CIRCLE_HEIGHT}
              width={CIRCLE_WIDTH}
              viewBox="0 0 1440 320"
              style={styles.registerTopWaves}>
              <Path fill="#DBF4F4" d={wave}/>
            </Svg>
          </View>
        </View>
      <View style={styles.bot}></View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  profile: {
    justifyContent: 'space-between',
    marginTop: 30
  },  
  top: {
    flex: 0.8,
    alignItems: 'center',
    flexDirection: 'row-reverse',
    backgroundColor: '#DBF4F4',
  },
  box: {
    height: 55,
  },
  bot: {
    flex: 1,
  },
  header: {
    position:'absolute',
    zIndex: 2,
    flexDirection: 'row',
  },
  headerTxt: {
    color: '#457B9D',
    zIndex: 3,
    margin: 50,
    marginTop: HEADER_TEXT,
    fontSize: 25,
  },
});