import { Colors } from "@/constants/Colors";
import { Pressable, Text, View } from "react-native";
import Input from "../form/Input";
import styles from "./ValidationForm.styles";

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
      <Text style={{ ...styles.text, marginBottom: 4, color: Colors.black }}>
        Vous n&apos;avez toujours pas fait de choix !
      </Text>
      <Text style={[styles.text, styles.span, { color: Colors.black }]}>
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
          <Text style={[styles.text, styles.span, { color: Colors.white }]}>
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
          <Text style={[styles.text, styles.span, { color: Colors.white }]}>
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
            borderColor: Colors.violet,
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
