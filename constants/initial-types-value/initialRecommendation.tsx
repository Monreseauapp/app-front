export const initialRecommendation = {
  companyId: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  city: "",
  companyName: "",
  companyCity: "",
  companyEmail: "",
  companyPhone: "",
  updatedAt: new Date(),
  initiatorId: "",
  retentionDate: new Date(
    new Date().setFullYear(new Date().getFullYear() + 3)
  ).toISOString(),
};
