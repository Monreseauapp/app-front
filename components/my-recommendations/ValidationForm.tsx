import { Colors } from "@/constants/Colors";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Input from "../form/Input";

interface ValidationFormProps {
  isRejected: boolean | undefined;
  setIsRejected: (value: boolean | undefined) => void;
  rejectionReason: string;
  setRejectionReason: (value: string) => void;
  update: () => void;
  setUpdated: (value: boolean) => void;
}

export default function ValidationForm({
  isRejected,
  setIsRejected,
  rejectionReason,
  setRejectionReason,
  update,
  setUpdated,
}: ValidationFormProps) {
  return (
    <View style={styles.choiceContainer}>
      <Text style={{ ...styles.text, marginBottom: 4, color: Colors.text }}>
        Vous n'avez toujours pas fait de choix !
      </Text>
      <Text style={[styles.text, styles.span, { color: Colors.text }]}>
        Souhaitez vous :
      </Text>
      <View style={styles.choiceButtonContainer}>
        <Pressable
          style={[
            styles.choiceButton,
            { backgroundColor: Colors.green },
            isRejected && { opacity: 0.5 },
          ]}
          onPress={() => setIsRejected(false)}
        >
          <Text
            style={[styles.text, styles.span, { color: Colors.background }]}
          >
            ACCEPTER
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.choiceButton,
            { backgroundColor: Colors.red },
            !isRejected && isRejected !== undefined && { opacity: 0.5 },
          ]}
          onPress={() => setIsRejected(true)}
        >
          <Text
            style={[styles.text, styles.span, { color: Colors.background }]}
          >
            REFUSER
          </Text>
        </Pressable>
      </View>
      {isRejected && (
        <Input
          name=""
          placeholder="Entrez votre raison ici (optionnel)"
          type="off"
          inputStyle={{
            alignSelf: "center",
            width: "90%",
            borderColor: Colors.accent,
            borderWidth: 4,
            placeholderTextColor: Colors.grey,
            marginTop: -20,
            marginBottom: -10,
          }}
          value={rejectionReason}
          onChangeText={(text) => setRejectionReason(text)}
        />
      )}
      <Pressable
        onPress={() => {
          if (isRejected !== undefined) {
            update();
            setIsRejected(undefined);
            setUpdated(true);
          }
        }}
        style={styles.validationButton}
      >
        <Text style={styles.validationText}>Valider</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: Colors.background,
  },
  span: {
    fontWeight: "bold",
  },
  choiceContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 16,
    padding: 16,
    backgroundColor: Colors.lightGrey,
  },
  choiceButtonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  choiceButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 4,
  },
  validationButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.accent,
    marginTop: 10,
  },
  validationText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: "bold",
  },
});
