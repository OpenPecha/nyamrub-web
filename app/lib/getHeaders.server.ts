import getIpAddressByRequest from "./getIpAddress";

export const getHeaders = async (request: Request) => {
  const accessKey = process.env?.API_ACCESS_KEY;
  const ip = getIpAddressByRequest(request);

  if (!accessKey) {
    throw new Error("API_KEY is missing");
  }
  return {
    Accept: "application/json",
    Authorization: accessKey,
    Origin: "https://app.monlam.ai",
    "Content-Type": "application/json",
    "Client-IP": ip,
  };
};
