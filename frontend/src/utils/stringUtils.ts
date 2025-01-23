export const formatRoleName = (role: string) => {
  return role
    .replace(/([A-Z])/g, " $1")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
};
