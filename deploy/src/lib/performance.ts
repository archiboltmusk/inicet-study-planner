export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  ttfb?: number; // Time to First Byte
  cls?: number; // Cumulative Layout Shift
  inp?: number; // Interaction to Next Paint
  domContentLoaded?: number;
  pageLoadTime?: number;
  resourceCount?: number;
  jsSize?: number; // Estimated JS bundle size
  cssSize?: number; // Estimated CSS bundle size
}

export interface ResourceMetrics {
  name: string;
  type: "script" | "link" | "img" | "fetch" | "other";
  duration: number;
  size?: number;
  decodedSize?: number;
  cached: boolean;
}

/**
 * Collect performance metrics using Performance API
 */
export function collectPerformanceMetrics(): PerformanceMetrics {
  if (typeof window === "undefined" || !window.performance) {
    return {};
  }

  const metrics: PerformanceMetrics = {};
  const perfEntries = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;

  if (perfEntries) {
    metrics.ttfb = perfEntries.responseStart - perfEntries.requestStart;
    metrics.domContentLoaded = perfEntries.domContentLoadedEventEnd - perfEntries.domContentLoadedEventStart;
    metrics.pageLoadTime = perfEntries.loadEventEnd - perfEntries.loadEventStart;
  }

  // Get paint timings
  const paintEntries = performance.getEntriesByType("paint");
  paintEntries.forEach(entry => {
    if (entry.name === "first-contentful-paint") {
      metrics.fcp = entry.startTime;
    }
  });

  // Count resources
  const resources = performance.getEntriesByType("resource");
  metrics.resourceCount = resources.length;

  // Estimate bundle sizes
  let jsSize = 0;
  let cssSize = 0;

  resources.forEach(resource => {
    if (resource.name.endsWith(".js")) {
      jsSize += (resource as PerformanceResourceTiming).transferSize || 0;
    } else if (resource.name.endsWith(".css")) {
      cssSize += (resource as PerformanceResourceTiming).transferSize || 0;
    }
  });

  if (jsSize > 0) metrics.jsSize = jsSize;
  if (cssSize > 0) metrics.cssSize = cssSize;

  return metrics;
}

/**
 * Get detailed resource metrics
 */
export function getResourceMetrics(): ResourceMetrics[] {
  if (typeof window === "undefined" || !window.performance) {
    return [];
  }

  const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
  const metrics: ResourceMetrics[] = [];

  resources.forEach(resource => {
    let type: ResourceMetrics["type"] = "other";

    if (resource.name.endsWith(".js")) {
      type = "script";
    } else if (resource.name.endsWith(".css")) {
      type = "link";
    } else if (/\.(png|jpg|jpeg|gif|svg|webp)$/i.test(resource.name)) {
      type = "img";
    } else if (resource.initiatorType === "fetch" || resource.initiatorType === "xmlhttprequest") {
      type = "fetch";
    }

    metrics.push({
      name: resource.name.split("/").pop() || "unknown",
      type,
      duration: resource.duration,
      size: resource.transferSize || 0,
      decodedSize: resource.decodedBodySize || 0,
      cached: resource.transferSize === 0 && resource.decodedBodySize > 0,
    });
  });

  return metrics;
}

/**
 * Generate performance report
 */
export function generatePerformanceReport(): {
  metrics: PerformanceMetrics;
  resources: ResourceMetrics[];
  summary: {
    totalResources: number;
    cachedResources: number;
    totalBundleSize: number;
    slowestResource: ResourceMetrics | null;
    averageResourceTime: number;
  };
} {
  const metrics = collectPerformanceMetrics();
  const resources = getResourceMetrics();

  const totalResources = resources.length;
  const cachedResources = resources.filter(r => r.cached).length;
  const totalBundleSize = resources.reduce((sum, r) => sum + (r.size || 0), 0);
  const slowestResource = resources.length > 0 ? resources.reduce((prev, current) =>
    current.duration > prev.duration ? current : prev
  ) : null;
  const averageResourceTime = resources.length > 0
    ? resources.reduce((sum, r) => sum + r.duration, 0) / resources.length
    : 0;

  return {
    metrics,
    resources,
    summary: {
      totalResources,
      cachedResources,
      totalBundleSize,
      slowestResource,
      averageResourceTime,
    },
  };
}

