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

  {
    /*}
  // Logging intermediate values
  console.log(
    `Point A: ${JSON.stringify(p1)}, Point B: ${JSON.stringify(
      p2,
    )}, Point C: ${JSON.stringify(p3)}`,
  );
  console.log(
    `Differences: dx1: ${dx1}, dy1: ${dy1}, dx2: ${dx2}, dy2: ${dy2}`,
  );
  console.log(
    `Angles in radians: radians1: ${radians1}, radians2: ${radians2}`,
  );
  console.log(`Angle in degrees: ${angleDeg}`);
{*/
  }
  return angleDeg;
};

// Function to check if the pose is a standing pose
export const checkStandingPose = (landmarks: any[]): boolean => {
  const leftHip = landmarks[KnownPoseLandmarks.leftHip];
  const leftKnee = landmarks[KnownPoseLandmarks.leftKnee];
  const leftAnkle = landmarks[KnownPoseLandmarks.leftAnkle];

  console.log('Left Hip:', leftHip);
  console.log('Left Knee:', leftKnee);
  console.log('Left Ankle:', leftAnkle);

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

export interface TreePoseFeedback {
  standingLeg: {correct: boolean; message: string}; // true if correct, false if incorrect with feedback message
  liftedLeg: {correct: boolean; message: string}; // true if correct, false if incorrect with feedback message
  footPosition: {correct: boolean; message: string}; // true if correct, false if incorrect with feedback message
  torso: {correct: boolean; message: string}; // true if correct, false if incorrect with feedback message
  treePose: {correct: boolean; message: string}; // true if correct, false if incorrect with feedback message
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

// Function to check if the pose is Chair Pose
export const checkChairPose = (
  landmarks: any[],
): {isChairPose: boolean; feedback: string} => {
  const leftHip = landmarks[KnownPoseLandmarks.leftHip];
  const leftKnee = landmarks[KnownPoseLandmarks.leftKnee];
  const leftAnkle = landmarks[KnownPoseLandmarks.leftAnkle];
  const rightHip = landmarks[KnownPoseLandmarks.rightHip];
  const rightKnee = landmarks[KnownPoseLandmarks.rightKnee];
  const rightAnkle = landmarks[KnownPoseLandmarks.rightAnkle];

  const leftShoulder = landmarks[KnownPoseLandmarks.leftShoulder];
  const rightShoulder = landmarks[KnownPoseLandmarks.rightShoulder];

  const leftFootIndex = landmarks[KnownPoseLandmarks.leftFootIndex];
  const rightFootIndex = landmarks[KnownPoseLandmarks.rightFootIndex];

  const feedback = {
    knees: '',
    hips: '',
    torso: '',
    feet: '',
  };

  // Check if all necessary landmarks are available
  if (
    leftHip &&
    leftKnee &&
    leftAnkle &&
    rightHip &&
    rightKnee &&
    rightAnkle &&
    leftShoulder &&
    rightShoulder &&
    leftFootIndex &&
    rightFootIndex
  ) {
    // Calculate the angle for the standing leg (left leg)
    const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
    const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);

    const expectedKneeAngleMin = 85; // Thighs parallel to the ground
    const expectedKneeAngleMax = 105;

    const isKneeBent =
      leftKneeAngle >= expectedKneeAngleMin &&
      leftKneeAngle <= expectedKneeAngleMax &&
      rightKneeAngle >= expectedKneeAngleMin &&
      rightKneeAngle <= expectedKneeAngleMax;

    // Provide feedback on knee angle
    feedback.knees = isKneeBent
      ? ''
      : leftKneeAngle < expectedKneeAngleMin ||
        rightKneeAngle < expectedKneeAngleMin
      ? 'Bend your knees more.'
      : 'Straighten your knees a bit more.';

    // Check for hips alignment (hips lowered, pelvis tilted backward slightly)
    const isHipsLowered = leftHip.y > leftKnee.y && rightHip.y > rightKnee.y;
    feedback.hips = isHipsLowered
      ? ''
      : 'Lower your hips more for better alignment.';

    // Calculate torso angle (slightly forward angle)
    const torsoAngle = calculateAngle(leftShoulder, leftHip, rightShoulder);
    const isTorsoLeaningForward = torsoAngle >= 160 && torsoAngle <= 180;
    feedback.torso = isTorsoLeaningForward
      ? ''
      : torsoAngle < 160
      ? 'Lean forward a little more.'
      : 'Straighten your torso slightly.';

    // Check if feet are hip-width apart (roughly)
    const isFeetAligned =
      Math.abs(leftFootIndex.x - rightFootIndex.x) < 0.1 &&
      Math.abs(leftFootIndex.y - rightFootIndex.y) < 0.1;
    feedback.feet = isFeetAligned
      ? ''
      : 'Adjust your feet to be more in line with each other.';

    // Determine if all conditions are met for Chair Pose
    const isChairPose =
      isKneeBent && isHipsLowered && isTorsoLeaningForward && isFeetAligned;

    return {isChairPose, feedback: Object.values(feedback).join(' ')};
  }

  return {
    isChairPose: false,
    feedback: 'Pose is not correct yet. Please adjust your position.',
  };
};

// Function to check if the pose is Warrior II Pose
export const checkWarrior2Pose = (
  landmarks: any[],
): {isWarrior2Pose: boolean; feedback: string} => {
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

  const feedback = {
    frontLeg: '',
    backLeg: '',
    feet: '',
    hips: '',
    torso: '',
    arms: '',
  };

  // Check if all necessary landmarks are available
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
    // Check the knee angle for both legs
    const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
    const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);

    const expectedKneeAngleMin = 85; // Leg bent around 90 degrees
    const expectedKneeAngleMax = 105;

    const isFrontLegBent =
      leftKneeAngle >= expectedKneeAngleMin &&
      leftKneeAngle <= expectedKneeAngleMax;
    const isBackLegStraight = rightKneeAngle > 170; // Back leg should be nearly straight

    feedback.frontLeg = isFrontLegBent
      ? ''
      : 'Bend your front leg more to around 90 degrees.';
    feedback.backLeg = isBackLegStraight
      ? ''
      : 'Straighten your back leg more.';

    // Check the feet alignment
    const isFeetAligned =
      Math.abs(leftFootIndex.x - rightFootIndex.x) < 0.1 &&
      Math.abs(leftFootIndex.y - rightFootIndex.y) < 0.1;
    feedback.feet = isFeetAligned
      ? ''
      : 'Position your feet slightly wider apart for better balance.';

    // Check for hips alignment (hips should be open)
    const hipsAngle = calculateAngle(leftHip, rightHip, leftKnee);
    const isHipsOpen = hipsAngle >= 30 && hipsAngle <= 50; // Hips should be open between 30° and 50°
    feedback.hips = isHipsOpen ? '' : 'Open your hips more to face forward.';

    // Check for torso position (should be facing forward)
    const torsoAngle = calculateAngle(leftShoulder, leftHip, rightShoulder);
    const isTorsoAligned = torsoAngle > 170; // The torso should be upright or slightly forward
    feedback.torso = isTorsoAligned
      ? ''
      : 'Lean your torso forward slightly to align it properly.';

    // Check arm positions (should be extended and parallel to the floor)
    const leftArmAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
    const rightArmAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);

    const isArmsExtended =
      leftArmAngle >= 160 &&
      leftArmAngle <= 180 &&
      rightArmAngle >= 160 &&
      rightArmAngle <= 180;

    feedback.arms = isArmsExtended
      ? ''
      : 'Extend your arms fully and keep them parallel to the floor.';

    // Determine if all conditions are met for Warrior II Pose
    const isWarrior2Pose =
      isFrontLegBent &&
      isBackLegStraight &&
      isFeetAligned &&
      isHipsOpen &&
      isTorsoAligned &&
      isArmsExtended;

    return {isWarrior2Pose, feedback: Object.values(feedback).join(' ')};
  }

  return {
    isWarrior2Pose: false,
    feedback:
      'Your Warrior II pose isn’t quite right. Please adjust your position.',
  };
};

