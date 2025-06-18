import React, { useRef, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import SignatureCanvas from "react-native-signature-canvas";

const SignatureScreen = () => {
  const [signature, setSignature] = useState(null);
  const ref = useRef<any>(null);

  const handleSignature = (signature: any) => {
    console.log(signature);
    setSignature(signature);
  };

  const handleEmpty = () => {
    console.log("Empty");
  };

  const handleClear = () => {
    setSignature(null);
    console.log("Clear success!");
  };

  const handleEnd = () => {
    ref.current.readSignature();
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {signature && (
          <Image
            resizeMode="contain"
            style={{ width: 335, height: 114 }}
            source={{ uri: signature }}
          />
        )}
      </View>
      <SignatureCanvas
        ref={ref}
        onEnd={handleEnd}
        onOK={handleSignature}
        onEmpty={handleEmpty}
        onClear={handleClear}
        autoClear={true}
        descriptionText="Sign here"
        clearText="Clear"
        confirmText="Save"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    width: 335,
    height: 114,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
});

export default SignatureScreen;
