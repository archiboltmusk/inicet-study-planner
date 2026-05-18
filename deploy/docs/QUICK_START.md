# Quick Start Guide

## Getting Started with INICET Study Planner Infrastructure

This guide will help you integrate and use the core features built across all 7 phases.

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create `.env.local`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Run Tests
```bash
npm test
# or with coverage
npm test -- --coverage
```

## Basic Usage

### Phase 1: Authentication

```typescript
import { useAuth } from "@/lib/auth";
import { HeaderAuth } from "@/components/HeaderAuth";

export function App() {
  const { user, loading, error } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.email}</h1>
          <HeaderAuth /> {/* Sign out button */}
        </>
      ) : (
        <HeaderAuth /> {/* Sign in form */}
      )}
    </div>
  );
}
```

### Phase 2: Data Synchronization

```typescript
import { useCloudSync } from "@/lib/cloud";
import { SyncStatus } from "@/components/SyncStatus";

export function NotesEditor({ userId }) {
  const [notes, setNotes] = useState("");

  // Auto-sync notes every 1.5s when changed
  useCloudSync("notes", notes, !!userId);

  return (
    <div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Your notes..."
      />
      <SyncStatus /> {/* Shows sync state */}
    </div>
  );
}
```

### Phase 3: Testing Your Code

```typescript
import { describe, it, expect, beforeEach } from "vitest";
import { executeWithRetry } from "@/lib/sync";

describe("my feature", () => {
  it("retries on network error", async () => {
    let attempts = 0;
    const fn = () => {
      attempts++;
      if (attempts === 1) {
        const err = new Error("Network");
        (err as any).isNetworkError = true;
        throw err;
      }
      return "success";
    };

    const result = await executeWithRetry(fn);
    expect(result).toBe("success");
    expect(attempts).toBe(2);
  });
});
```

### Phase 4: Monitoring Performance

```typescript
import { generatePerformanceReport } from "@/lib/performance";

// In your app initialization
useEffect(() => {
  const timer = setInterval(() => {
    const report = generatePerformanceReport();
    console.log("Performance Report:", report);

    // Send to monitoring service
    if (!isPerformanceAcceptable()) {
      logAlert("Performance degraded", report.summary);
    }
  }, 30000); // Every 30 seconds

  return () => clearInterval(timer);
}, []);
```

### Phase 5: Keyboard Navigation

```typescript
import { matchesKeyboardShortcut, createFocusTrap } from "@/lib/a11y";

export function Modal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    // Trap focus in modal
    const trap = createFocusTrap(modalRef.current);
    trap.activate();

    // Close on Escape
    const handleKeydown = (e: KeyboardEvent) => {
      if (matchesKeyboardShortcut(e, "ESCAPE")) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      trap.deactivate();
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={modalRef} role="dialog">
      {/* Modal content */}
    </div>
  );
}
```

### Phase 6: Offline Support

```typescript
import { createOfflineDetector } from "@/lib/offline";
import { CacheManager } from "@/lib/cacheManager";

const cache = new CacheManager({
  name: "app-cache",
  version: 1,
  maxAge: 3600000, // 1 hour
});

const detector = createOfflineDetector((status) => {
  if (status.mode === "offline") {
    console.log("You are offline");
  } else if (status.mode === "slow-connection") {
    console.log("Slow connection detected");
  }
});

// Fetch with fallback to cache
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      await cache.set(url, response.clone());
      return response;
    }
  } catch {
    // Try cache on failure
    const cached = await cache.get(url);
    if (cached) return cached;
    throw new Error("No data available");
  }
}
```

### Phase 7: Performance Optimization

```typescript
import { createImageLazyLoader, preloadResource } from "@/lib/lazyLoad";

// Lazy load images
const imgLoader = createImageLazyLoader();

useEffect(() => {
  const images = document.querySelectorAll("img[data-src]");
  images.forEach(img => {
    imgLoader.observe(img as HTMLImageElement);
  });

  return () => imgLoader.disconnect();
}, []);

// Preload critical resources
useEffect(() => {
  preloadResource("critical-font.woff2", "font");
  preloadResource("hero-image.jpg", "image");
}, []);

// Measure critical operations
const { result, duration } = await measureExecutionTime(
  async () => await processData(largeDataset),
  "process-data"
);
console.log(`Processed in ${duration}ms`);
```

## Common Workflows

### Workflow 1: User Submits Form Data

```typescript
import { useAuth } from "@/lib/auth";
import { useCloudSync } from "@/lib/cloud";
import { trackEvent } from "@/lib/analytics";

export function DataForm() {
  const { user } = useAuth();
  const [data, setData] = useState({});

  useCloudSync("formData", data, !!user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    trackFeatureUsage("form_submit", { fields: Object.keys(data).length });

    setData(newData);
    // useCloudSync automatically syncs
  };

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
}
```

