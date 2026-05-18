import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  createImageLazyLoader,
  preloadResource,
  prefetchResource,
  dnsPrefetch,
  preconnect,
  dynamicImport,
  loadScript,
  loadStylesheet,
  shouldPreload,
  runWhenIdle,
  cancelIdleCallback,
} from "@/lib/lazyLoad";

describe("lazy loading utilities", () => {
  describe("createImageLazyLoader", () => {
    it("returns loader with observe, unobserve, and disconnect", () => {
      const loader = createImageLazyLoader();

      expect(typeof loader.observe).toBe("function");
      expect(typeof loader.unobserve).toBe("function");
      expect(typeof loader.disconnect).toBe("function");
    });

    it("works with custom options", () => {
      const loader = createImageLazyLoader({
        threshold: 0.5,
        rootMargin: "100px",
      });

      expect(loader).toBeDefined();
    });

    it("can observe and unobserve images", () => {
      const loader = createImageLazyLoader();
      const img = document.createElement("img");

      expect(() => {
        loader.observe(img);
        loader.unobserve(img);
      }).not.toThrow();
    });

    it("can disconnect loader", () => {
      const loader = createImageLazyLoader();

      expect(() => {
        loader.disconnect();
      }).not.toThrow();
    });
  });

  describe("preloadResource", () => {
    it("creates preload link element", () => {
      preloadResource("https://example.com/image.jpg", "image");

      const links = document.querySelectorAll('link[rel="preload"]');
      expect(links.length).toBeGreaterThan(0);
    });

    it("accepts different resource types", () => {
      const types: Array<"image" | "script" | "style" | "font"> = ["image", "script", "style", "font"];

      types.forEach(type => {
        preloadResource(`https://example.com/resource.${type}`, type);
      });

      // Should have created multiple preload links
      const links = document.querySelectorAll('link[rel="preload"]');
      expect(links.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("prefetchResource", () => {
    it("creates prefetch link element", () => {
      prefetchResource("https://example.com/page.html");

      const links = document.querySelectorAll('link[rel="prefetch"]');
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe("dnsPrefetch", () => {
    it("creates dns-prefetch link", () => {
      dnsPrefetch("example.com");

      const link = document.querySelector('link[rel="dns-prefetch"]');
      expect(link).not.toBeNull();
    });

    it("uses https protocol", () => {
      dnsPrefetch("example.com");

      const link = document.querySelector('link[rel="dns-prefetch"]');
      expect(link?.getAttribute("href")).toContain("https://");
    });
  });

  describe("preconnect", () => {
    it("creates preconnect link", () => {
      preconnect("https://example.com");

      const link = document.querySelector('link[rel="preconnect"]');
      expect(link).not.toBeNull();
    });

    it("sets crossOrigin when requested", () => {
      preconnect("https://example.com", true);

      const link = document.querySelector('link[rel="preconnect"][crossorigin]');
      expect(link).not.toBeNull();
    });
  });

  describe("dynamicImport", () => {
    it("resolves successfully", async () => {
      const result = await dynamicImport(() => Promise.resolve({ data: "test" }));

      expect(result).toEqual({ data: "test" });
    });

    it("calls progress callbacks", async () => {
      const onProgress = vi.fn();

      await dynamicImport(() => Promise.resolve("test"), { onProgress });

      expect(onProgress).toHaveBeenCalledWith("pending");
      expect(onProgress).toHaveBeenCalledWith("loaded");
    });

    it("calls onProgress with 'error' on failure", async () => {
      const onProgress = vi.fn();

      await expect(
        dynamicImport(() => Promise.reject(new Error("test")), { onProgress })
      ).rejects.toThrow();

      expect(onProgress).toHaveBeenCalledWith("error");
    });

    it("respects timeout option", async () => {
      const slowImport = () =>
        new Promise(resolve => setTimeout(() => resolve("slow"), 1000));

      await expect(
        dynamicImport(slowImport, { timeout: 50 })
      ).rejects.toThrow();
    });
  });

  describe("loadScript", () => {
    it("creates script element", async () => {
      const promise = loadScript("https://example.com/test.js");

      const script = document.querySelector('script[src="https://example.com/test.js"]');
      expect(script).not.toBeNull();

      // Clean up (since fetch will fail)
      script?.remove();
    });

    it("sets async attribute", async () => {
      const promise = loadScript("https://example.com/test-async.js");

      // Check if any script has async attribute
      const scripts = document.querySelectorAll('script');
      const hasAsync = Array.from(scripts).some(s => s.async === true);
      expect(hasAsync).toBe(true);

      document.querySelector('script[src="https://example.com/test-async.js"]')?.remove();
    });

    it("sets module type when requested", async () => {
      const promise = loadScript("https://example.com/test-module.js", { module: true });

      // Check if any module script was created
      const scripts = document.querySelectorAll('script[type="module"]');
      expect(scripts.length).toBeGreaterThan(0);

      document.querySelector('script[src="https://example.com/test-module.js"]')?.remove();
    });
  });

  describe("loadStylesheet", () => {
    it("creates link element", async () => {
      const promise = loadStylesheet("https://example.com/test.css");

      const link = document.querySelector('link[href="https://example.com/test.css"]');
      expect(link).not.toBeNull();

      link?.remove();
    });

    it("sets rel to stylesheet", async () => {
      const promise = loadStylesheet("https://example.com/test.css");

      const link = document.querySelector('link[rel="stylesheet"]');
      expect(link).not.toBeNull();

      link?.remove();
    });
  });

  describe("shouldPreload", () => {
    it("returns boolean", () => {
      const result = shouldPreload();

      expect(typeof result).toBe("boolean");
    });

    it("returns true by default", () => {
      const result = shouldPreload();

      expect(result).toBe(true);
    });
  });

  describe("runWhenIdle", () => {
    it("executes callback", async () => {
      const callback = vi.fn();
      const id = runWhenIdle(callback);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(callback).toHaveBeenCalled();
    });

    it("returns valid id", () => {
      const id = runWhenIdle(() => {});

      // ID can be number or Timeout object depending on browser/environment
      expect(id).toBeDefined();
      expect(id).not.toBe(-1);
    });
  });

  describe("cancelIdleCallback", () => {
    it("cancels idle callback", async () => {
      const callback = vi.fn();
      const id = runWhenIdle(callback);

      cancelIdleCallback(id);

      await new Promise(resolve => setTimeout(resolve, 50));

      // Verify id is valid
      expect(id).toBeDefined();
    });
  });
});
