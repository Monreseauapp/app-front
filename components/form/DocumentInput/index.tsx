import { AppContext } from "@/context/context";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import { useContext } from "react";

import { Platform, Pressable, Text, View } from "react-native";
import styles from "./DocumentInput.styles";

type DocumentTypes =
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "application/pdf";

interface DocumentInputProps {
  title: string;
  type: DocumentTypes[];
  category?: string;
  description?: string;
  setValue: (value: string) => void;
  titleStyle?: object;
  containerStyle?: object;
  textStyle?: object;
}

export default function DocumentInput({
  title,
  type,
  category,
  description,
  setValue,
  titleStyle,
  containerStyle,
  textStyle,
}: DocumentInputProps) {
  const { API_URL, userId } = useContext(AppContext);

  function dataURLtoBlob(dataUrl: string) {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  const uploadFile = async (file: {
    uri: string;
    name: string;
    type: string;
  }) => {
    const formData = new FormData();
    if (Platform.OS === "web" && file.uri.startsWith("data:")) {
      const blob = dataURLtoBlob(file.uri);
      formData.append("file", blob, file.name);
    } else {
      formData.append("file", file as any);
    }
    formData.append("userId", userId as string);
    category && formData.append("category", category);
    description && formData.append("description", description);
    axios
      .post(`${API_URL}/files/upload/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const resp = response.data;
        setValue(resp.id);
      })
      .catch((error) => {
        console.error("Error uploading file:", error.request);
      });
  };
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
          if (result.assets && result.assets.length > 0) {
            const file = {
              uri: result.assets[0].uri,
              name: result.assets[0].name,
              type: result.assets[0].mimeType || "application/octet-stream",
            };
            uploadFile(file);
          }
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
