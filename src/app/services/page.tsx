import ServicesClient from "./ServicesClient";
import { getServiceList } from "@/lib/public-content.server";

export default async function ServicesPage() {
  const services = await getServiceList();
  return <ServicesClient managedServices={services} />;
}
