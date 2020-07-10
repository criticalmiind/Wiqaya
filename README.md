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

#### Android Build
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

#### IOS Build

 1. Get the .app file:
    ```
    react-native run-ios --configuration=release
    ```
 2. .app file path 
    ```Build/Products/Release/"<Your_Filename>.app".```
    or
    ```/Users/<"Your_system_name">/Library/Developer/Xcode/DerivedData/<"App_Name">/Build/Products/Release-iphonesimulator/"<Your_Filename>.app"```

 3. Convert .app to .ipa :
  - Create folder Payload.
  - Paste .app file into Payload folder.
  - compress the Payload folder.
  - change the name you want and put extension as .ipa.
