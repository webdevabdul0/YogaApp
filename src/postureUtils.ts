import {KnownPoseLandmarks} from 'react-native-mediapipe';

// Function to calculate the angle between three points
// Function to calculate the angle between three 2D points
export const calculateAngle = (
  p1: {x: number; y: number},
  p2: {x: number; y: number},
  p3: {x: number; y: number},
): number => {
  // Calculate the differences
  const dx1 = p1.x - p2.x;
  const dy1 = p1.y - p2.y;
  const dx2 = p3.x - p2.x;
  const dy2 = p3.y - p2.y;

  // Calculate the angle in radians
  const radians1 = Math.atan2(dy1, dx1);
  const radians2 = Math.atan2(dy2, dx2);
  let angleRad = radians2 - radians1;

  // Convert angle from radians to degrees
  let angleDeg = Math.abs((angleRad * 180.0) / Math.PI);

  // Ensure angle is within 0-180 degrees
  if (angleDeg > 180.0) {
    angleDeg = 360 - angleDeg;
  }

  return angleDeg;
};

// Function to check if the pose is a standing pose just for testing
export const checkStandingPose = (landmarks: any[]): boolean => {
  const leftHip = landmarks[KnownPoseLandmarks.leftHip];
  const leftKnee = landmarks[KnownPoseLandmarks.leftKnee];
  const leftAnkle = landmarks[KnownPoseLandmarks.leftAnkle];

  if (leftHip && leftKnee && leftAnkle) {
    const kneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
    console.log(
      `Angle between points: (${leftHip.x}, ${leftHip.y}), (${leftKnee.x}, ${leftKnee.y}), (${leftAnkle.x}, ${leftAnkle.y}) is ${kneeAngle} degrees`,
    );

    const expectedKneeAngleMin = 170;
    const expectedKneeAngleMax = 190;

    const isStandingPose =
      kneeAngle >= expectedKneeAngleMin && kneeAngle <= expectedKneeAngleMax;
    console.log(`Knee Angle: ${kneeAngle}, Standing Pose: ${isStandingPose}`);

    return isStandingPose;
  }

  return false;
};

//Typescript Types
export interface TreePoseFeedback {
  standingLeg: {correct: boolean; message: string}; // true if correct, false if incorrect with feedback message
  liftedLeg: {correct: boolean; message: string}; // true if correct, false if incorrect with feedback message
  footPosition: {correct: boolean; message: string}; // true if correct, false if incorrect with feedback message
  torso: {correct: boolean; message: string}; // true if correct, false if incorrect with feedback message
  treePose: {correct: boolean; message: string}; // true if correct, false if incorrect with feedback message
}

export interface ChairPoseFeedback {
  knees: {correct: boolean; message: string};
  hips: {correct: boolean; message: string};
  torso: {correct: boolean; message: string};
  feet: {correct: boolean; message: string};
  chairPose: {correct: boolean; message: string};
}

export interface Warrior2PoseFeedback {
  frontLeg: {correct: boolean; message: string};
  backLeg: {correct: boolean; message: string};
  feet: {correct: boolean; message: string};
  hips: {correct: boolean; message: string};
  torso: {correct: boolean; message: string};
  arms: {correct: boolean; message: string};
  warrior2Pose: {correct: boolean; message: string};
}

export interface TrianglePoseFeedback {
  frontLeg: {correct: boolean; message: string};
  backLeg: {correct: boolean; message: string};
  feet: {correct: boolean; message: string};
  hips: {correct: boolean; message: string};
  torso: {correct: boolean; message: string};
  arms: {correct: boolean; message: string};
  trianglePose: {correct: boolean; message: string};
}

