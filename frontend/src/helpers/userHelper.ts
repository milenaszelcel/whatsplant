import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

export const useEnsureValidAuthToken = async () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);

  const { accessToken, refreshToken } = cookies;
  if (!refreshToken) return false;

  if (!accessToken) {
    return updateToken()
      .then(() => true)
      .catch(() => false);
  }

  try {
    const accessTokenexpirationDate = jwtDecode(accessToken).exp;

    if (
      typeof accessTokenexpirationDate !== "number" ||
      accessTokenexpirationDate < Date.now() / 1000
    ) {
      await updateToken();
    }
    return true;
  } catch {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    return false;
  }
};

const updateToken = async () => {
  try {
    const response = await axios.post("http://localhost:3001/refresh", null, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};
