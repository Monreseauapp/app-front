export const initialProject = {
  name: "",
  description: "",
  companyId: "",
  initiatorId: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  retentionDate: new Date(
    new Date().setFullYear(new Date().getFullYear() + 3)
  ).toISOString(),
};
