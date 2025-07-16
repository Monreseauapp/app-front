export const initialUser = {
  firstName: "Harry",
  lastName: "Potter",
  email: "harry.potter@example.com",
  password: "password123",
  city: "London",
  phone: "0123456789",
  domainId: "job1",
  updatedAt: new Date().toISOString(),
  rententionDate: new Date(
    new Date().setFullYear(new Date().getFullYear() + 3)
  ).toISOString(),
};