// Function to check if the pose is Triangle Pose
export const checkTrianglePose = (
  landmarks: any[],
): {isTrianglePose: boolean; feedback: string} => {
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

  const feedback = {
    frontLeg: '',
    backLeg: '',
    feet: '',
    hips: '',
    torso: '',
    arms: '',
  };

  // Check if all necessary landmarks are available
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
    // Check the knee angle for both legs
    const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
    const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);

    const expectedKneeAngleMin = 170; // The front leg knee should be nearly straight
    const expectedKneeAngleMax = 180;

    const isFrontLegStraight =
      leftKneeAngle >= expectedKneeAngleMin &&
      leftKneeAngle <= expectedKneeAngleMax;
    const isBackLegStraight = rightKneeAngle >= 170; // Back leg should be straight

    feedback.frontLeg = isFrontLegStraight
      ? ''
      : 'Straighten your front leg more.';
    feedback.backLeg = isBackLegStraight
      ? ''
      : 'Straighten your back leg more.';

    // Check for feet alignment (should be in a wide stance)
    const feetDistance = Math.abs(leftFootIndex.x - rightFootIndex.x);
    const isFeetWideEnough = feetDistance > 0.5; // Feet should be widely apart for Triangle Pose
    feedback.feet = isFeetWideEnough
      ? ''
      : 'Move your feet wider apart for a better stance.';

    // Check for hips position (hips should be facing sideways)
    const hipsAngle = calculateAngle(leftHip, rightHip, leftKnee);
    const isHipsSideways = hipsAngle >= 70 && hipsAngle <= 110; // Hips should face sideways between 70° and 110°
    feedback.hips = isHipsSideways
      ? ''
      : 'Turn your hips sideways to face the side more.';

    // Check the torso angle (should be bent over the front leg)
    const torsoAngle = calculateAngle(leftShoulder, leftHip, rightShoulder);
    const isTorsoLeaning = torsoAngle > 160; // The torso should be leaning to the side
    feedback.torso = isTorsoLeaning
      ? ''
      : 'Lean your torso over the front leg for proper alignment.';

    // Check arm positions (one arm reaching down, one arm up)
    const leftArmAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
    const rightArmAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);

    const isArmsExtended =
      leftArmAngle >= 160 &&
      leftArmAngle <= 180 &&
      rightArmAngle >= 160 &&
      rightArmAngle <= 180;

    feedback.arms = isArmsExtended
      ? ''
      : 'Extend your arms fully and keep them parallel to the floor.';

    // Determine if all conditions are met for Triangle Pose
    const isTrianglePose =
      isFrontLegStraight &&
      isBackLegStraight &&
      isFeetWideEnough &&
      isHipsSideways &&
      isTorsoLeaning &&
      isArmsExtended;

    return {isTrianglePose, feedback: Object.values(feedback).join(' ')};
  }

  return {
    isTrianglePose: false,
    feedback:
      'Your Triangle Pose isn’t quite right. Please adjust your position.',
  };
};