// Function to check if the pose is Tree Pose
export const checkTreePose = (landmarks: any[]): TreePoseFeedback => {
  const leftHip = landmarks[KnownPoseLandmarks.leftHip];
  const leftKnee = landmarks[KnownPoseLandmarks.leftKnee];
  const leftAnkle = landmarks[KnownPoseLandmarks.leftAnkle];
  const rightHip = landmarks[KnownPoseLandmarks.rightHip];
  const rightKnee = landmarks[KnownPoseLandmarks.rightKnee];
  const rightAnkle = landmarks[KnownPoseLandmarks.rightAnkle];
  const leftFootIndex = landmarks[KnownPoseLandmarks.leftFootIndex];
  const rightFootIndex = landmarks[KnownPoseLandmarks.rightFootIndex];
  const leftShoulder = landmarks[KnownPoseLandmarks.leftShoulder];
  const rightShoulder = landmarks[KnownPoseLandmarks.rightShoulder];

  const feedback: TreePoseFeedback = {
    standingLeg: {correct: false, message: ''},
    liftedLeg: {correct: false, message: ''},
    footPosition: {correct: false, message: ''},
    torso: {correct: false, message: ''},
    treePose: {correct: false, message: ''},
  };

  if (
    leftHip &&
    leftKnee &&
    leftAnkle &&
    rightHip &&
    rightKnee &&
    rightAnkle &&
    leftFootIndex &&
    rightFootIndex &&
    leftShoulder &&
    rightShoulder
  ) {
    // Check standing leg
    // Check standing leg
    const standingLegKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
    feedback.standingLeg.correct =
      standingLegKneeAngle >= 170 && standingLegKneeAngle <= 190;
    feedback.standingLeg.message = feedback.standingLeg.correct
      ? ''
      : standingLegKneeAngle < 170
      ? 'Try to bend your standing leg (left leg) a little more.'
      : 'Straighten your standing leg (left leg) a bit more.';

    // Check lifted leg
    const liftedLegKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);
    feedback.liftedLeg.correct =
      liftedLegKneeAngle >= 20 && liftedLegKneeAngle <= 45;
    feedback.liftedLeg.message = feedback.liftedLeg.correct
      ? ''
      : liftedLegKneeAngle < 20
      ? 'Lift your right leg a bit higher.'
      : 'Lower your right leg a bit to align with the correct angle (20-45 degrees).';

    // Check foot position
    feedback.footPosition.correct =
      Math.abs(rightFootIndex.y - leftHip.y) < 0.3 &&
      Math.abs(rightFootIndex.x - leftHip.x) < 0.3;
    feedback.footPosition.message = feedback.footPosition.correct
      ? ''
      : 'Move your right foot closer to the standing leg (left foot) for better balance.';

    // Check torso alignment
    const torsoAngle = calculateAngle(leftShoulder, leftHip, rightShoulder);
    feedback.torso.correct = torsoAngle >= 20 && torsoAngle <= 35;
    feedback.torso.message = feedback.torso.correct
      ? ''
      : torsoAngle < 20
      ? 'Straighten your torso a little more.'
      : 'Lean your torso forward a bit to align it correctly (20-35 degrees).';

    // Check if all conditions are correct and set treePose to true
    feedback.treePose.correct =
      feedback.standingLeg.correct &&
      feedback.liftedLeg.correct &&
      feedback.torso.correct;
    feedback.treePose.message = feedback.treePose.correct
      ? ''
      : 'Your pose isn’t quite right yet. Make sure the left leg is standing and the right leg is lifted as described.';
  }

  return feedback;
};

