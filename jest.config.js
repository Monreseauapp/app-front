// jest.config.js
module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@testing-library|expo(nent)?|@expo(nent)?/.*|react-clone-referenced-element|@react-native-community|@react-native-picker|@react-native-async-storage|@react-native-masked-view|@react-native-segmented-control|@react-native-segmented-control/segmented-control)",
  ],
};
