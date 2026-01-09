import { useLocation, Navigate } from "react-router-dom";
import EventDetailBase from "@/component/EventDetailBase";

export default function EventDetailLomba() {
  const { state } = useLocation();

  // kalau user akses langsung via URL tanpa state kmr pake useEffect
  if (!state) {
    return <Navigate to="/event/lomba" replace />;
  }


  return (
    <EventDetailBase
      events={[state]} // kuci utama dari yang sblumnya events
      backLink="/event/lomba"
      categoryKey="lomba"
      ctaLabel="Daftar Lomba"
      descriptionTitle="Tentang Lomba"
    />
  );
}