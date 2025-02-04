import * as React from 'react';
import {
  Modal,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  MediapipeCamera,
  RunningMode,
  usePoseDetection,
  KnownPoseLandmarkConnections,
  type DetectionError,
  type PoseDetectionResultBundle,
  type ViewCoordinator,
} from 'react-native-mediapipe';
import {
  useCameraPermission,
  type CameraPosition,
} from 'react-native-vision-camera';
import {useState} from 'react';
import {useSettings} from '../app-settings';
import {PoseDrawFrame} from './Drawing';
import {useSharedValue} from 'react-native-reanimated';
import {vec, type SkPoint} from '@shopify/react-native-skia';
import {
  checkStandingPose,
  checkTreePose,
  checkChairPose,
  checkWarrior2Pose,
  checkTrianglePose,
  TreePoseFeedback,
  ChairPoseFeedback,
  Warrior2PoseFeedback,
  TrianglePoseFeedback,
} from '../postureUtils';
import {CameraScreenProps} from '../navigation/StackParamList';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import icon library
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import SoundPlayer from './components/SoundPlayer';

export const CameraStream: React.FC<CameraScreenProps> = ({
  navigation,
  route,
}) => {
  //Check based on Previous Screen of what pose are we needing
  const {pose} = route.params;
  const targetPose = pose.name;

  const {settings} = useSettings();
  const camPerm = useCameraPermission();
  const [permsGranted, setPermsGranted] = React.useState<{
    cam: boolean;
  }>({cam: camPerm.hasPermission});

  const [isLoading, setIsLoading] = React.useState(true); // Loading state

  const [treePoseFeedback, setTreePoseFeedback] = useState<TreePoseFeedback>({
    standingLeg: {correct: false, message: ''},
    liftedLeg: {correct: false, message: ''},
    footPosition: {correct: false, message: ''},
    torso: {correct: false, message: ''},
    treePose: {correct: false, message: ''},
  });

  const [chairPoseFeedback, setChairPoseFeedback] = useState<ChairPoseFeedback>(
    {
      knees: {correct: false, message: ''},
      hips: {correct: false, message: ''},
      torso: {correct: false, message: ''},
      feet: {correct: false, message: ''},
      chairPose: {correct: false, message: ''},
    },
  );

  const [warrior2PoseFeedback, setWarrior2PoseFeedback] =
    useState<Warrior2PoseFeedback>({
      frontLeg: {correct: false, message: ''},
      backLeg: {correct: false, message: ''},
      feet: {correct: false, message: ''},
      hips: {correct: false, message: ''},
      torso: {correct: false, message: ''},
      arms: {correct: false, message: ''},
      warrior2Pose: {correct: false, message: ''},
    });

  const [trianglePoseFeedback, setTrianglePoseFeedback] =
    useState<TrianglePoseFeedback>({
      frontLeg: {correct: false, message: ''},
      backLeg: {correct: false, message: ''},
      feet: {correct: false, message: ''},
      hips: {correct: false, message: ''},
      torso: {correct: false, message: ''},
      arms: {correct: false, message: ''},
      trianglePose: {correct: false, message: ''}, // Add this for specific Triangle Pose feedback
    });

  const renderFeedback = () => {
    const feedbackElements = [];

    if (targetPose === 'Tree Pose') {
      if (treePoseFeedback.standingLeg.message) {
        feedbackElements.push(
          <Text key="standingLeg" style={styles.feedbackText}>
            {treePoseFeedback.standingLeg.message}
          </Text>,
        );
      }
      if (treePoseFeedback.liftedLeg.message) {
        feedbackElements.push(
          <Text key="liftedLeg" style={styles.feedbackText}>
            {treePoseFeedback.liftedLeg.message}
          </Text>,
        );
      }
      if (treePoseFeedback.footPosition.message) {
        feedbackElements.push(
          <Text key="footPosition" style={styles.feedbackText}>
            {treePoseFeedback.footPosition.message}
          </Text>,
        );
      }
      if (treePoseFeedback.torso.message) {
        feedbackElements.push(
          <Text key="torso" style={styles.feedbackText}>
            {treePoseFeedback.torso.message}
          </Text>,
        );
      }
      if (treePoseFeedback.treePose.message) {
        feedbackElements.push(
          <Text key="treePose" style={styles.feedbackText}>
            {treePoseFeedback.treePose.message}
          </Text>,
        );
      }
    } else if (targetPose === 'Chair Pose') {
      if (chairPoseFeedback.knees.message) {
        feedbackElements.push(
          <Text key="knees" style={styles.feedbackText}>
            {chairPoseFeedback.knees.message}
          </Text>,
        );
      }
      if (chairPoseFeedback.hips.message) {
        feedbackElements.push(
          <Text key="hips" style={styles.feedbackText}>
            {chairPoseFeedback.hips.message}
          </Text>,
        );
      }
      if (chairPoseFeedback.torso.message) {
        feedbackElements.push(
          <Text key="torso" style={styles.feedbackText}>
            {chairPoseFeedback.torso.message}
          </Text>,
        );
      }
      if (chairPoseFeedback.feet.message) {
        feedbackElements.push(
          <Text key="feet" style={styles.feedbackText}>
            {chairPoseFeedback.feet.message}
          </Text>,
        );
      }
      if (chairPoseFeedback.chairPose.message) {
        feedbackElements.push(
          <Text key="chairPose" style={styles.feedbackText}>
            {chairPoseFeedback.chairPose.message}
          </Text>,
        );
      }
    } else if (targetPose === 'Warrior II') {
      if (warrior2PoseFeedback.frontLeg.message) {
        feedbackElements.push(
          <Text key="frontLeg" style={styles.feedbackText}>
            {warrior2PoseFeedback.frontLeg.message}
          </Text>,
        );
      }
      if (warrior2PoseFeedback.backLeg.message) {
        feedbackElements.push(
          <Text key="backLeg" style={styles.feedbackText}>
            {warrior2PoseFeedback.backLeg.message}
          </Text>,
        );
      }
      if (warrior2PoseFeedback.feet.message) {
        feedbackElements.push(
          <Text key="feet" style={styles.feedbackText}>
            {warrior2PoseFeedback.feet.message}
          </Text>,
        );
      }
      if (warrior2PoseFeedback.hips.message) {
        feedbackElements.push(
          <Text key="hips" style={styles.feedbackText}>
            {warrior2PoseFeedback.hips.message}
          </Text>,
        );
      }
      if (warrior2PoseFeedback.torso.message) {
        feedbackElements.push(
          <Text key="torso" style={styles.feedbackText}>
            {warrior2PoseFeedback.torso.message}
          </Text>,
        );
      }
      if (warrior2PoseFeedback.arms.message) {
        feedbackElements.push(
          <Text key="arms" style={styles.feedbackText}>
            {warrior2PoseFeedback.arms.message}
          </Text>,
        );
      }
      if (warrior2PoseFeedback.warrior2Pose.message) {
        feedbackElements.push(
          <Text key="warrior2Pose" style={styles.feedbackText}>
            {warrior2PoseFeedback.warrior2Pose.message}
          </Text>,
        );
      }
    } else if (targetPose === 'Triangle Pose') {
      if (trianglePoseFeedback.frontLeg.message) {
        feedbackElements.push(
          <Text key="frontLeg" style={styles.feedbackText}>
            {trianglePoseFeedback.frontLeg.message}
          </Text>,
        );
      }
      if (trianglePoseFeedback.backLeg.message) {
        feedbackElements.push(
          <Text key="backLeg" style={styles.feedbackText}>
            {trianglePoseFeedback.backLeg.message}
          </Text>,
        );
      }
      if (trianglePoseFeedback.feet.message) {
        feedbackElements.push(
          <Text key="feet" style={styles.feedbackText}>
            {trianglePoseFeedback.feet.message}
          </Text>,
        );
      }
      if (trianglePoseFeedback.hips.message) {
        feedbackElements.push(
          <Text key="hips" style={styles.feedbackText}>
            {trianglePoseFeedback.hips.message}
          </Text>,
        );
      }
      if (trianglePoseFeedback.torso.message) {
        feedbackElements.push(
          <Text key="torso" style={styles.feedbackText}>
            {trianglePoseFeedback.torso.message}
          </Text>,
        );
      }
      if (trianglePoseFeedback.arms.message) {
        feedbackElements.push(
          <Text key="arms" style={styles.feedbackText}>
            {trianglePoseFeedback.arms.message}
          </Text>,
        );
      }
      if (trianglePoseFeedback.trianglePose.message) {
        feedbackElements.push(
          <Text key="trianglePose" style={styles.feedbackText}>
            {trianglePoseFeedback.trianglePose.message}
          </Text>,
        );
      }

      return feedbackElements;
    }
  };

  //Handles Ending the Session
  const handleEndSession = async () => {
    try {
      // Mark session attendance in Firestore
      const user = auth().currentUser;
      if (!user) {
        console.log('User not logged in');
        return; // Handle case when user is not logged in
      }

      const userId = user.uid; // Get the current user ID
      const sessionDate = new Date(); // Current date and time
      const sessionDay = sessionDate.getDay(); // Day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const todayDate = sessionDate.toISOString().split('T')[0]; // YYYY-MM-DD format

      // Get the user's Firestore document
      const userDoc = await firestore().collection('users').doc(userId).get();
      if (!userDoc.exists) {
        console.error('User document does not exist.');
        return;
      }

      const userData = userDoc.data();
      const currentStreak = userData?.streak || 0;
      const lastSessionDate = userData?.lastSessionDate;
      let sessionDays = userData?.sessionDays || [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ]; // Initialize sessionDays if not present

      let newStreak = currentStreak;

      console.log('Session Days are as follow', sessionDays);
      // Log to see if lastSessionDate is correctly fetched
      console.log('Last session date:', lastSessionDate);

      // Check if the user attended today and if streak should be incremented
      if (lastSessionDate !== todayDate) {
        // Increment streak or reset based on last session date
        if (lastSessionDate) {
          const lastDate = new Date(lastSessionDate);
          const dayDiff = (sessionDate - lastDate) / (1000 * 3600 * 24); // Day difference

          console.log('Day difference:', dayDiff);

          if (dayDiff === 1) {
            newStreak = currentStreak + 1;
          } else if (dayDiff > 1) {
            newStreak = 1; // Restart streak if more than 1 day gap
          }
        } else {
          newStreak = 1; // First session
        }

        // Mark the current day as attended
        sessionDays[sessionDay] = true; // Mark the corresponding day as attended

        // Update streak and sessionDays in Firestore
        await firestore().collection('users').doc(userId).update({
          streak: newStreak,
          lastSessionDate: todayDate,
          sessionDays: sessionDays, // Store updated days attended
        });

        console.log('Streak updated:', newStreak);
        console.log('Session Days:', sessionDays);
      }

      // Proceed to session details page or other necessary actions
      navigation.navigate('PoseDetail', {pose});
    } catch (error) {
      console.error('Error handling session:', error);
    }
  };

  const [timer, setTimer] = React.useState(() => {
    // Set the initial timer based on pose.name
    switch (pose.name) {
      case 'Tree Pose':
        return 30; // 30 seconds for Tree Pose
      case 'Chair Pose':
        return 30; // 45 seconds for Chair Pose
      case 'Warrior II':
        return 10; // 10 seconds for Warrior II
      case 'Triangle Pose':
        return 30; // 60 seconds for Triangle Pose
      default:
        return 30; // Default to 30 seconds if pose.name is unknown
    }
  });

  const [timerActive, setTimerActive] = React.useState(false); // Initially the timer is not active

  React.useEffect(() => {
    if (!timerActive) return;

    const intervalId = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 0) {
          clearInterval(intervalId);
          handleEndSession(); // Automatically end session when timer hits 0
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000); // Decrease timer every second

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [timerActive]);

  const formattedTime = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`;

  React.useEffect(() => {
    console.log('Navigated to CameraStream with settings:', settings);

    // Request camera permission during loading
    askForPermissions();
  }, [settings]);

  const askForPermissions = React.useCallback(() => {
    if (camPerm.hasPermission) {
      setPermsGranted(prev => ({...prev, cam: true}));
      setIsLoading(false);
    } else {
      camPerm.requestPermission().then(granted => {
        setPermsGranted(prev => ({...prev, cam: granted}));
        setIsLoading(false);
      });
    }
  }, [camPerm]);

  const [active, setActive] = React.useState<CameraPosition>('back');
  // Camera switch function
  const toggleCamera = () => {
    setActive(prev => (prev === 'back' ? 'front' : 'back'));
  };

  const connections = useSharedValue<SkPoint[]>([]);
  const [postureCorrect, setPostureCorrect] = React.useState(false);

  const onResults = React.useCallback(
    (results: PoseDetectionResultBundle, vc: ViewCoordinator): void => {
      if (!results || !results.results || results.results.length === 0) {
        console.log('No results or landmarks detected.');
        return;
      }

      const frameDims = vc.getFrameDims(results);
      if (!frameDims) {
        console.log('Invalid frame dimensions.');
        return;
      }

      const pts = results.results[0]?.landmarks?.[0] ?? [];
      if (!pts.length) {
        console.log('Landmarks are missing or empty.');
        return;
      }

      const newLines: SkPoint[] = [];
      for (const connection of KnownPoseLandmarkConnections) {
        const [a, b] = connection;

        const pt1 = pts[a] ? vc.convertPoint(frameDims, pts[a]) : null;
        const pt2 = pts[b] ? vc.convertPoint(frameDims, pts[b]) : null;

        if (pt1 && pt2) {
          newLines.push(vec(pt1.x, pt1.y));
          newLines.push(vec(pt2.x, pt2.y));
        }
      }

      connections.value = newLines;

      if (targetPose === 'Standing Pose') {
        const isStanding = checkStandingPose(pts);
        setPostureCorrect(isStanding);
      } else if (targetPose === 'Tree Pose') {
        const feedback = checkTreePose(pts);
        setTreePoseFeedback(feedback); // Set Tree Pose feedback
        if (feedback.treePose.correct && !timerActive) {
          setTimerActive(true); // Start the timer when the pose is correct for the first time
        } else if (!feedback.treePose.correct && timerActive) {
          setTimerActive(false); // Stop the timer if pose is not correct
        }
      } else if (targetPose === 'Chair Pose') {
        const feedback = checkChairPose(pts);
        setChairPoseFeedback(feedback); // Set Chair Pose feedback

        if (feedback.chairPose.correct && !timerActive) {
          setTimerActive(true); // Start the timer when the pose is correct for the first time
        } else if (!feedback.chairPose.correct && timerActive) {
          setTimerActive(false); // Stop the timer if pose is not correct
        }
      } else if (targetPose === 'Warrior II') {
        const feedback = checkWarrior2Pose(pts);
        setWarrior2PoseFeedback(feedback); // Set Warrior II Pose feedback

        if (feedback.warrior2Pose.correct && !timerActive) {
          setTimerActive(true); // Start the timer when the pose is correct for the first time
        } else if (!feedback.warrior2Pose.correct && timerActive) {
          setTimerActive(false); // Stop the timer if pose is not correct
        }
      } else if (targetPose === 'Triangle Pose') {
        // Add logic for Triangle Pose
        const feedback = checkTrianglePose(pts);
        setTrianglePoseFeedback(feedback); // Set Triangle Pose feedback

        if (feedback.trianglePose.correct && !timerActive) {
          setTimerActive(true); // Start the timer when the pose is correct for the first time
        } else if (!feedback.trianglePose.correct && timerActive) {
          setTimerActive(false); // Stop the timer if pose is not correct
        }
      }
    },
    [connections, targetPose, timerActive],
  );

  const onError = React.useCallback((error: DetectionError): void => {
    console.log(`error: ${error}`);
  }, []);

  const poseDetection = usePoseDetection(
    {
      onResults: onResults,
      onError: onError,
    },
    RunningMode.LIVE_STREAM,
    `${settings.model}.task`,
    {fpsMode: 30},
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Setting up Camera...</Text>
      </View>
    );
  }

  if (permsGranted.cam) {
    return (
      <View style={styles.container}>
        <MediapipeCamera
          style={styles.box}
          solution={poseDetection}
          activeCamera={active}
          resizeMode="cover"
        />

        <PoseDrawFrame connections={connections} style={styles.box} />

        <TouchableOpacity
          style={styles.cameraSwitchButton}
          onPress={toggleCamera}>
          <Ionicons name="camera-reverse" size={30} color="white" />
        </TouchableOpacity>

        {/* Conditionally Render SoundPlayer if musicEnabled is true */}
        {settings.musicEnabled && (
          <View className="absolute top-10 left-5">
            <SoundPlayer />
          </View>
        )}

        <View style={styles.timerContainer}>
          {targetPose === 'Tree Pose' &&
            treePoseFeedback.treePose.correct === false && (
              <Text style={styles.poseMessage}>Make a {pose.name}</Text>
            )}
          {targetPose === 'Tree Pose' &&
            treePoseFeedback.treePose.correct === true && (
              <Text style={styles.poseMessage}>Good! Stay in Position</Text>
            )}

          {targetPose === 'Chair Pose' &&
            chairPoseFeedback.chairPose.correct === false && (
              <Text style={styles.poseMessage}>Make a {pose.name}</Text>
            )}
          {targetPose === 'Chair Pose' &&
            chairPoseFeedback.chairPose.correct === true && (
              <Text style={styles.poseMessage}>Good! Stay in Position</Text>
            )}

          {targetPose === 'Warrior II' &&
            warrior2PoseFeedback.warrior2Pose.correct === false && (
              <Text style={styles.poseMessage}>Make a {pose.name}</Text>
            )}
          {targetPose === 'Warrior II' &&
            warrior2PoseFeedback.warrior2Pose.correct === true && (
              <Text style={styles.poseMessage}>Good! Stay in Position</Text>
            )}

          {targetPose === 'Triangle Pose' &&
            trianglePoseFeedback.trianglePose.correct === false && (
              <Text style={styles.poseMessage}>Make a {pose.name}</Text>
            )}
          {targetPose === 'Triangle Pose' &&
            trianglePoseFeedback.trianglePose.correct === true && (
              <Text style={styles.poseMessage}>Good! Stay in Position</Text>
            )}

          <Text style={styles.timerText}>{formattedTime}</Text>
        </View>

        {/* End Session Button */}
        <TouchableOpacity
          style={styles.endSessionButton}
          onPress={() => navigation.navigate('PoseDetail', {pose})}>
          <Text style={styles.endSessionText}>End Session</Text>
        </TouchableOpacity>

        <View style={styles.feedbackContainer}>{renderFeedback()}</View>
      </View>
    );
  } else {
    return <NeedPermissions askForPermissions={askForPermissions} />;
  }
};

const NeedPermissions: React.FC<{askForPermissions: () => void}> = ({
  askForPermissions,
}) => {
  return (
    <Modal transparent={true} visible={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Allow Camera and Microphone</Text>
          <Text style={styles.modalMessage}>
            App needs access to your camera and microphone for Pose Detection to
            work.
          </Text>
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => console.log('Cancel')}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={askForPermissions}>
              <Text style={styles.confirmButtonText}>Allow</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  endSessionButton: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: '#EB544D',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  endSessionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#E3E4E7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 14,
  },
  confirmButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#EB544D',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#F6F6F6',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  box: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  feedbackContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  feedbackText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EB544D',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
  },
  cameraSwitchButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  timerContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Arial', // Choose a beautiful font
  },
  poseMessage: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});
