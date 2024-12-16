import React from 'react';
import {Canvas, Points, type SkPoint} from '@shopify/react-native-skia';
import {type StyleProp, type ViewStyle} from 'react-native';
import {SharedValue} from 'react-native-reanimated';

interface PoseDrawFrameProps {
  style?: StyleProp<ViewStyle>;
  connections: SharedValue<SkPoint[]>; // This prop is now the only one
}

export const PoseDrawFrame: React.FC<PoseDrawFrameProps> = ({
  style,
  connections, // add connections to destructure
}) => {
  return (
    <Canvas style={style}>
      <Points
        points={connections}
        mode="lines"
        color={'green'}
        style={'stroke'}
        strokeWidth={3}
      />
      <Points
        points={connections}
        mode="points"
        color={'red'}
        style={'stroke'}
        strokeWidth={5}
        strokeCap={'round'}
      />
    </Canvas>

    /*
   
      */
  );
};

const COLOR_NAMES = [
  'Coral',
  'DarkCyan',
  'DeepSkyBlue',
  'ForestGreen',
  'GoldenRod',
  'MediumOrchid',
  'SteelBlue',
  'Tomato',
  'Turquoise',
  'SlateGray',
  'DodgerBlue',
  'FireBrick',
  'Gold',
  'HotPink',
  'LimeGreen',
  'Navy',
  'OrangeRed',
  'RoyalBlue',
  'SeaGreen',
  'Violet',
] as const;

type ColorName = (typeof COLOR_NAMES)[number];
