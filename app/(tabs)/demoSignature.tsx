import * as Contacts from "expo-contacts";
import { useRef, useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SignatureCanvas from "react-native-signature-canvas";
// PDF Lib for merging
const SignatureScreen = () => {
  const [signature, setSignature] = useState(null);
  const ref = useRef<any>(null);
  const handleSignature = (signature: any) => {
    ref.current.readSignature();
    setSignature(signature);
  };
  const handleEmpty = () => {
    console.log("Empty");
  };
  const handleClear = () => {
    setSignature(null);
    console.log("Clear success!");
  };
  const getContacts = async () => {
    if (Platform.OS !== "web") {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          const contacts = await Contacts.presentContactPickerAsync();
          console.log("Contacts:", contacts);
        } else {
          console.log("Permission denied");
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    } else {
      console.log("Contacts are not available on web platform.");
    }
  };
  return (
    <View style={styles.container}>
      <SignatureCanvas
        ref={ref}
        onOK={handleSignature}
        onEmpty={handleEmpty}
        onClear={handleClear}
        autoClear={true}
        descriptionText="Sign here"
        clearText="Clear"
        confirmText="Save"
      />
      <View style={styles.preview}>
        {signature && (
          <Image
            resizeMode="contain"
            style={{
              width: "100%",
              height: "100%",
            }}
            source={{ uri: signature }}
          />
        )}
      </View>
      <Pressable
        onPress={getContacts}
        style={{ marginTop: 20, marginBottom: 50 }}
      >
        <Text>Contact from your phone</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: "100%",
  },
  preview: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
    width: 415,
    height: 150,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
});
export default SignatureScreen;
