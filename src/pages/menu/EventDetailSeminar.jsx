import { useLocation, Navigate } from "react-router-dom";
import EventDetailBase from "@/component/EventDetailBase";

export default function EventDetailSeminar() {
  const { state } = useLocation();

  // kalau user akses langsung via URL tanpa state
  if (!state) {
    return <Navigate to="/event/seminar" replace />;
  }


  return (
    <EventDetailBase
      events={[state]} 
      backLink="/event/seminar"
      categoryKey="seminar"
      ctaLabel="Daftar Seminar"
      descriptionTitle="Tentang Seminar"
    />
  );
}
