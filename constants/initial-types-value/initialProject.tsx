import { AppContext } from "@/context/context";
import { ProjectChoiceState } from "@/types";
import { useContext } from "react";

export const initialProject = {
  name: "",
  ProjectChoiceCompany: ProjectChoiceState.PENDING,
  companyNumber: 0,
  isPublic: true,
};
