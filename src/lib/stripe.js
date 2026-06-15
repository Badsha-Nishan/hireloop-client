import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  seeker_pro: "price_1TiXkhGjZ072YiBsHM25oM4t",
  seeker_premium: "price_1TiXkhGjZ072YiBsHM25oM4t",
  recruiter_growth: "price_1TiYG8GjZ072YiBsd06eLkZV",
  recruiter_enterprise: "price_1TiYGfGjZ072YiBsyz3dqJaF",
};
