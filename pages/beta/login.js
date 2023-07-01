import LoginComp from "@/components/common/homepage/login/login";

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
