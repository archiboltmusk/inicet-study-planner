export interface LazyLoadOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
}

/**
 * Create lazy loader for images with intersection observer
 */
export function createImageLazyLoader(options: LazyLoadOptions = {}): {
  observe: (img: HTMLImageElement) => void;
  unobserve: (img: HTMLImageElement) => void;
  disconnect: () => void;
} {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    // Fallback: load images immediately if IntersectionObserver not available
    return {
      observe: (img: HTMLImageElement) => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
      },
      unobserve: () => {},
      disconnect: () => {},
    };
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        observer.unobserve(img);
      }
    });
  }, {
    threshold: options.threshold ?? 0,
    rootMargin: options.rootMargin ?? "50px",
    root: options.root ?? null,
  });

  return {
    observe: (img: HTMLImageElement) => observer.observe(img),
    unobserve: (img: HTMLImageElement) => observer.unobserve(img),
    disconnect: () => observer.disconnect(),
  };
}

/**
 * Preload resources (images, scripts, styles)
 */
export function preloadResource(url: string, type: "image" | "script" | "style" | "font" = "image"): void {
  if (typeof document === "undefined") return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.href = url;

  switch (type) {
    case "image":
      link.as = "image";
      break;
    case "script":
      link.as = "script";
      break;
    case "style":
      link.as = "style";
      break;
    case "font":
      link.as = "font";
      link.crossOrigin = "anonymous";
      break;
  }

  document.head.appendChild(link);
}

/**
 * Prefetch a resource
 */
export function prefetchResource(url: string): void {
  if (typeof document === "undefined") return;

  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = url;

  document.head.appendChild(link);
}

/**
 * DNS prefetch for a domain
 */
export function dnsPrefetch(domain: string): void {
  if (typeof document === "undefined") return;

  const link = document.createElement("link");
  link.rel = "dns-prefetch";
  link.href = `https://${domain}`;

  document.head.appendChild(link);
}

/**
 * Preconnect to a domain (DNS + TCP + TLS)
 */
export function preconnect(url: string, crossOrigin: boolean = false): void {
  if (typeof document === "undefined") return;

  const link = document.createElement("link");
  link.rel = "preconnect";
  link.href = url;
  if (crossOrigin) {
    link.crossOrigin = "anonymous";
  }

  document.head.appendChild(link);
}

/**
 * Dynamic import with error handling and progress tracking
 */
export async function dynamicImport<T = any>(
  importFn: () => Promise<T>,
  options: {
    onProgress?: (status: "pending" | "loaded" | "error") => void;
    timeout?: number;
  } = {}
): Promise<T> {
  options.onProgress?.("pending");

  try {
    const timeoutPromise = options.timeout
      ? new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Import timeout")), options.timeout)
        )
      : Promise.resolve(undefined);

    const result = await Promise.race([
      importFn(),
      timeoutPromise as Promise<T>,
    ]);

    options.onProgress?.("loaded");
    return result;
  } catch (error) {
    options.onProgress?.("error");
    throw error;
  }
}

/**
 * Load script dynamically
 */
export function loadScript(
  src: string,
  options: {
    async?: boolean;
    defer?: boolean;
    module?: boolean;
    onload?: () => void;
    onerror?: (error: Event) => void;
  } = {}
): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    if (typeof document === "undefined") {
      reject(new Error("Document not available"));
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = options.async ?? true;
    script.defer = options.defer ?? false;
    if (options.module) {
      script.type = "module";
    }

    script.onload = () => {
      options.onload?.();
      resolve(script);
    };

    script.onerror = (error) => {
      options.onerror?.(error as Event);
      reject(new Error(`Failed to load script: ${src}`));
    };

    document.head.appendChild(script);
  });
}

/**
 * Load stylesheet dynamically
 */
export function loadStylesheet(
  href: string,
  options: {
    onload?: () => void;
    onerror?: (error: Event) => void;
  } = {}
): Promise<HTMLLinkElement> {
  return new Promise((resolve, reject) => {
    if (typeof document === "undefined") {
      reject(new Error("Document not available"));
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;

    link.onload = () => {
      options.onload?.();
      resolve(link);
    };

    link.onerror = (error) => {
      options.onerror?.(error as Event);
      reject(new Error(`Failed to load stylesheet: ${href}`));
    };

    document.head.appendChild(link);
  });
}

/**
 * Check if resource should be preloaded based on user's connection
 */
export function shouldPreload(): boolean {
  if (typeof navigator === "undefined") return true;

  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  if (!connection) return true;

  // Don't preload on slow connections or when save-data is enabled
  const effectiveType = connection.effectiveType || "4g";
  const saveData = connection.saveData || false;

  return !saveData && (effectiveType === "4g" || effectiveType === "wifi");
}

/**
 * Request idle callback wrapper (with polyfill)
 */
export function runWhenIdle(callback: () => void, timeout?: number): number {
  if (typeof window === "undefined") {
    return -1;
  }

  if ("requestIdleCallback" in window) {
    return (window as any).requestIdleCallback(callback, timeout ? { timeout } : undefined);
  }

  // Polyfill using setTimeout
  return setTimeout(callback, 0) as unknown as number;
}

/**
 * Cancel idle callback
 */
export function cancelIdleCallback(id: number): void {
  if (typeof window === "undefined") return;

  if ("cancelIdleCallback" in window) {
    (window as any).cancelIdleCallback(id);
  } else {
    clearTimeout(id as unknown as ReturnType<typeof setTimeout>);
  }
}
