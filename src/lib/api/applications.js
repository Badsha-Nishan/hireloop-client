import { serverFetch } from "../core/sever";

export const getApplicationsByApplicant = async (applicantId) => {
  return serverFetch(`/api/applications?applicantId=${applicantId}`);
};