### Workflow 2: Offline Data Entry

```typescript
import { safeSave, safeLoad } from "@/lib/storage";
import { createOfflineDetector } from "@/lib/offline";

export function OfflineForm() {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    const detector = createOfflineDetector((status) => {
      if (status.isOnline && saved.length > 0) {
        // Sync all saved items when back online
        syncAllData();
      }
    });

    return () => detector.destroy();
  }, [saved]);

  const handleSave = (key: string, value: unknown) => {
    safeSave(key, value);
    setSaved(prev => [...prev, key]);
  };

  return <div>{/* form with handleSave */}</div>;
}
```

### Workflow 3: Monitor App Performance

```typescript
import { initializeWebVitals, getPerformanceRecommendations } from "@/lib/monitoring";
import { collectPerformanceMetrics } from "@/lib/performance";

useEffect(() => {
  // Initialize Web Vitals tracking
  initializeWebVitals();

  // Get recommendations after app loads
  const timer = setTimeout(() => {
    const metrics = collectPerformanceMetrics();
    const recs = getPerformanceRecommendations();

    if (recs.length > 1) {
      console.warn("Performance recommendations:", recs);
    }
  }, 5000);

  return () => clearTimeout(timer);
}, []);
```

### Workflow 4: Handle Network Issues Gracefully

```typescript
import { useSync } from "@/lib/useSync";
import { getSyncErrorMessage } from "@/lib/sync";
import { trackError } from "@/lib/analytics";

export function DataSync({ data }) {
  const { status, error, sync, lastSyncedText } = useSync(
    () => uploadData(data),
    {
      onSuccess: () => {
        console.log("Data synced successfully");
      },
      onError: (err) => {
        trackError(err, { context: "data_upload" });
        showToast(getSyncErrorMessage(err), "error");
      },
    }
  );

  return (
    <div>
      {status === "syncing" && <Spinner />}
      {error && <ErrorAlert message={error} onRetry={sync} />}
      {!error && <Text>{lastSyncedText}</Text>}
    </div>
  );
}
```

## Best Practices Checklist

When building features, follow this checklist:

- [ ] **Auth**: Check user before accessing protected data
- [ ] **Sync**: Use `useCloudSync` for auto-debounced writes
- [ ] **Errors**: Handle errors with `getSyncErrorMessage()`
- [ ] **Offline**: Save locally first, sync to cloud second
- [ ] **Performance**: Lazy load images, measure critical paths
- [ ] **A11y**: Support keyboard navigation, test with screen reader
- [ ] **Testing**: Write tests for happy path and error cases
- [ ] **Analytics**: Track important user actions, log errors
- [ ] **Types**: Use TypeScript for type safety
- [ ] **Docs**: Document non-obvious behavior

## Troubleshooting

### User is not staying logged in after refresh
**Solution**: Check that `useAuth()` is properly initialized. Ensure Supabase session is being stored in secure cookies.

### Sync is not working
**Solution**: 
1. Check network is online: `navigator.onLine`
2. Verify Supabase credentials in `.env.local`
3. Check browser console for errors
4. Ensure `useCloudSync` has `ready={!!user}`

### Tests are timing out
**Solution**: Use fake timers for async operations:
```typescript
beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());
```

### Images not loading
**Solution**: Ensure images have `data-src` attribute, not `src`:
```html
<img data-src="image.jpg" alt="..." />
```

### TypeScript errors
**Solution**: Ensure `tsconfig.json` has `strict: true`. Check for `any` types and add proper type definitions.

## Next Steps

1. **Read the full documentation**:
   - [Architecture Overview](./ARCHITECTURE.md)
   - [API Reference](./API_REFERENCE.md)
   - [Best Practices](./BEST_PRACTICES.md)

2. **Explore the codebase**:
   - `src/lib/` - All utility libraries
   - `src/components/` - React components
   - `src/__tests__/` - Test examples

3. **Run examples**:
   - Start dev server: `npm run dev`
   - Run tests: `npm test`
   - Check performance: Open DevTools Performance tab

4. **Build features**:
   - Use the utilities from `src/lib/`
   - Follow the patterns in documentation
   - Reference existing components
   - Write tests for new code

## Getting Help

- Check the [API Reference](./API_REFERENCE.md) for function signatures
- Review [Best Practices](./BEST_PRACTICES.md) for patterns
- Look at test files for usage examples
- Check error messages in browser console
- Enable verbose logging: `localStorage.debug = "*"`

## Resources

- **Supabase Docs**: https://supabase.com/docs
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **TypeScript Docs**: https://www.typescriptlang.org/docs
- **Web APIs**: https://developer.mozilla.org/en-US/docs/Web/API

Good luck! 🚀
