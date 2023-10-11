import React from "react";
import { AuthPageProps } from "@refinedev/core";
import { LoginPage } from "./Form/LoginPage";
import { BoxProps } from "@chakra-ui/react";
import { UseFormProps } from "@refinedev/react-hook-form";

export interface FormPropsType<TFormType> extends UseFormProps {
  onSubmit?: (values: TFormType) => void;
}

export type AuthProps = AuthPageProps<BoxProps, BoxProps, FormPropsType<any>>;

/**
 * **refine** has a default auth page form which is served on `/login` route when the `authProvider` configuration is provided.
 * @param title is not implemented yet.
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/chakra-auth-page/} for more details.
 */
export const AuthPage: React.FC<AuthProps> = (props) => {
  const { type } = props;
  const renderView = () => {
    switch (type) {
      case "register":
        return <LoginPage {...props} />;
      case "forgotPassword":
        return <LoginPage {...props} />;
      case "updatePassword":
        return <LoginPage {...props} />;
      default:
        return <LoginPage {...props} />;
    }
  };

  return <>{renderView()}</>;
};
