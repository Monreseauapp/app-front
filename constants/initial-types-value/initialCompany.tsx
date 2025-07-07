export const initialCompany = {
  name: "",
  address: "",
  addressComplement: "",
  postalCode: undefined,
  city: "",
  country: "",
  email: "",
  phone: "",
  subscriptionId: "free",
  ownerId: "",
  retentionDate: new Date(
    new Date().setFullYear(new Date().getFullYear() + 3)
  ).toISOString(),
  updatedAt: new Date().toISOString(),
  lastLogin: new Date().toISOString(), // To be remove
  OpentoReco: false,
};
