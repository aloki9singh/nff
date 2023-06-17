import LoginComp from "../components/Student/LoginComp";

function login() {
  return (
    <div className={
      //styles.mainSignComp
      "w-screen h-screen bg-blu flex flex-col md:flex-row "
    }>
      <LoginComp />
    </div>
  );
}

export default login;
