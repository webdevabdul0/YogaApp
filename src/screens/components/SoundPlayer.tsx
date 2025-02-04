import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import yogaMusic from '../../assets/yogaMusic.mp3';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSettings} from '../../app-settings'; // Import global settings

const SoundPlayer = () => {
  const {settings} = useSettings(); // Access global settings
  const [playSound, setPlaySound] = useState(false);
  const [playerInitialized, setPlayerInitialized] = useState(false);
  const [trackAdded, setTrackAdded] = useState(false);

  // Function to initialize the player
  const setupPlayer = async () => {
    if (!playerInitialized) {
      console.log('Initializing player...');
      await TrackPlayer.setupPlayer();
      setPlayerInitialized(true);
    }
  };

  // Function to add the track if not already added
  const addTrack = async () => {
    if (!trackAdded) {
      console.log('Adding track...');
      await TrackPlayer.add({
        id: 'track_1',
        url: yogaMusic,
        title: 'Yoga Music',
        artist: 'Unknown Artist',
        artwork: 'https://example.com/cover.jpg',
      });
      setTrackAdded(true);
    }
  };

  // Function to toggle play/pause
  const handleToggleSound = async () => {
    if (playSound) {
      console.log('Stopping sound...');
      await TrackPlayer.stop();
    } else {
      console.log('Playing sound...');
      await setupPlayer(); // Ensure player is initialized
      await addTrack(); // Ensure track is added
      await TrackPlayer.play();
    }
    setPlaySound(prev => !prev);
  };

  // Reset the player when musicEnabled is set to false
  useEffect(() => {
    const resetPlayer = async () => {
      if (!settings.musicEnabled) {
        console.log('Music disabled, stopping and resetting player...');
        await TrackPlayer.stop();
        await TrackPlayer.reset();
        setPlaySound(false);
        setPlayerInitialized(false);
        setTrackAdded(false);
      } else {
        console.log('Music enabled, initializing player...');
        await setupPlayer();
        await addTrack();
      }
    };
    resetPlayer();
  }, [settings.musicEnabled]); // Run when musicEnabled changes

  // Cleanup when the component unmounts
  useEffect(() => {
    return () => {
      console.log('Cleaning up...');
      TrackPlayer.stop();
    };
  }, []);

  return (
    <TouchableOpacity onPress={handleToggleSound} style={{padding: 10}}>
      <Icon
        name={playSound ? 'music-note' : 'music-off'}
        size={30}
        color={playSound ? 'green' : 'red'}
      />
    </TouchableOpacity>
  );
};

export default SoundPlayer;