/**
 * Check if performance is acceptable
 */
export function isPerformanceAcceptable(): boolean {
  const metrics = collectPerformanceMetrics();

  return (
    (metrics.fcp === undefined || metrics.fcp < 1800) && // Good FCP: < 1.8s
    (metrics.lcp === undefined || metrics.lcp < 2500) && // Good LCP: < 2.5s
    (metrics.inp === undefined || metrics.inp < 200) && // Good INP: < 200ms
    (metrics.cls === undefined || metrics.cls < 0.1) && // Good CLS: < 0.1
    (metrics.pageLoadTime === undefined || metrics.pageLoadTime < 3000) // Page load < 3s
  );
}

/**
 * Monitor long tasks
 */
export function monitorLongTasks(callback: (duration: number) => void, threshold: number = 50): () => void {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
    return () => {};
  }

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const duration = (entry as any).duration;
        if (duration > threshold) {
          callback(duration);
        }
      }
    });

    observer.observe({ entryTypes: ["longtask"] });

    return () => observer.disconnect();
  } catch {
    return () => {};
  }
}

/**
 * Measure execution time of a function
 */
export async function measureExecutionTime<T>(
  fn: () => Promise<T> | T,
  label: string = "operation"
): Promise<{ result: T; duration: number }> {
  const start = performance.now();
  const result = await Promise.resolve(fn());
  const duration = performance.now() - start;

  if (process.env.NODE_ENV === "development") {
    console.debug(`[perf] ${label}: ${duration.toFixed(2)}ms`);
  }

  return { result, duration };
}

/**
 * Get memory usage (if available)
 */
export function getMemoryUsage(): {
  usedJSHeapSize?: number;
  totalJSHeapSize?: number;
  jsHeapSizeLimit?: number;
} {
  if (typeof window === "undefined") {
    return {};
  }

  const memory = (performance as any).memory;
  if (!memory) {
    return {};
  }

  return {
    usedJSHeapSize: memory.usedJSHeapSize,
    totalJSHeapSize: memory.totalJSHeapSize,
    jsHeapSizeLimit: memory.jsHeapSizeLimit,
  };
}

/**
 * Recommend performance optimizations based on metrics
 */
export function getPerformanceRecommendations(): string[] {
  const metrics = collectPerformanceMetrics();
  const resources = getResourceMetrics();
  const recommendations: string[] = [];

  // Check FCP
  if (metrics.fcp !== undefined && metrics.fcp > 1800) {
    recommendations.push("FCP is high (>1.8s). Consider optimizing critical resources or enabling compression.");
  }

  // Check LCP
  if (metrics.lcp !== undefined && metrics.lcp > 2500) {
    recommendations.push("LCP is high (>2.5s). Optimize image loading and largest content element.");
  }

  // Check JS bundle size
  if (metrics.jsSize !== undefined && metrics.jsSize > 500000) {
    recommendations.push(`JS bundle is large (${(metrics.jsSize / 1024).toFixed(0)}KB). Consider code splitting or lazy loading.`);
  }

  // Check CSS bundle size
  if (metrics.cssSize !== undefined && metrics.cssSize > 100000) {
    recommendations.push(`CSS bundle is large (${(metrics.cssSize / 1024).toFixed(0)}KB). Consider critical CSS inlining.`);
  }

  // Check resource count
  if (resources.length > 50) {
    recommendations.push(`High resource count (${resources.length}). Consider bundling or combining requests.`);
  }

  // Check uncached resources
  const uncachedResources = resources.filter(r => !r.cached);
  if (uncachedResources.length > resources.length * 0.5) {
    recommendations.push("Many resources are not cached. Enable HTTP caching headers.");
  }

  if (recommendations.length === 0) {
    recommendations.push("Performance looks good! No immediate optimizations recommended.");
  }

  return recommendations;
}
