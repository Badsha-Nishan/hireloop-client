import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createSubscription } from "@/lib/actions/subscriptions";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const status = session.status;
  const customerEmail = session.customer_details?.email;
  const metadata = session.metadata;
  // console.log("here is metadata", metadata);
  // console.log("customer email", customerEmail);

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const subsInfo = {
      email: customerEmail,
      planId: metadata?.planId,
    };

    const result = await createSubscription(subsInfo);
    console.log("here is the result", result);
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-950 text-slate-100 px-4">
        {/* Decorative Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-md w-full bg-slate-900 border border-slate-800/80 rounded-2xl p-8 text-center shadow-2xl shadow-slate-950/50">
          {/* Animated Success Badge */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6 animate-pulse">
            <svg
              className="h-8 w-8 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400 mb-3">
            Payment Successful!
          </h1>
          <p className="text-sm text-slate-400 mb-8">
            Thank you for unlocking premium access on hireloop.
          </p>

          <hr className="border-slate-800 my-6" />

          {/* Message Block */}
          <div className="text-left space-y-4 text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-5 rounded-xl border border-slate-800/50">
            <p>
              We appreciate your business! A confirmation email has been sent to{" "}
              <span className="font-semibold text-emerald-400 break-all">
                {customerEmail}
              </span>
              .
            </p>
            <p className="text-xs text-slate-400">
              Have questions or need help setting up your account? Drop us a
              line at{" "}
              <a
                href="mailto:support@hireloop.com"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium underline underline-offset-4"
              >
                support@hireloop.com
              </a>
              .
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="mt-8 space-y-3">
            <Link
              href="/dashboard"
              className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm py-3 px-4 rounded-xl shadow-lg transition-all duration-200"
            >
              Go to My Dashboard
            </Link>
            <Link
              href="/"
              className="block w-full text-center bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm py-3 px-4 rounded-xl transition-all duration-200"
            >
              Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
