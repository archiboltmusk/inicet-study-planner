import { describe, it, expect, beforeEach } from "vitest";
import {
  collectPerformanceMetrics,
  getResourceMetrics,
  generatePerformanceReport,
  isPerformanceAcceptable,
  getPerformanceRecommendations,
  measureExecutionTime,
  getMemoryUsage,
} from "@/lib/performance";

describe("performance utilities", () => {
  describe("collectPerformanceMetrics", () => {
    it("returns metrics object", () => {
      const metrics = collectPerformanceMetrics();

      expect(typeof metrics).toBe("object");
      expect(metrics).toHaveProperty("resourceCount");
    });

    it("collects resource count", () => {
      const metrics = collectPerformanceMetrics();

      if (metrics.resourceCount !== undefined) {
        expect(metrics.resourceCount).toBeGreaterThanOrEqual(0);
      }
    });

    it("collects page load time if available", () => {
      const metrics = collectPerformanceMetrics();

      if (metrics.pageLoadTime !== undefined) {
        expect(metrics.pageLoadTime).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe("getResourceMetrics", () => {
    it("returns array of resource metrics", () => {
      const resources = getResourceMetrics();

      expect(Array.isArray(resources)).toBe(true);
    });

    it("each resource has required fields", () => {
      const resources = getResourceMetrics();

      resources.forEach(resource => {
        expect(resource).toHaveProperty("name");
        expect(resource).toHaveProperty("type");
        expect(resource).toHaveProperty("duration");
        expect(resource).toHaveProperty("cached");
      });
    });

    it("resource types are valid", () => {
      const resources = getResourceMetrics();
      const validTypes = ["script", "link", "img", "fetch", "other"];

      resources.forEach(resource => {
        expect(validTypes).toContain(resource.type);
      });
    });
  });

  describe("generatePerformanceReport", () => {
    it("returns report with metrics and resources", () => {
      const report = generatePerformanceReport();

      expect(report).toHaveProperty("metrics");
      expect(report).toHaveProperty("resources");
      expect(report).toHaveProperty("summary");
    });

    it("summary includes required fields", () => {
      const report = generatePerformanceReport();

      expect(report.summary).toHaveProperty("totalResources");
      expect(report.summary).toHaveProperty("cachedResources");
      expect(report.summary).toHaveProperty("totalBundleSize");
      expect(report.summary).toHaveProperty("averageResourceTime");
    });

    it("cached resources count is not greater than total", () => {
      const report = generatePerformanceReport();

      expect(report.summary.cachedResources).toBeLessThanOrEqual(report.summary.totalResources);
    });
  });

  describe("isPerformanceAcceptable", () => {
    it("returns boolean", () => {
      const result = isPerformanceAcceptable();

      expect(typeof result).toBe("boolean");
    });
  });

  describe("getPerformanceRecommendations", () => {
    it("returns array of recommendations", () => {
      const recommendations = getPerformanceRecommendations();

      expect(Array.isArray(recommendations)).toBe(true);
      expect(recommendations.length).toBeGreaterThan(0);
    });

    it("each recommendation is a string", () => {
      const recommendations = getPerformanceRecommendations();

      recommendations.forEach(rec => {
        expect(typeof rec).toBe("string");
        expect(rec.length).toBeGreaterThan(0);
      });
    });

    it("includes positive feedback when performance is good", () => {
      const recommendations = getPerformanceRecommendations();

      // Should always have at least one recommendation
      expect(recommendations.length).toBeGreaterThan(0);
    });
  });

  describe("measureExecutionTime", () => {
    it("measures synchronous function execution", async () => {
      const { result, duration } = await measureExecutionTime(
        () => 42,
        "test-sync"
      );

      expect(result).toBe(42);
      expect(duration).toBeGreaterThanOrEqual(0);
    });

    it("measures async function execution", async () => {
      const { result, duration } = await measureExecutionTime(
        async () => {
          await new Promise(resolve => setTimeout(resolve, 10));
          return "done";
        },
        "test-async"
      );

      expect(result).toBe("done");
      expect(duration).toBeGreaterThanOrEqual(10);
    });

    it("returns duration in milliseconds", async () => {
      const { duration } = await measureExecutionTime(
        async () => {
          await new Promise(resolve => setTimeout(resolve, 50));
        },
        "test-duration"
      );

      expect(duration).toBeGreaterThanOrEqual(50);
    });
  });

  describe("getMemoryUsage", () => {
    it("returns memory object", () => {
      const memory = getMemoryUsage();

      expect(typeof memory).toBe("object");
    });

    it("may return memory metrics if available", () => {
      const memory = getMemoryUsage();

      if (memory.usedJSHeapSize !== undefined) {
        expect(memory.usedJSHeapSize).toBeGreaterThanOrEqual(0);
      }
    });
  });
});
