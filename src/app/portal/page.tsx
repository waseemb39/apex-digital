import type { Metadata } from "next";
import CustomerPortal from "@/components/CustomerPortal";

export const metadata: Metadata = {
  title: "Client Portal — Graft Digital",
  description:
    "Complete your department questionnaires so our team can prepare your full strategy before your call.",
};

// The portal is a full-page dark UI — no shared Navbar/Footer
export default function PortalPage() {
  return <CustomerPortal />;
}

