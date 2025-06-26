import { CompleteProject } from "@/app/(tabs)/my-projects";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { ProjectChoiceState, RecoState } from "@/types";
import axios from "axios";
import { useContext, useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import ValidationForm from "../my-recommendations/ValidationForm";
import PriorityStars from "../PriorityStars";
import RelatedPeople from "./RelatedPeople";

interface ProjectProps extends CompleteProject {
  page: string;
  setUpdated: (value: boolean) => void;
}

export default function Project({
  project,
  initiator,
  company,
  page,
  setUpdated,
}: ProjectProps) {
  const { API_URL } = useContext(AppContext);
  const [isRejected, setIsRejected] = useState<boolean | undefined>(undefined);
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const isCompanyReception = page === "received";
  const stateTranslation = {
    [RecoState.ACCEPTED]: "Acceptée",
    [RecoState.PENDING]: "En attente...",
    [RecoState.REJECTED]: "Refusée",
  };
  const colorState = {
    [RecoState.ACCEPTED]: styles.accepted,
    [RecoState.PENDING]: {},
    [RecoState.REJECTED]: styles.rejected,
  };

  const updateProject = async () => {
    const { userId, ...projectWithoutUserId } = project;
    axios.patch(`${API_URL}/project/${project.id}`, {
      ...projectWithoutUserId,
      ProjectChoiceCompany: isRejected
        ? RecoState.REJECTED
        : RecoState.ACCEPTED,
      rejectionReasonCompany: rejectionReason,
    });
  };

  return (
    <View style={styles.container}>
      <RelatedPeople
        initiator={initiator}
        company={company}
        isCompanyReception={isCompanyReception}
      />
      <Text style={[styles.text, styles.description]}>
        {project.description}
      </Text>
      <View style={styles.contactContainer}>
        <Text style={[styles.text, styles.span]}>Contact :</Text>
        <View style={styles.contactTextContainer}>
          {(isCompanyReception ? initiator : company)?.email && (
            <Pressable
              onPress={() =>
                Linking.openURL(
                  `mailto:${(isCompanyReception ? initiator : company)?.email}`
                )
              }
              style={{ width: "45%" }}
            >
              <Text style={[styles.text, styles.contactText]}>
                {(isCompanyReception ? initiator : company)?.email}
              </Text>
            </Pressable>
          )}
          {(isCompanyReception ? initiator : company)?.phone && (
            <Pressable
              onPress={() =>
                Linking.openURL(
                  `tel:${(isCompanyReception ? initiator : company)?.phone}`
                )
              }
              style={{ width: "45%" }}
            >
              <Text style={[styles.text, styles.contactText]}>
                {(isCompanyReception ? initiator : company)?.phone}
              </Text>
            </Pressable>
          )}
        </View>
        <View style={styles.priorityContainer}>
          <Text style={[styles.text, styles.span]}>Priorité :</Text>
          <PriorityStars
            stars={project.priority}
            activeColor={Colors.background}
          />
        </View>
      </View>
      <View style={styles.stateContainer}>
        <Text
          style={[
            styles.text,
            styles.span,
            colorState[ProjectChoiceState.PENDING as ProjectChoiceState],
          ]}
        >
          {stateTranslation[ProjectChoiceState.PENDING as ProjectChoiceState]}
        </Text>
        <Text
          style={[
            styles.text,
            styles.span,
            colorState[project.ProjectChoiceCompany as ProjectChoiceState],
          ]}
        >
          {stateTranslation[project.ProjectChoiceCompany as ProjectChoiceState]}
        </Text>
      </View>
      {isCompanyReception &&
        project.ProjectChoiceCompany === ProjectChoiceState.PENDING && (
          <ValidationForm
            isRejected={isRejected}
            setIsRejected={setIsRejected}
            rejectionReason={rejectionReason}
            setRejectionReason={setRejectionReason}
            setUpdated={setUpdated}
            update={updateProject}
          />
        )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "90%",
    padding: 16,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: Colors.background,
  },
  span: {
    fontWeight: "bold",
  },
  accepted: {
    color: Colors.green,
  },
  rejected: {
    color: Colors.red,
  },
  nameContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontStyle: "italic",
  },
  description: {
    width: "90%",
    marginVertical: 12,
    textAlign: "center",
  },
  contactContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  contactTextContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
  },
  contactText: {
    textAlign: "center",
  },
  priorityContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  stateContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});
