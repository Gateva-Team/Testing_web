import EventDetailBase from "@/component/EventDetailBase";
import musicEvents from "../../data/eventMusicPublic.json";

export default function EventDetailMusik() {
  return (
    <EventDetailBase
      events={musicEvents}
      backLink="/event/musik"
      categoryKey="musik"
      ctaLabel="Beli Tiket Musik"
      descriptionTitle="Tentang Konser Musik"
    />
  );
}
