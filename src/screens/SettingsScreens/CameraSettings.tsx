import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing FontAwesome icons
import {Switch} from 'react-native';
import {CameraSettingsScreenProps} from '../../navigation/StackParamList';

import Slider from '@react-native-community/slider';
import RNPickerSelect from 'react-native-picker-select';
import {Delegate} from 'react-native-mediapipe';
import {useSettings} from '../../app-settings';

type SlidersComponentProps = {
  label: (value: number) => string;
  value: number;
  setValue: (value: number) => void;
  minValue?: number;
  maxValue?: number;
};

type SelectComponentProps = {
  label: string;
  value: unknown;
  setValue: (value: unknown) => void;
  items: {label: string; value: unknown}[];
};

const OptionSlider: React.FC<SlidersComponentProps> = ({
  label,
  value,
  setValue,
  minValue = 1,
  maxValue = 10,
}) => {
  const [curValue, setCurValue] = React.useState(value);
  return (
    <View style={styles.item}>
      <Text className="text-md text-black font-medium">{label(curValue)}</Text>
      <Slider
        value={curValue}
        onValueChange={setCurValue}
        onSlidingComplete={setValue}
        minimumValue={minValue}
        maximumValue={maxValue}
        step={1}
        style={styles.slider}
        minimumTrackTintColor="#ED706A" // Red color for the active track
        maximumTrackTintColor="#ddd" // Lighter gray for the inactive track
        thumbTintColor="#ED706A" // Red for the thumb (slider knob)
      />
    </View>
  );
};

const OptionSelect: React.FC<SelectComponentProps> = ({
  label,
  value,
  setValue,
  items,
}) => {
  return (
    <View style={styles.item}>
      <Text className="text-md text-black font-medium">{label}</Text>
      <RNPickerSelect
        value={value}
        onValueChange={setValue}
        style={{inputAndroid: styles.picker, inputIOS: styles.picker}}
        useNativeAndroidPickerStyle={false}
        items={items}
      />
    </View>
  );
};

const theme = {
  primary: '#eb544d',
  black: '#000000',
  secondary: '#71727a',
  background: '#ffffff',
  avatarBackground: '#fde8e8',
  borderColor: '#e3e4e7',
};

const CameraSettingsScreen: React.FC<CameraSettingsScreenProps> = ({
  navigation,
}) => {
  const {settings, setSettings} = useSettings(); // Access global settings

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-8 left-6 bg-black/30 p-3 rounded-lg">
        <Icon name="chevron-left" size={15} color="white" />
      </TouchableOpacity>
      <Text className="absolute self-center top-8 transform text-3xl font-bold text-gray-800">
        My<Text className="text-[#ED706A]">Yoga</Text>
      </Text>

      <View style={styles.container2}>
        <OptionSelect
          label="Processor: "
          value={settings.processor}
          setValue={value => {
            setSettings({...settings, processor: value as Delegate});
          }}
          items={[
            {label: 'CPU', value: Delegate.CPU},
            {label: 'GPU', value: Delegate.GPU},
          ]}
        />

        <OptionSelect
          label="Model selections: "
          value={settings.model}
          setValue={value => setSettings({...settings, model: value as string})}
          items={[
            {label: 'Lite', value: 'pose_landmarker_lite'},
            {label: 'Full', value: 'pose_landmarker_full'},
            {label: 'Heavy', value: 'pose_landmarker_heavy'},
          ]}
        />
        <OptionSlider
          label={value => `Max results: ${value}`}
          value={settings.maxResults}
          setValue={value => setSettings({...settings, maxResults: value})}
        />
        <OptionSlider
          label={value => `Score threshold: ${value}%`}
          value={settings.threshold}
          setValue={value => setSettings({...settings, threshold: value})}
          minValue={0}
          maxValue={100}
        />

        {/* Music Toggle Switch */}
        <View style={styles.item} className="w-[350px]">
          <Text className="text-md text-black font-medium">
            Use Music During Yoga Sessions
          </Text>
          <Switch
            value={settings.musicEnabled} // Use global settings
            onValueChange={value =>
              setSettings({...settings, musicEnabled: value})
            } // Update globally
            trackColor={{false: '#ddd', true: '#ED706A'}} // Colors for inactive and active states
            thumbColor={settings.musicEnabled ? '#ED706A' : '#f4f3f4'} // Thumb color
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  container2: {
    flex: 1,
    marginTop: 100,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderColor,
  },
  slider: {width: 350, height: 40},
  picker: {width: 320, height: 40, marginLeft: 15, marginTop: 5},
});

export default CameraSettingsScreen;
