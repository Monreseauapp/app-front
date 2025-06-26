import { Colors } from "@/constants/Colors";
import * as DocumentPicker from "expo-document-picker";
import { Pressable, StyleSheet, Text, View } from "react-native";

type DocumentTypes =
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "application/pdf";

interface DocumentInputProps {
  title: string;
  type: DocumentTypes[];
  setValue?: (value: object | null) => void;
  titleStyle?: object;
  containerStyle?: object;
  textStyle?: object;
}

export default function DocumentInput({
  title,
  type,
  setValue,
  titleStyle,
  containerStyle,
  textStyle,
}: DocumentInputProps) {
  return (
    <View
      style={{
        alignItems: "center",
        width: "100%",
        marginBottom: 32,
        ...containerStyle,
      }}
    >
      <Text style={{ ...styles.title, ...titleStyle }}>{title}</Text>
      <Pressable
        onPress={async () => {
          const result = await DocumentPicker.getDocumentAsync({
            type: type,
          });
          setValue?.(result);
        }}
        style={styles.container}
      >
        <Text style={{ ...styles.text, ...textStyle }}>
          Ajouter un document
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.text,
  },
  container: {
    backgroundColor: Colors.accent,
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.background,
  },
});
