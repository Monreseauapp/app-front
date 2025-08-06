export default function validateFormData<T extends object>(data: T) {
  return Object.keys(data).every((key) => {
    return (
      !["", null, undefined].includes((data as any)[key]) &&
      !(
        key === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((data as any)[key])
      ) &&
      !(
        key === "password" &&
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.\/?]{8,}$/.test(
          (data as any)[key]
        )
      )
    );
  });
}
