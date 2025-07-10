import AddressInputs from "@/components/AddressInputs";
import Input from "@/components/form/Input";
import Search from "@/components/form/Search/Search";
import { Colors } from "@/constants/Colors";
import { Project, Recommandation, User } from "@/types";
import { useState } from "react";
import PersonTypeSelector from "../PersonTypeSelector";
import PersonalInformations from "./PersonalInformations";
import { styles } from "./UserInformations.styles";

interface UserInformationsProps {
  type: "project" | "company" | "lead";
  project: Project;
  recommandation: Recommandation;
  users: User[];
  userName: string;
  setUserName: (name: string) => void;
  handleChange: (
    key: keyof Recommandation | keyof Project,
    value: string | number | boolean | undefined
  ) => void;
  isDataValid: boolean | undefined;
}

export default function UserInformations({
  type,
  project,
  recommandation,
  users,
  userName,
  setUserName,
  handleChange,
  isDataValid,
}: UserInformationsProps) {
  const [internUser, setInternUser] = useState<boolean>(true);
  return (
    <>
      {type !== "project" ? (
        <>
          <PersonTypeSelector
            intern={internUser}
            setIntern={setInternUser}
            type="user"
          />
          {internUser ? (
            <>
              <Search
                name="Nom de l'utilisateur"
                list={users.map((u) => u.firstName + " " + u.lastName)}
                placeholder="Chercher un utilisateur..."
                titleStyle={styles.inputTitle}
                inputStyle={{
                  ...styles.input,
                  color: Colors.white,
                  placeholderTextColor: Colors.white,
                }}
                value={userName}
                onChangeText={(text) => {
                  setUserName(text);
                  const user = users.find(
                    (u) => u.firstName + " " + u.lastName === text
                  );
                  if (user) {
                    (
                      Object.keys(recommandation) as (keyof Recommandation)[]
                    ).forEach((key) => {
                      if (key in user && key !== "companyId") {
                        const value = user[key as keyof User];
                        if (value instanceof Date) return;
                        handleChange(key, value === null ? undefined : value);
                      }
                    });
                  }
                  handleChange("recipientId", user?.id || "");
                }}
                valid={internUser && isDataValid}
              />
            </>
          ) : (
            <>
              <PersonalInformations
                recommandation={recommandation}
                handleChange={handleChange}
                isDataValid={isDataValid}
              />
              <AddressInputs
                data={recommandation}
                handleChange={handleChange}
                isDataValid={isDataValid}
              />
            </>
          )}
        </>
      ) : (
        <Input
          name="Nom du projet"
          placeholder="Développement d'une application mobile"
          type="off"
          titleStyle={styles.inputTitle}
          inputStyle={{
            ...styles.input,
            placeholderTextColor: Colors.grey,
          }}
          value={project.name}
          onChangeText={(text) => handleChange("name", text || "")}
          valid={isDataValid}
        />
      )}
    </>
  );
}
