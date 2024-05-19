export default function MyPage() {
  const rolesString = localStorage
    .getItem("roles")
    ?.replace(/[[\]"]+/g, "")
    .replace(",", ", ");

  const user = useAuth().getUser();

  return (
    <div id="my-page-container">
      <h1>My Page</h1>
      <p>Logged in as: {localStorage.getItem("username")}</p>
      <p>Role: {rolesString}</p>
    </div>
  );
}
