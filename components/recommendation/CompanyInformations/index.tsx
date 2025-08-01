import Search from "@/components/form/Search/Search";
import { Colors } from "@/constants/Colors";
import { Company, Project, Recommandation } from "@/types";
import { useState } from "react";
import PersonTypeSelector from "../PersonTypeSelector";
import CompanyDetails from "./CompanyDetails";
import { styles } from "./CompanyInformations.styles";

interface CompanyInformationsProps {
  type: "project" | "company" | "lead";
  project: Project;
  recommandation: Recommandation;
  companies: Company[];
  companyName: string;
  setCompanyName: (name: string) => void;
  handleChange: (
    key: keyof Recommandation | keyof Project,
    value: string | number | boolean | undefined
  ) => void;
  isDataValid: boolean | undefined;
}

export default function CompanyInformations({
  type,
  project,
  recommandation,
  companies,
  companyName,
  setCompanyName,
  handleChange,
  isDataValid,
}: CompanyInformationsProps) {
  const [internCompany, setInternCompany] = useState<boolean>(true);
  return (
    <>
      {(type === "project" || type === "company") && (
        <>
          <PersonTypeSelector
            intern={internCompany}
            setIntern={setInternCompany}
            type="company"
          />
          {internCompany ? (
            <Search
              name="Nom de l'entreprise"
              list={companies.map((c) => c.name)}
              placeholder="Chercher une entreprise..."
              titleStyle={styles.inputTitle}
              inputStyle={{
                ...styles.input,
                color: Colors.white,
              }}
              value={companyName}
              onChangeText={(text) => {
                setCompanyName(text);
                const company = companies.find((c) => c.name === text);
                if (company) {
                  (Object.keys(company) as (keyof Company)[]).forEach((key) => {
                    if (
                      "company" + key[0].toUpperCase() + key.slice(1) in
                        recommandation &&
                      key !== "id"
                    ) {
                      const value = company[key as keyof Company];
                      if (value instanceof Date || !value) return;
                      handleChange(
                        ("company" +
                          key[0].toUpperCase() +
                          key.slice(1)) as keyof Recommandation,
                        value === null ? undefined : value
                      );
                    }
                  });
                }
                handleChange("companyId", company?.id || "");
              }}
              valid={isDataValid}
              zIndex={10}
            />
          ) : (
            <>
              <CompanyDetails
                data={type === "company" ? recommandation : project}
                handleChange={handleChange}
                isDataValid={isDataValid}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
