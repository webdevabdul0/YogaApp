import * as React from 'react';
import {Modal, TouchableOpacity, StyleSheet, Text, View} from 'react-native';
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
import {useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {useSettings} from '../app-settings';
import {PoseDrawFrame} from './Drawing';
import {useSharedValue} from 'react-native-reanimated';
import {vec, type SkPoint} from '@shopify/react-native-skia';
import {
  checkStandingPose,
  checkTreePose,
  TreePoseFeedback,
} from '../postureUtils';
import {CameraScreenProps} from '../navigation/StackParamList';

export const CameraStream: React.FC<CameraScreenProps> = () => {
  const route = useRoute<CameraScreenProps['route']>();

  const {settings} = useSettings();
  const camPerm = useCameraPermission();
  const [permsGranted, setPermsGranted] = React.useState<{
    cam: boolean;
  }>({cam: camPerm.hasPermission});

  const [isLoading, setIsLoading] = React.useState(true); // Loading state

  const [Feedback, setFeedback] = useState<TreePoseFeedback>({
    standingLeg: {correct: false, message: ''},
    liftedLeg: {correct: false, message: ''},
    footPosition: {correct: false, message: ''},
    torso: {correct: false, message: ''},
    treePose: {correct: false, message: ''},
  });

  const renderFeedback = () => {
    const feedbackElements = [];
    if (Feedback.standingLeg.message) {
      feedbackElements.push(
        <Text key="standingLeg" style={styles.feedbackText}>
          {Feedback.standingLeg.message}
        </Text>,
      );
    }
    if (Feedback.liftedLeg.message) {
      feedbackElements.push(
        <Text key="liftedLeg" style={styles.feedbackText}>
          {Feedback.liftedLeg.message}
        </Text>,
      );
    }
    if (Feedback.footPosition.message) {
      feedbackElements.push(
        <Text key="footPosition" style={styles.feedbackText}>
          {Feedback.footPosition.message}
        </Text>,
      );
    }
    if (Feedback.torso.message) {
      feedbackElements.push(
        <Text key="torso" style={styles.feedbackText}>
          {Feedback.torso.message}
        </Text>,
      );
    }
    if (Feedback.treePose.message) {
      feedbackElements.push(
        <Text key="treePose" style={styles.feedbackText}>
          {Feedback.treePose.message}
        </Text>,
      );
    }
    return feedbackElements;
  };

  const targetPose = route.params?.targetPose;

  React.useEffect(() => {
    console.log('Navigated to CameraStream with settings:', settings);

    // Request camera permission during loading
    askForPermissions();
  }, [settings]);

  // Update permissions state after checking
  const askForPermissions = React.useCallback(() => {
    if (camPerm.hasPermission) {
      setPermsGranted(prev => ({...prev, cam: true}));
      setIsLoading(false); // If permission granted, stop loading
    } else {
      camPerm.requestPermission().then(granted => {
        setPermsGranted(prev => ({...prev, cam: granted}));
        setIsLoading(false); // Stop loading after permission is granted
      });
    }
  }, [camPerm]);

  const [active, setActive] = React.useState<CameraPosition>('back'); // Set default to 'front'

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
        setFeedback(feedback);
      }
    },
    [connections, targetPose],
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
        <Text style={styles.loadingText}>Initializing...</Text>
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

        {/* Container for feedback at the bottom */}
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    color: '#000',
  },
  modalMessage: {
    fontSize: 14,
    color: '#71727a',
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
    backgroundColor: '#e3e4e7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#000',
    fontSize: 14,
  },
  confirmButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#eb544d',
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
    backgroundColor: '#FFF0F0',
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
  permsButton: {
    padding: 15.5,
    paddingRight: 25,
    paddingLeft: 25,
    backgroundColor: '#F95F48',
    borderRadius: 5,
    margin: 15,
  },
  permsButtonText: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
  },
  permissionsBox: {
    backgroundColor: '#F3F3F3',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CCCACA',
    marginBottom: 20,
  },
  noPermsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  permsInfoText: {
    fontSize: 15,
    color: 'black',
    marginTop: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
  },
  lottieAnimation: {
    width: 150,
    height: 150,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#eb544d',
    marginTop: 20,
    opacity: 0, // Start with invisible text to animate
    transform: [{translateY: 10}],
  },

  feedbackContainer: {
    position: 'absolute',
    bottom: 20, // Position it at the bottom
    left: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slight background to make text readable
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
});
