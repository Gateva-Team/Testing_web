import EventDetailBase from "@/component/EventDetailBase";
import lombaEvents from "../../data/eventLombaPublic.json";

export default function EventDetailLomba() {
  return (
    <EventDetailBase
      events={lombaEvents}
      backLink="/event/lomba"
      categoryKey="lomba"
      ctaLabel="Daftar Lomba"
      descriptionTitle="Tentang Lomba"
    />
  );
}
