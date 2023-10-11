import api from "./config";

type ApiLoginProps = {
    account: string;
    account_id: string | null;
    password: string;
    system_id: number | string;
};

export const apiLogin = async ({
    account,
    account_id = null,
    password,
    system_id = 1
}: ApiLoginProps) => {
    try {
        const response = await api.post("/v1/admin-token", {
            account,
            account_id,
            password,
            system_id
        });
        return response.data;
    } catch (error) {
        return { error };
    }
};
