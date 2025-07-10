import DocumentInput from "@/components/form/DocumentInput";
import React, { useRef, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import SignatureCanvas from "react-native-signature-canvas";

// PDF Lib for merging

const SignatureScreen = () => {
  const [signature, setSignature] = useState(null);
  const [url, setUrl] = useState<string>("");
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
      <DocumentInput
        title={"Document"}
        type={["image/jpeg", "image/png", "image/webp", "application/pdf"]}
        setValue={setUrl}
      />
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
