import authStore from "../../../mobx/AuthStore";

const AuthUser = () => {
  return (
    <div>
      <h3>
        {authStore.isAuth
          ? `Користувач авторизований ${authStore.user.email}`
          : "АВТОРИЗУЙТЕСЯ!!!"}
      </h3>
      <h3>
        {authStore.user.isActivated
          ? `Аккаунт підтверджений по почті ${authStore.user.email}`
          : "ПІДТВЕРДІТЬ АККАУНТ!!!"}
      </h3>
      <button onClick={() => authStore.logout()}>Вийти</button>
      {/* <button onClick={authStore.getUsers}>Получить пользователей</button> */}

      {authStore.users.map((user) => {
        return <div key={user.email}>{user.email}</div>;
      })}
    </div>
  );
};

export default AuthUser;
