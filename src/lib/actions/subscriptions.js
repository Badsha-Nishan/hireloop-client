"use server";

import { serverMutation } from "../core/sever";

export const createSubscription = async (subsInfo) => {
  return serverMutation("/api/subscriptions", subsInfo);
};
