"use server";

import { serverMutation } from "../core/sever";

export const submitApplication = async (applicationData) => {
  return serverMutation("/api/applications", applicationData);
};
