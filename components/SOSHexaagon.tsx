import React, {useState}                    from 'react'
import { Text, View, StyleSheet,
         TouchableOpacity 
        }                                   from 'react-native';
import Animated, 
       {
         useAnimatedGestureHandler, 
         useAnimatedStyle, useSharedValue,
         withSpring, runOnJS, 
        }                                    from 'react-native-reanimated';
import { 
          PanGestureHandler, 
          PanGestureHandlerGestureEvent,
        }                                    from 'react-native-gesture-handler';

import { SvgXml }                            from 'react-native-svg';
import { hexagonSVG }                        from '../components/SVG.js'
 

 const SIZE           =   90.0;
 const CIRCLE_RADIUS  =   SIZE * 2;
 var borderWidth      =   5;

 type ContextType = {
  translateX: number,
  translateY: number
 }

 type OnEmergency = {
   onEmergency: () => void;
 }

export default function SettingsScreen(props: OnEmergency ) {


  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const [showBorder, setShowBorder] = useState(false);


  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
      runOnJS(setShowBorder)(!showBorder);

    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;

    },
    onEnd: () => {

      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2)

      translateX.value = withSpring(0);
      translateY.value = withSpring(0);

      if(distance > CIRCLE_RADIUS + SIZE / 2) {
        
        try{
          runOnJS(setShowBorder)(!showBorder);
          runOnJS(props.onEmergency)();
          borderWidth = 5;
        }catch{
          console.log('why');
        }
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
        <View style={styles.circle}
          borderColor={showBorder ? '#E63946' : 'transparent'}>
            <TouchableOpacity onLongPress={() => setShowBorder(!(showBorder))}>
              <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style={[styles.animatedView, rStyle]}>
                  <Text style={styles.sosHexagonText}>SOS</Text>
                  <SvgXml xml={hexagonSVG} width="110%" height="110%" style={styles.hexagonSvg}/>
                </Animated.View>
              </PanGestureHandler>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
   left: '-20%', 
 },
 circle: {
   width: CIRCLE_RADIUS * 2,
   height: CIRCLE_RADIUS * 2,
   alignItems: 'center',
   justifyContent: 'center',
   borderRadius: CIRCLE_RADIUS,
   borderWidth: borderWidth,
   borderColor: 'rgba(230, 57, 70, 0.7)',
   zIndex: -1
 },
 animatedView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
 },
 sosHexagonText: {
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 40,
    zIndex: 2,
    color: '#1D3557'
 },
 hexagonSvg: {
  transform: [
    {rotate: '90deg'}
  ],
 },
 shadow: {
    shadowColor: '#1D3557',
    shadowOpacity: 0.5,
    textShadowRadius: 20,
    textShadowOffset: {
        width: 1,            
        height: 1,
    }   
  },
});