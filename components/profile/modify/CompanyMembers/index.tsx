import { AppContext } from "@/context/context";
import { Company, User } from "@/types";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import AddEmployee from "./AddEmployee";
import { styles } from "./CompanyMembers.styles";

export default function CompanyMembers() {
  const { API_URL, companyId } = useContext(AppContext);
  const [members, setMembers] = useState<User[]>([]);
  const [company, setCompany] = useState<Company>();
  const [isAddVisible, setIsAddVisible] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      axios
        .get(`${API_URL}/company/${companyId}/users`)
        .then((response) => {
          const { users, ...company } = response.data;
          setMembers(users);
          setCompany(company);
        })
        .catch((error) => {
          console.error("Error fetching company members:", error);
        });
    };
    fetchMembers();
  }, [companyId, API_URL]);

  const updateUser = async (userId: string) => {
    axios
      .patch(`${API_URL}/users/${userId}`, {
        companyId: null,
      })
      .then(() => {
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member.id !== userId)
        );
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Membres de l&apos;entreprise</Text>
      {members &&
        members.map((member) => (
          <View key={member.id} style={styles.member}>
            <View style={styles.memberInfo}>
              <Text style={styles.memberText}>
                {member.firstName + " " + member.lastName}
              </Text>
              {member.id === company?.ownerId ? (
                <Text style={styles.ownerRole}>Propriétaire</Text>
              ) : (
                <Text style={styles.memberRole}>Employé</Text>
              )}
            </View>
            <Pressable
              style={styles.deleteButton}
              onPress={() => {
                if (member.id) updateUser(member.id);
              }}
            >
              <Text style={styles.deleteButtonText}>Supprimer</Text>
            </Pressable>
          </View>
        ))}
      <Pressable
        style={styles.addButton}
        onPress={() => setIsAddVisible(!isAddVisible)}
      >
        <Text style={styles.addButtonText}>Ajouter un nouvel employé</Text>
      </Pressable>
      {isAddVisible && companyId && (
        <AddEmployee
          companyId={companyId}
          setMembers={setMembers}
          members={members}
        />
      )}
    </View>
  );
}
