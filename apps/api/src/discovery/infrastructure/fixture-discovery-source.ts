import { DiscoverySourceError, type DiscoverySource } from "../application/discovery-source.js";
import type { DiscoverySearchRequest, RawDiscoveryResult } from "../domain/discovery.js";

type Fixture = Omit<RawDiscoveryResult, "collectedAt">;

const fixtures: Fixture[] = [
  {
    name: "La Cocina de Alta Gracia",
    category: "restaurantes",
    address: "Belgrano 550",
    city: "Alta Gracia",
    latitude: -31.653,
    longitude: -64.428,
    phone: "03547 421234",
    website: null,
    socialLinks: ["https://instagram.com/lacocinadealtagracia"],
    sourceType: "fixture",
    sourceUrl: "fixture://alta-gracia/restaurantes",
    warnings: [],
    rawPayload: { id: "restaurant-1", title: "La Cocina de Alta Gracia" },
  },
  {
    name: "Restaurante El Tajamar",
    category: "restaurantes",
    address: "Av. Belgrano 150",
    city: "Alta Gracia",
    latitude: null,
    longitude: null,
    phone: null,
    website: "https://eltajamar.example",
    socialLinks: null,
    sourceType: "fixture",
    sourceUrl: "fixture://alta-gracia/restaurantes",
    warnings: ["Coordinates were not provided by the source"],
    rawPayload: { id: "restaurant-2", name: "Restaurante El Tajamar" },
  },
  {
    name: "Inmobiliaria Sierras",
    category: "inmobiliarias",
    address: "España 820",
    city: "Alta Gracia",
    latitude: -31.655,
    longitude: -64.43,
    phone: "03547 400987",
    website: "https://sierras.example",
    socialLinks: null,
    sourceType: "fixture",
    sourceUrl: "fixture://alta-gracia/inmobiliarias",
    warnings: [],
    rawPayload: { id: "real-estate-1", name: "Inmobiliaria Sierras" },
  },
  {
    name: "Alta Gracia Propiedades",
    category: "inmobiliarias",
    address: null,
    city: "Alta Gracia",
    latitude: null,
    longitude: null,
    phone: null,
    website: null,
    socialLinks: ["https://facebook.com/altagraciapropiedades"],
    sourceType: "fixture",
    sourceUrl: "fixture://alta-gracia/inmobiliarias",
    warnings: ["Address was not provided by the source"],
    rawPayload: { id: "real-estate-2", label: "Alta Gracia Propiedades" },
  },
];

export class InMemoryFixtureDiscoverySource implements DiscoverySource {
  async search(request: DiscoverySearchRequest): Promise<RawDiscoveryResult[]> {
    if (request.timeoutMs <= 0) {
      throw new DiscoverySourceError("Source request timed out", "timeout");
    }

    const matches = fixtures.filter(
      (fixture) =>
        fixture.category?.toLowerCase() === request.category.toLowerCase() &&
        normalizeRegion(fixture.city) === normalizeRegion(request.region),
    );

    return matches.slice(0, request.limit).map((fixture) => ({
      ...fixture,
      collectedAt: new Date(),
    }));
  }
}

function normalizeRegion(region: string | null): string {
  return (region ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/,\s*cordoba$/, "")
    .replace(/\s+cordoba$/, "")
    .trim();
}