// Function to check if the pose is Tree Pose
export const checkChairPose = (landmarks: any[]): ChairPoseFeedback => {
  const leftHip = landmarks[KnownPoseLandmarks.leftHip];
  const leftKnee = landmarks[KnownPoseLandmarks.leftKnee];
  const leftAnkle = landmarks[KnownPoseLandmarks.leftAnkle];
  const rightHip = landmarks[KnownPoseLandmarks.rightHip];
  const rightKnee = landmarks[KnownPoseLandmarks.rightKnee];
  const rightAnkle = landmarks[KnownPoseLandmarks.rightAnkle];

  const leftShoulder = landmarks[KnownPoseLandmarks.leftShoulder];
  const rightShoulder = landmarks[KnownPoseLandmarks.rightShoulder];

  const feedback: ChairPoseFeedback = {
    knees: {correct: false, message: ''},
    hips: {correct: false, message: ''},
    torso: {correct: false, message: ''},
    feet: {correct: false, message: ''},
    chairPose: {correct: false, message: ''},
  };

  if (
    leftHip &&
    leftKnee &&
    leftAnkle &&
    rightHip &&
    rightKnee &&
    rightAnkle &&
    leftShoulder &&
    rightShoulder
  ) {
    // **Check Knee Bend**
    const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
    const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);

    feedback.knees.correct =
      leftKneeAngle >= 85 &&
      leftKneeAngle <= 105 &&
      rightKneeAngle >= 85 &&
      rightKneeAngle <= 105;

    feedback.knees.message = feedback.knees.correct
      ? ''
      : 'Bend your knees more, keeping thighs parallel to the floor.';

    // **Check Hip Position (Hips Should Be Behind Knees in Side View)**
    feedback.hips.correct = leftHip.x < leftKnee.x && rightHip.x < rightKnee.x;
    feedback.hips.message = feedback.hips.correct
      ? ''
      : 'Push your hips back more to align correctly.';

    // **Check Torso Angle (Leaning Slightly Forward)**
    const torsoAngle = calculateAngle(leftShoulder, leftHip, rightShoulder);
    feedback.torso.correct = torsoAngle >= 160 && torsoAngle <= 180;
    feedback.torso.message = feedback.torso.correct
      ? ''
      : 'Lean your torso slightly forward to balance the pose.';

    // **Check if Knees Stay Behind Toes**
    feedback.feet.correct =
      leftKnee.x < leftAnkle.x + 0.1 && rightKnee.x < rightAnkle.x + 0.1;
    feedback.feet.message = feedback.feet.correct
      ? ''
      : 'Ensure your knees don’t go past your toes. Shift your weight back.';

    // **Check Overall Chair Pose**
    feedback.chairPose.correct =
      feedback.knees.correct &&
      feedback.hips.correct &&
      feedback.torso.correct &&
      feedback.feet.correct;

    feedback.chairPose.message = feedback.chairPose.correct
      ? ''
      : 'Your Chair Pose isn’t quite right. Adjust your knees, hips, and torso for better alignment.';
  }

  return feedback;
};

