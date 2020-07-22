import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Animated, {
  abs,
  add,
  sub,
  max,
  call,
  clockRunning,
  cond,
  eq,
  not,
  set,
  useCode,
  min,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  State,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
  minus,
  clamp,
  panGestureHandler,
} from 'react-native-redash';
import Colors from '../../../constants/Colors';
import {Dropdown} from 'react-native-material-dropdown';
import {data} from '../../../constants/data';
import Action from '../Cart/Action';
const {height, width} = Dimensions.get('screen');
export const {heightValue} = height * 0.28;
const {wSwipeOut} = width * 0.5;
const CartItem = props => {
  //console.log(props.image)
  //Line
  const Line = props => {
    return <View style={styles.line} />;
  };
  //Swipe Animation
  const {gestureHandler, translation, velocity, state} = usePanGestureHandler();
  const snapPoints = [-width, -(width * 0.35), 0];
  const translateX = useValue(0);
  const offsetX = useValue(0);
  const heightAnimation = useValue(heightValue);
  const clock = useClock(); //the animation has finished , animation is over => clock
  const to = snapPoint(translateX, velocity.x, snapPoints);
  const shouldRemove = eq(to, -width);
  const changeDetailHandle = () => {
    return props.changeDetails(props.idRemove, 0);
  };
  useCode(
    () => [
      cond(
        eq(state, State.ACTIVE),
        set(translateX, add(offsetX, min(translation.x, 0))), //use min lock swipe out form left
      ), //neu gia tri ban dau ban 1 thi keo ok,
      cond(eq(state, State.END), [
        set(translateX, timing({clock, from: translateX, to})), //set swipe cho muot
         set(offsetX, translateX),
        // cond(shouldRemove, [
        //   set(heightAnimation, timing({from: heightValue, to: 0})),
        //   //set(deleteOpacity, 0),
        //   //cond(not(clockRunning(clock)), call([], changeDetailHandle)),
        // ]),
      ]),
    ],
    [changeDetailHandle],
  );
  return (
    <Animated.View>
      <View style={styles.background}>
        <Action  x={abs(translateX)}/>
      </View>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={{heightAnimation, transform: [{translateX}]}}>
          <View style={styles.container}>
            <View style={styles.imageTitle}>
              <TouchableOpacity onPress={props.onClick}>
                <Image style={styles.image} source={{uri: props.image}} />
              </TouchableOpacity>
              <View style={{marginLeft: 20}}>
                <TouchableOpacity
                  onPress={props.onClick}
                  style={styles.textRange}>
                  <Text numberOfLines={2} style={{fontSize: 20}}>
                    {props.title}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.details}>
              <Dropdown
                fontSize={20}
                labelFontSize={18}
                value={props.quantity}
                containerStyle={styles.dropDown}
                label="数量"
                data={data}
                pickerStyle={{borderBottomColor: 'transparent', borderWidth: 0}}
                dropdownOffset={{top: 30}}
                onChangeText={value =>
                  props.changeDetails(props.idRemove, value)
                }
              />
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                ¥ {Math.round(props.amount * 100) / 100}
              </Text>
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.viewLine}>
        <Line />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  textRange: {
    width: width * 0.65,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E1E2E3',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
    //width: -400,
  },

  textStyle: {
    fontSize: 20,
  },

  total: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dropDown: {
    width: '35%',
  },

  headerText: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
  },
  menuContent: {
    color: '#000',
    fontWeight: 'bold',
    padding: 2,
    fontSize: 20,
  },

  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  imageTitle: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },

  image: {
    height: height / 7,
    width: width / 4,
  },

  container: {
    padding: 20,
    backgroundColor: 'white',
    height: heightValue,
  },
  viewLine: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  line: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.background,
    //marginTop: 10,
    width: 0.9 * width,
  },
});
export default CartItem;

{
  /* <Animated.View>
      <PanGestureHandler {...gestureHander}>
        <Animated.View style={{transform: [{translateX}]}}>
          <View style={styles.container}>
            <View style={styles.imageTitle}>
              <TouchableOpacity onPress={props.onClick}>
                <Image style={styles.image} source={{uri: props.image}} />
              </TouchableOpacity>
              <View style={{marginLeft: 5}}>
                <TouchableOpacity onPress={props.onClick}>
                  <Text style={{fontSize: 25}}>{props.title}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.details}>
              <Dropdown
                fontSize={20}
                labelFontSize={18}
                value={props.quantity}
                containerStyle={styles.dropDown}
                label="数量"
                data={data}
                pickerStyle={{borderBottomColor: 'transparent', borderWidth: 0}}
                dropdownOffset={{top: 30}}
                onChangeText={value =>
                  props.changeDetails(props.idRemove, value)
                }
              />
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                ¥ {Math.round(props.amount * 100) / 100}
              </Text>
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View> */
}
