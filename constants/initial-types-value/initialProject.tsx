import { ProjectChoiceState } from "@/types";

export const initialProject = {
  name: "",
  description: "",
  companyId: "",
  initiatorId: "",
  ProjectChoiceCompany: ProjectChoiceState.PENDING,
  createdAt: new Date(),
  updatedAt: new Date(),
  retentionDate: new Date(
    new Date().setFullYear(new Date().getFullYear() + 3)
  ).toISOString(),
};
