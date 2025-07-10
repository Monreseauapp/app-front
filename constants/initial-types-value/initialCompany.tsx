export const initialCompany = {
  name: "",
  city: "",
  email: "",
  phone: "",
  subscriptionId: null,
  retentionDate: new Date(
    new Date().setFullYear(new Date().getFullYear() + 3)
  ).toISOString(),
  updatedAt: new Date().toISOString(),
  lastLogin: new Date().toISOString(), // To be remove
  OpentoReco: false,
};
