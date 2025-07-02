import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import styles from "./Search.styles";

type InputProps = {
  name: string;
  list: string[];
  placeholder: string;
  titleStyle?: object;
  inputStyle?: object;
  autoFocus?: boolean;
  inputRef?: React.RefObject<TextInput | null>;
  value?: string;
  onChangeText?: (text: string) => void;
  valid?: boolean;
};

export default function Search({
  name,
  list,
  placeholder,
  titleStyle = {},
  inputStyle = {},
  autoFocus = false,
  inputRef,
  value,
  onChangeText,
  valid = undefined,
}: InputProps) {
  const { placeholderTextColor }: any = inputStyle || {};
  if (placeholderTextColor) {
    inputStyle = { ...inputStyle, placeholderTextColor };
  }
  const [isFocused, setIsFocused] = useState(false);
  const [filteredList, setFilteredList] = useState<string[]>(list);

  const filterList = (text: string) => {
    if (!text || text.trim() === "") {
      return list;
    }
    return list.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
  };

  useEffect(() => {
    const filtered = filterList(value || "");
    setFilteredList(
      filtered.length > 0 ? filtered : ["Aucun résultat pour votre recherche."]
    );
  }, [value, list]);

  return (
    <View
      style={{
        width: "100%",
        marginBottom: 20,
        position: "relative",
        overflow: "visible",
        zIndex: 10,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          paddingBottom: 10,
          paddingLeft: 16,
          color: Colors.background,
          ...titleStyle,
        }}
      >
        {name}{" "}
        {valid === false && !value && (
          <Text
            style={{
              color: Colors.red,
              paddingLeft: 16,
              fontSize: 14,
              fontWeight: "bold",
              marginTop: -5,
            }}
          >
            (ce champ est requis)
          </Text>
        )}
      </Text>
      <TextInput
        autoFocus={autoFocus}
        enterKeyHint="search"
        inputMode="search"
        onChange={(e) => {
          if (onChangeText) {
            onChangeText(e.nativeEvent.text);
          }
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 75)}
        placeholderTextColor={placeholderTextColor || Colors.accent}
        placeholder={placeholder}
        ref={inputRef}
        returnKeyType="search"
        style={{
          width: "100%",
          height: 50,
          backgroundColor: Colors.accent,
          color: Colors.background,
          borderRadius: 50,
          paddingHorizontal: 20,
          paddingVertical: 10,
          fontSize: 16,
          fontWeight: "bold",
          ...inputStyle,
        }}
        value={value}
      />

      {list && isFocused && (
        <ScrollView
          style={styles.itemsContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={true}
        >
          {filteredList.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => onChangeText && onChangeText(item)}
            >
              <Text
                style={{
                  color: Colors.text,
                  fontSize: 16,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderBottomColor: Colors.accent,
                  borderBottomWidth: index !== list.length - 1 ? 1 : 0,
                }}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
