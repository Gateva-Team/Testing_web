import EventDetailBase from "@/component/EventDetailBase";
import seminarEvents from "../../data/eventSeminarPublic.json";

export default function EventDetailSeminar() {
  return (
    <EventDetailBase
      events={seminarEvents}
      backLink="/event/seminar"
      categoryKey="seminar"
      ctaLabel="Daftar Seminar"
      descriptionTitle="Tentang Seminar"
    />
  );
}