// Function to check if the pose is Warrior II Pose
export const checkWarrior2Pose = (landmarks: any[]): Warrior2PoseFeedback => {
  const leftHip = landmarks[KnownPoseLandmarks.leftHip];
  const leftKnee = landmarks[KnownPoseLandmarks.leftKnee];
  const leftAnkle = landmarks[KnownPoseLandmarks.leftAnkle];
  const rightHip = landmarks[KnownPoseLandmarks.rightHip];
  const rightKnee = landmarks[KnownPoseLandmarks.rightKnee];
  const rightAnkle = landmarks[KnownPoseLandmarks.rightAnkle];

  const leftShoulder = landmarks[KnownPoseLandmarks.leftShoulder];
  const rightShoulder = landmarks[KnownPoseLandmarks.rightShoulder];

  const leftElbow = landmarks[KnownPoseLandmarks.leftElbow];
  const rightElbow = landmarks[KnownPoseLandmarks.rightElbow];

  const leftWrist = landmarks[KnownPoseLandmarks.leftWrist];
  const rightWrist = landmarks[KnownPoseLandmarks.rightWrist];

  const leftFootIndex = landmarks[KnownPoseLandmarks.leftFootIndex];
  const rightFootIndex = landmarks[KnownPoseLandmarks.rightFootIndex];

  const feedback: Warrior2PoseFeedback = {
    frontLeg: {correct: false, message: ''},
    backLeg: {correct: false, message: ''},
    feet: {correct: false, message: ''},
    hips: {correct: false, message: ''},
    torso: {correct: false, message: ''},
    arms: {correct: false, message: ''},
    warrior2Pose: {correct: false, message: ''},
  };

  if (
    leftHip &&
    leftKnee &&
    leftAnkle &&
    rightHip &&
    rightKnee &&
    rightAnkle &&
    leftShoulder &&
    rightShoulder &&
    leftElbow &&
    rightElbow &&
    leftWrist &&
    rightWrist &&
    leftFootIndex &&
    rightFootIndex
  ) {
    // **Check the knee angle for both legs**
    const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
    const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);

    const expectedKneeAngleMin = 85; // Leg bent around 90 degrees
    const expectedKneeAngleMax = 105;

    const isFrontLegBent =
      leftKneeAngle >= expectedKneeAngleMin &&
      leftKneeAngle <= expectedKneeAngleMax;
    const isBackLegStraight = rightKneeAngle > 170; // Back leg should be nearly straight

    feedback.frontLeg.correct = isFrontLegBent;
    feedback.frontLeg.message = isFrontLegBent
      ? ''
      : 'Bend your front leg more to around 90 degrees.';

    feedback.backLeg.correct = isBackLegStraight;
    feedback.backLeg.message = isBackLegStraight
      ? ''
      : 'Straighten your back leg more.';

    // **Check the feet alignment**
    const isFeetAligned =
      Math.abs(leftFootIndex.x - rightFootIndex.x) < 0.1 &&
      Math.abs(leftFootIndex.y - rightFootIndex.y) < 0.1;
    feedback.feet.correct = isFeetAligned;
    feedback.feet.message = isFeetAligned
      ? ''
      : 'Position your feet slightly wider apart for better balance.';

    // **Check for hips alignment (hips should be open)**
    const hipsAngle = calculateAngle(leftHip, rightHip, leftKnee);
    const isHipsOpen = hipsAngle >= 30 && hipsAngle <= 50; // Hips should be open between 30° and 50°
    feedback.hips.correct = isHipsOpen;
    feedback.hips.message = isHipsOpen
      ? ''
      : 'Open your hips more to face forward.';

    // **Check for torso position (should be facing forward)**
    const torsoAngle = calculateAngle(leftShoulder, leftHip, rightShoulder);
    const isTorsoAligned = torsoAngle > 170; // The torso should be upright or slightly forward
    feedback.torso.correct = isTorsoAligned;
    feedback.torso.message = isTorsoAligned
      ? ''
      : 'Lean your torso forward slightly to align it properly.';

    // **Check arm positions (should be extended and parallel to the floor)**
    const leftArmAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
    const rightArmAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);

    const isArmsExtended =
      leftArmAngle >= 160 &&
      leftArmAngle <= 180 &&
      rightArmAngle >= 160 &&
      rightArmAngle <= 180;

    feedback.arms.correct = isArmsExtended;
    feedback.arms.message = isArmsExtended
      ? ''
      : 'Extend your arms fully and keep them parallel to the floor.';

    // **Check overall Warrior II Pose**
    feedback.warrior2Pose.correct =
      isFrontLegBent &&
      isBackLegStraight &&
      isFeetAligned &&
      isHipsOpen &&
      isTorsoAligned &&
      isArmsExtended;

    feedback.warrior2Pose.message = feedback.warrior2Pose.correct
      ? ''
      : 'Your Warrior II pose isn’t quite right. Adjust your legs, feet, hips, torso, and arms for better alignment.';
  }

  return feedback;
};

