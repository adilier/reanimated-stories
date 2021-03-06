import React from 'react';
import {Dimensions, StyleSheet, Pressable} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

interface Data {
  id: number;
  title: string;
}

interface PageProps {
  item: Data;
  index: number;
  translateX: Animated.SharedValue<number>;
  lastIndex: number;
  ref: any;
  actualScreen: Data[];
}

const Page: React.FC<PageProps> = React.forwardRef(
  ({index, translateX, lastIndex, actualScreen, item}, ref) => {
    const inputRange = [
      (-index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const ImageStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        translateX.value,
        inputRange,
        [0.5, 1, 0.5],
        Extrapolate.CLAMP,
      );

      return {
        opacity,
      };
    });

    const PageStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        translateX.value,
        inputRange,
        [0.5, 1, 0.5],
        Extrapolate.CLAMP,
      );

      return {
        transform: [{scale}],
      };
    });

    return (
      <Animated.View style={[styles.container, PageStyle]}>
        <Pressable style={{width: '100%', height: '100%'}}>
          <Animated.Image
            style={[ImageStyle, styles.image]}
            source={{
              uri: 'https://images.unsplash.com/photo-1625602187345-8f83e1213bfa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80',
            }}
          />
        </Pressable>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {width: '100%', height: '100%'},
});

export default Page;
