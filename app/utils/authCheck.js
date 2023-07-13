export const canManage = (session, item) => {
  if (!session) return false;
  return (
    session.user.role === "admin" || session.user.email === item.author.email
  );
};
