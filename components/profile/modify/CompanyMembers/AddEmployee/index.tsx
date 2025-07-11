import Search from "@/components/form/Search/Search";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { User } from "@/types";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./AddEmployee.styles";

interface AddEmployeeProps {
  members: User[];
  companyId: string;
  setMembers: React.Dispatch<React.SetStateAction<User[]>>;
}

export default function AddEmployee({
  members,
  companyId,
  setMembers,
}: AddEmployeeProps) {
  const { API_URL } = useContext(AppContext);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      axios
        .get(`${API_URL}/users`)
        .then((response) => {
          const users = response.data.filter(
            (user: User) => user.companyId === null
          );
          setUsers(users);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    };
    fetchUsers();
  }, [members, API_URL]);

  const updateUser = async (userId: string) => {
    axios
      .patch(`${API_URL}/users/${userId}`, {
        companyId: companyId,
      })
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        const addedUser = users.find((user) => user.id === userId);
        if (addedUser) {
          setMembers((prevMembers: User[]) => [...prevMembers, addedUser]);
        }
      })
      .then(() => {
        setCurrentUser("");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };
  return (
    <View style={styles.container}>
      <Search
        name="Chercher un utilisateur"
        list={users.map((user) => user.firstName + " " + user.lastName)}
        placeholder="Votre recherche..."
        value={currentUser}
        onChangeText={setCurrentUser}
        titleStyle={styles.titleSearch}
        inputStyle={{ placeholderTextColor: Colors.white }}
      />
      <Pressable
        style={styles.addButton}
        onPress={() => {
          const userId = users.find(
            (user) => user.firstName + " " + user.lastName === currentUser
          )?.id;
          userId && updateUser(userId);
        }}
      >
        <Text style={styles.addButtonText}>Ajouter un employé</Text>
      </Pressable>
    </View>
  );
}
