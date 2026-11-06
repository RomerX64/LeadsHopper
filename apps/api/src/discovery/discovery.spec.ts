import { DiscoveryService } from "./application/discovery-source.js";
import type { DiscoverySourceError } from "./application/discovery-source.js";
import {
  DISCOVERY_MAX_RESULTS,
  DISCOVERY_SOURCE_TIMEOUT_MS,
  DiscoveryValidationError,
  createDiscoverySearchRequest,
} from "./domain/discovery.js";
import { InMemoryFixtureDiscoverySource } from "./infrastructure/fixture-discovery-source.js";

describe("discovery", () => {
  it("rejects a limit above the maximum instead of silently clamping it", () => {
    expect(() =>
      createDiscoverySearchRequest({
        category: "restaurantes",
        region: "Alta Gracia Córdoba",
        limit: DISCOVERY_MAX_RESULTS + 1,
      }),
    ).toThrow(DiscoveryValidationError);
  });

  it.each([
    { category: "", region: "Alta Gracia Córdoba" },
    { category: "   ", region: "Alta Gracia Córdoba" },
    { category: "restaurantes", region: "" },
    { category: "restaurantes", region: "   " },
  ])("rejects blank search input %#", (input) => {
    expect(() => createDiscoverySearchRequest(input)).toThrow(DiscoveryValidationError);
  });

  it("uses a 90 second source timeout", () => {
    expect(
      createDiscoverySearchRequest({
        category: "restaurantes",
        region: "Alta Gracia Córdoba",
      }).timeoutMs,
    ).toBe(DISCOVERY_SOURCE_TIMEOUT_MS);
  });

  it("returns restaurant fixtures in Alta Gracia Córdoba", async () => {
    const service = new DiscoveryService(new InMemoryFixtureDiscoverySource());

    const results = await service.search({
      category: "restaurantes",
      region: "Alta Gracia",
      limit: 10,
    });

    expect(results).toHaveLength(2);
    expect(results[0]?.name).toBe("La Cocina de Alta Gracia");
  });

  it("returns real-estate fixtures in Alta Gracia Córdoba", async () => {
    const service = new DiscoveryService(new InMemoryFixtureDiscoverySource());

    const results = await service.search({
      category: "inmobiliarias",
      region: "Alta Gracia Córdoba",
      limit: 10,
    });

    expect(results).toHaveLength(2);
    expect(results[0]?.category).toBe("inmobiliarias");
  });

  it("preserves missing optional fields as null and retains the raw payload", async () => {
    const source = new InMemoryFixtureDiscoverySource();
    const results = await new DiscoveryService(source).search({
      category: "restaurantes",
      region: "Alta Gracia",
    });

    expect(results[1]).toMatchObject({
      address: "Av. Belgrano 150",
      latitude: null,
      longitude: null,
      phone: null,
      socialLinks: null,
      rawPayload: { id: "restaurant-2" },
    });
  });

  it("classifies a source timeout error", async () => {
    await expect(
      new InMemoryFixtureDiscoverySource().search({
        category: "restaurantes",
        region: "Alta Gracia",
        limit: 1,
        timeoutMs: 0,
      }),
    ).rejects.toMatchObject<Partial<DiscoverySourceError>>({
      kind: "timeout",
    });
  });
});
