# 🧘 Yoga Pose Correction App

A cross-platform **React Native** mobile app built with **NativeWind** and **MediaPipe**, designed to detect and correct yoga poses in real-time. It uses pose estimation and custom angle-based algorithms to give instant feedback and guide users toward accurate posture alignment.

---

## 🚀 Features

- 📷 **Pose detection** via camera using MediaPipe
- 🎯 Real-time **pose correction** using custom logic based on angles between 3+ key landmarks
- ⚠️ Highlights incorrect joints and suggests corrections
- 🌈 Clean UI built with **Tailwind-style utility classes** using NativeWind
- 📱 APK available (Android Studio)

---

## 🧠 How It Works

- Uses MediaPipe's pose detection to identify 33 key landmarks on the body
- Calculates angles between body parts (e.g., shoulder-elbow-wrist)
- Compares user pose with ideal pose thresholds
- Provides visual cues to correct misalignments

---

## 📦 Installation & Setup

### Prerequisites
Ensure you’ve completed the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) with the **React Native CLI** approach.

### 1. Clone the repo
```bash
git clone https://github.com/webdevabdul0/YogaApp.git
cd YogaApp
```

### 2. Install dependencies
```bash
yarn install
```

### 3. Start Metro bundler
```bash
yarn start
```

### 4. Run the app

**Android**
```bash
yarn android
```

**iOS**
```bash
yarn ios
```

> Alternatively, use Android Studio or Xcode to run the app directly on emulator/device.

---

## 🔧 Development Notes

- Modify main logic in `App.tsx` or components under `src/`
- Tailwind utility classes used via NativeWind
- MediaPipe integrations use camera permissions

---

## 📲 APK Download

Want to try it? [**Download the latest APK**](#) _(Add Google Drive or GitHub Releases link here)_

---

## 🧩 Future Enhancements

- Add rep counting and audio feedback
- Expand library of yoga poses
- iOS compatibility
- Track daily practice & progress

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a PR.

---

## 🛠️ Built With

- [React Native](https://reactnative.dev/)
- [NativeWind](https://www.nativewind.dev/)
- [MediaPipe](https://mediapipe.dev/)
- [Android Studio](https://developer.android.com/studio)

---

## 📬 Contact

**Abdul Hanan**  
UI/UX Designer & Full Stack Developer  
[Portfolio](https://webdevabdul0.github.io) • [Fiverr](https://www.fiverr.com/abdulhanan0123) • [LinkedIn](https://linkedin.com/in/abdulhanan0123)
