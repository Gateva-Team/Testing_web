import { useLocation, Navigate } from "react-router-dom";
import EventDetailBase from "@/component/EventDetailBase";

export default function EventDetailWorkshop() {
  const { state } = useLocation();

  // kalau user akses langsung via URL tanpa state
  if (!state) {
    return <Navigate to="/event/workshop" replace />;
  }

  return (
    <EventDetailBase
      events={[state]}
      backLink="/event/workshop"
      categoryKey="workshop"
      ctaLabel="Daftar Workshop"
      descriptionTitle="Tentang Workshop"
    />
  );
}
