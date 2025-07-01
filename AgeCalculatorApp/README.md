# 🎂 Age Calculator Mobile App

A beautiful and feature-rich mobile application built with React Native and Expo that calculates your exact age and provides interesting life statistics.

![Age Calculator App](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-blue)
![React Native](https://img.shields.io/badge/React%20Native-Expo-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 📱 Core Functionality
- **Precise Age Calculation**: Calculate exact age in years, months, and days
- **Comprehensive Statistics**: View total days, hours, minutes lived
- **Birthday Information**: Next birthday date and countdown
- **Birth Day**: See what day of the week you were born

### 🎨 Advanced Features
- **Life Statistics**: Estimated heartbeats, breaths, and more
- **Zodiac Sign**: Automatic zodiac sign detection
- **Age Category**: Life stage categorization (Child, Teen, Adult, etc.)
- **Birthstone**: Display your birthstone based on birth month

### 📱 Mobile Experience
- **Modern UI Design**: Beautiful gradient backgrounds and smooth animations
- **Native Date Picker**: Platform-specific date selection
- **Responsive Layout**: Optimized for all screen sizes
- **Smooth Animations**: Engaging micro-interactions
- **Cross-Platform**: Works on both iOS and Android

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AgeCalculatorApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   ```bash
   # For iOS (requires macOS)
   npm run ios
   
   # For Android
   npm run android
   
   # For web browser
   npm run web
   ```

### 📱 Testing on Physical Device

1. **Install Expo Go app** on your mobile device from App Store or Google Play Store
2. **Scan the QR code** displayed in the terminal or browser
3. **Start using the app** immediately on your device

## 🏗️ Project Structure

```
AgeCalculatorApp/
├── App.js                 # Main application component
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
├── components/           # Reusable UI components
│   ├── AgeCard.js       # Age display cards
│   └── StatItem.js      # Statistics display items
├── utils/               # Utility functions
│   └── ageCalculations.js # Age calculation logic
└── assets/              # Images and icons
    ├── icon.png
    ├── splash.png
    └── adaptive-icon.png
```

## 🎯 How to Use

1. **Open the app** on your mobile device
2. **Tap the date button** to select your birth date
3. **Choose your birth date** using the native date picker
4. **Tap "Calculate My Age"** to see your results
5. **Scroll down** to view detailed life statistics
6. **Tap the refresh button** to calculate for a different date

## 📊 Statistics Displayed

### Basic Age Information
- Years, Months, Days lived
- Total days, hours, minutes alive
- Next birthday date and countdown
- Day of the week you were born

### Fun Life Statistics
- Estimated heartbeats (based on average 75 BPM)
- Estimated breaths taken
- Number of Earth rotations experienced
- Weeks and months lived
- Age category classification
- Zodiac sign
- Birthstone

## 🛠️ Technical Details

### Built With
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **React Native Animatable**: Smooth animations
- **Expo Linear Gradient**: Beautiful gradient backgrounds
- **Vector Icons**: Material Icons and FontAwesome5
- **DateTimePicker**: Native date selection

### Key Components
- **App.js**: Main application logic and UI
- **AgeCard**: Reusable component for displaying age values
- **StatItem**: Component for statistics display
- **ageCalculations.js**: Pure functions for age calculations

### Features Implementation
- **Accurate Age Calculation**: Handles leap years and month variations
- **Input Validation**: Prevents future dates and invalid inputs
- **Responsive Design**: Adapts to different screen sizes
- **Platform Optimization**: Uses platform-specific UI elements
- **Performance**: Optimized calculations and smooth animations

## 📱 Platform Support

- ✅ **iOS**: Full support with native date picker
- ✅ **Android**: Full support with native date picker  
- ✅ **Web**: Browser support for testing
- ✅ **Responsive**: Works on tablets and all screen sizes

## 🎨 Customization

### Themes and Colors
The app uses a purple gradient theme (`#667eea` to `#764ba2`). You can customize colors in:
- `App.js` - Main component styles
- `components/` - Individual component styles

### Adding New Statistics
To add new life statistics:
1. Update `utils/ageCalculations.js` with new calculation
2. Add new `StatItem` in the main App component
3. Include appropriate icon from Material Icons or FontAwesome5

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React Native and Expo communities
- Icon providers (Material Icons, FontAwesome)
- Inspiration from various age calculator apps

## 📞 Support

If you have any questions or need help with setup:
- Open an issue in the repository
- Check the Expo documentation
- Review React Native troubleshooting guides

---

**Happy Birthday Calculating! 🎉**