import { AppContext } from "@/context/context";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

import Select from "../form/Select";

interface JobDomainData {
  [key: string]: any;
}

interface JobDomainSelectProps<T extends JobDomainData> {
  data: T;
  style?: object;
  titleStyle?: object;
  handleChange: (key: string, value: string) => void;
  domainIdKey: string;
  valid?: boolean | null;
}

export default function JobDomainSelect<T extends JobDomainData>({
  data,
  style,
  titleStyle,
  handleChange,
  domainIdKey,
  valid = null,
}: JobDomainSelectProps<T>) {
  const { API_URL } = useContext(AppContext);
  const [jobDomains, setJobDomains] = useState<
    { id: string; domaine: string }[]
  >([]);

  useEffect(() => {
    const fetchJobDomains = async () => {
      axios
        .get(`${API_URL}/job-domain`)
        .then((response) => {
          const data = response.data;
          setJobDomains(data);
        })
        .catch((error) => {
          console.error("Error fetching job domains:", error.request);
        });
    };
    fetchJobDomains();
  }, [API_URL]);

  return (
    <Select
      title="Domaine d'activité"
      choices={jobDomains.map((domain) => domain.domaine)}
      selectStyle={style}
      titleStyle={titleStyle}
      selected={
        jobDomains.find((domain) => domain.id === data[domainIdKey])?.domaine ||
        ""
      }
      setSelected={(value) => {
        const selectedDomain = jobDomains.find(
          (domain) => domain.domaine === value
        );
        if (selectedDomain) {
          handleChange(domainIdKey, selectedDomain.id);
        }
      }}
      valid={valid}
    />
  );
}
