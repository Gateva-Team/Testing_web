import { useLocation, Navigate } from "react-router-dom";
import EventDetailBase from "@/component/EventDetailBase";

export default function EventDetailMusik() {
  const { state } = useLocation();

  // kalau user akses langsung via URL tanpa state kmr pake useEffect
  if (!state) {
    return <Navigate to="/event/musik" replace />;
  }

  return (
    <EventDetailBase
      events={[state]}   
      backLink="/event/musik"
      categoryKey="musik"
      ctaLabel="Beli Tiket Musik"
      descriptionTitle="Tentang Konser Musik"
    />
  );
}
