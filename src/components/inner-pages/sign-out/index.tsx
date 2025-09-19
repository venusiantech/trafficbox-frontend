import HeaderFour from "@/layout/headers/HeaderFour";
import SignInArea from "../sign-in/sign-in-area";


const SignOut = () => {
    return (
        <>
        <HeaderFour />
        <main>
            <SignInArea sing_out={true} />
        </main>
        </>
    );
};

export default SignOut;