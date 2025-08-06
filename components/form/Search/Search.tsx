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
  valid?: boolean | null;
  zIndex?: number;
};

const filterList = (text: string, list: string[]) => {
  if (!text || text.trim() === "") {
    return list;
  }
  return list.filter((item) => item.toLowerCase().includes(text.toLowerCase()));
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
  zIndex = 0,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [filteredList, setFilteredList] = useState<string[]>(list);

  useEffect(() => {
    const filtered = filterList(value || "", list);
    setFilteredList(
      filtered.length > 0 ? filtered : ["Aucun résultat pour votre recherche."]
    );
  }, [value, list]);

  useEffect(() => {
    if (autoFocus) {
      setIsFocused(true);
    }
  }, [autoFocus]);

  return (
    <View
      style={{
        ...styles.container,
        zIndex: 10 + zIndex,
      }}
    >
      <Text style={[styles.title, titleStyle]}>
        {name}{" "}
        {valid !== undefined && <Text style={{ color: Colors.red }}>*</Text>}
        {valid === false && !value && (
          <Text style={styles.required}>(ce champ est requis)</Text>
        )}
      </Text>
      <TextInput
        autoFocus={autoFocus}
        enterKeyHint="search"
        inputMode="search"
        onChangeText={(text) => {
          if (onChangeText) {
            onChangeText(text);
          }
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 150)}
        placeholderTextColor={Colors.grey}
        placeholder={placeholder}
        ref={inputRef}
        returnKeyType="search"
        style={[styles.input, { outline: isFocused && "auto" }, inputStyle]}
        testID="search-input"
        value={value}
      />

      {list && isFocused && (
        <ScrollView
          style={styles.itemsContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={true}
          testID="search-list"
        >
          {filteredList.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => onChangeText && onChangeText(item)}
              testID={`search-item`}
            >
              <Text
                style={{
                  ...styles.item,
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
