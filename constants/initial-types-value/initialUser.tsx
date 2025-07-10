export const initialUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  city: "",
  phone: "",
  domainId: "",
  updatedAt: new Date().toISOString(),
  rententionDate: new Date(
    new Date().setFullYear(new Date().getFullYear() + 3)
  ).toISOString(),
};
