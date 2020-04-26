# Wiqaya - Quran App

## Configure Project
### Step 01:
- Download fonts from this link: https://archive.org/details/qcf.fonts
- Add all fonts in ```android/app/src/main/assets/fonts```
- And also add all fonts in ```src/Assets/Fonts```
- If you have any error on IOS, open project in XCODE and Add Recource dir in Wiqaya(if not exit), remove all fonts(if exit), and drag again all fonts

### Step 02:
```
npm install
```

### Step 03:
 - For Android : ``` react-native run-android --no-jetifier ```
 - For IOS : ``` react-native run-android ```
or
 - For Android : ``` npx react-native run-android --no-jetifier ```
 - For IOS : ``` npx react-native run-android ```

 ### Create Android Bundles
 ```
 $ cd android/
 $ ./gradlew bundleRelease
 ```

  ### Create Android apk file
 ```
 $ cd android/
 $ ./gradlew assembleRelease
 ```