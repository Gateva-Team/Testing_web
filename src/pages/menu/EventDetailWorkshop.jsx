import EventDetailBase from "@/component/EventDetailBase";
import workshopEvents from "../../data/eventWorkshopPublic.json";

export default function EventDetailWorkshop() {
  return (
    <EventDetailBase
      events={workshopEvents}
      backLink="/event/workshop"
      categoryKey="workshop"
      ctaLabel="Daftar Workshop"
      descriptionTitle="Tentang Workshop"
    />
  );
}
