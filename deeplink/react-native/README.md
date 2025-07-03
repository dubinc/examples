# React Native Deep Link Demo

This is a [**React Native**](https://reactnative.dev) demo application that showcases **deep linking** functionality with a product catalog UI.

The app demonstrates how to implement deep linking that allows users to directly access specific screens and content through **universal links**.

This project was bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Features

- **Deep Link Navigation**: Navigate directly to product details using URLs like `https://example.com/products/1`
- **Product Catalog**: Browse products fetched from a mock API
- **Product Details**: View detailed product information with images, pricing, and descriptions
- **URL Parsing**: Automatic parsing of URL parameters to navigate to specific products
- **Cross-Platform**: Works on both iOS and Android with proper deep link handling

## Deep Link Examples

- Product List: `https://example.com/products`
- Product Detail: `https://example.com/products/1` (where `1` is the product ID)

## Demo

<img src="android-demo.gif" alt="Android Demo" width="300" />

# Getting Started

Make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) guide before proceeding.

## Prerequisites

Before running this project, ensure you have:

- Node.js (version 18 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- CocoaPods (for iOS dependencies)

## Running the Project

### Install Dependencies

First, install the project dependencies:

```sh
npm install
```

### Start Metro

Start the Metro bundler (JavaScript build tool):

```sh
npm start
```

Keep Metro running in a separate terminal window while you build and run the app.

## Running on Android

### Prerequisites

- Android Studio installed with Android SDK
- Android emulator set up or physical device connected
- ANDROID_HOME environment variable configured

### Steps

1. **Start Metro** (if not already running):

```sh
npm start
```

2. **Run the Android app**:

```sh
npm run android
```

3. **Alternative**: Open Android Studio and run from there:

- Open the `android/` folder in Android Studio
- Build and run the project

### Testing Deep Links on Android

To test deep links on Android:

- Use ADB: `adb shell am start -W -a android.intent.action.VIEW -d "https://example.com/products/1" com.deeplink`
- Or use Android Studio's deep link testing feature

## Running on iOS

### Prerequisites

- macOS with Xcode installed
- iOS Simulator or physical iOS device
- CocoaPods installed

### Steps

1. **Install CocoaPods dependencies** (first time only):

```sh
cd ios
bundle install
bundle exec pod install
cd ..
```

2. **Start Metro** (if not already running):

```sh
npm start
```

3. **Run the iOS app**:

```sh
npm run ios
```

4. **Alternative**: Open Xcode and run from there:

- Open `ios/deeplink.xcworkspace` in Xcode
- Select your target device/simulator
- Build and run the project

### Testing Deep Links on iOS

To test deep links on iOS:

To test your universal links behavior, paste a link into your Notes app and long-press it (iOS) or control-click it (macOS) to see your options for following the link. If universal links have been configured correctly, the option to open in your app and in the web browser will both show up.

> **IMPORTANT**: Entering the URL directly into the web browser’s address bar will never open the app, as this is direct navigation within the web browser. As long as the user is on your domain after navigating there directly, your site will show a banner to open your app.
