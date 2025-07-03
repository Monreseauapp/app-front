import { CompleteProject } from "@/app/(tabs)/my-projects/index/index";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { ProjectChoiceState, RecoState } from "@/types";
import axios from "axios";
import { useContext, useState } from "react";
import { Linking, Platform, Pressable, Text, View } from "react-native";
import PriorityStars from "../../PriorityStars";
import ValidationForm from "../../ValidationForm";
import RelatedPeople from "../RelatedPeople";
import { styles, webStyles } from "./project.styles";

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
    <View
      style={Platform.OS === "web" ? webStyles.container : styles.container}
    >
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
