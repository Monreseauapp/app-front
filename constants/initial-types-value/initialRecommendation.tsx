export const initialRecommendation = {
  companyId: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  addressComplement: "",
  city: "",
  postalCode: undefined,
  country: "",
  updatedAt: new Date(),
  initiatorId: "",
  retentionDate: new Date(
    new Date().setFullYear(new Date().getFullYear() + 3)
  ).toISOString(),
};