export const checkTrianglePose = (landmarks: any[]): TrianglePoseFeedback => {
  const leftHip = landmarks[KnownPoseLandmarks.leftHip];
  const leftKnee = landmarks[KnownPoseLandmarks.leftKnee];
  const leftAnkle = landmarks[KnownPoseLandmarks.leftAnkle];
  const rightHip = landmarks[KnownPoseLandmarks.rightHip];
  const rightKnee = landmarks[KnownPoseLandmarks.rightKnee];
  const rightAnkle = landmarks[KnownPoseLandmarks.rightAnkle];

  const leftShoulder = landmarks[KnownPoseLandmarks.leftShoulder];
  const rightShoulder = landmarks[KnownPoseLandmarks.rightShoulder];

  const leftElbow = landmarks[KnownPoseLandmarks.leftElbow];
  const rightElbow = landmarks[KnownPoseLandmarks.rightElbow];

  const leftWrist = landmarks[KnownPoseLandmarks.leftWrist];
  const rightWrist = landmarks[KnownPoseLandmarks.rightWrist];

  const leftFootIndex = landmarks[KnownPoseLandmarks.leftFootIndex];
  const rightFootIndex = landmarks[KnownPoseLandmarks.rightFootIndex];

  const feedback: TrianglePoseFeedback = {
    frontLeg: {correct: false, message: ''},
    backLeg: {correct: false, message: ''},
    feet: {correct: false, message: ''},
    hips: {correct: false, message: ''},
    torso: {correct: false, message: ''},
    arms: {correct: false, message: ''},
    trianglePose: {correct: false, message: ''},
  };

  if (
    leftHip &&
    leftKnee &&
    leftAnkle &&
    rightHip &&
    rightKnee &&
    rightAnkle &&
    leftShoulder &&
    rightShoulder &&
    leftElbow &&
    rightElbow &&
    leftWrist &&
    rightWrist &&
    leftFootIndex &&
    rightFootIndex
  ) {
    // **Check Front Leg (Straight)**
    const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
    const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);

    const expectedKneeAngleMin = 170; // The front leg knee should be nearly straight
    const expectedKneeAngleMax = 180;

    feedback.frontLeg.correct =
      leftKneeAngle >= expectedKneeAngleMin &&
      leftKneeAngle <= expectedKneeAngleMax;
    feedback.frontLeg.message = feedback.frontLeg.correct
      ? ''
      : 'Straighten your front leg more.';

    // **Check Back Leg (Straight)**
    feedback.backLeg.correct = rightKneeAngle >= 170; // Back leg should be straight
    feedback.backLeg.message = feedback.backLeg.correct
      ? ''
      : 'Straighten your back leg more.';

    // **Check Feet Position (Wide Stance)**
    const feetDistance = Math.abs(leftFootIndex.x - rightFootIndex.x);
    feedback.feet.correct = feetDistance > 0.5; // Feet should be widely apart for Triangle Pose
    feedback.feet.message = feedback.feet.correct
      ? ''
      : 'Move your feet wider apart for a better stance.';

    // **Check Hips Alignment (Square to the front)**
    const leftHipToRightHipAngle = calculateAngle(leftHip, rightHip, leftKnee);
    feedback.hips.correct =
      leftHipToRightHipAngle >= 160 && leftHipToRightHipAngle <= 180; // Hips should be square to the front
    feedback.hips.message = feedback.hips.correct
      ? ''
      : 'Square your hips to the front.';

    // **Check Torso Alignment (Facing forward)**
    const torsoAngle = calculateAngle(leftShoulder, leftHip, rightShoulder);
    feedback.torso.correct = torsoAngle >= 160 && torsoAngle <= 180; // Torso should be facing forward
    feedback.torso.message = feedback.torso.correct
      ? ''
      : 'Turn your torso forward to face the front.';

    // **Check Arms Positioning (Extended)**
    const leftArmAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
    const rightArmAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);

    feedback.arms.correct =
      leftArmAngle >= 160 &&
      leftArmAngle <= 180 &&
      rightArmAngle >= 160 &&
      rightArmAngle <= 180;
    feedback.arms.message = feedback.arms.correct
      ? ''
      : 'Extend your arms fully and keep them parallel to the floor.';
  }

  return feedback;
};
