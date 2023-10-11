// import { AuthPage, ThemedTitleV2 } from "@refinedev/chakra-ui";
import { ThemedTitleV2 } from "@refinedev/chakra-ui";
import { AppIcon } from "../../components/app-icon";
import { AuthPage } from "./AuthPage";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      title={
        <ThemedTitleV2
          collapsed={false}
          text="refine Project"
          icon={<AppIcon />}
        />
      }
      formProps={{
        defaultValues: { username: "michael", password: "0DoVHqJp" },
      }}
    />
  );
};
