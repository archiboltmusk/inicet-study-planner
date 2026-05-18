# Best Practices Guide

## Authentication & Authorization

### ✅ DO
- Check `user` before accessing protected features
- Use `useAuth()` hook for authentication state
- Handle loading state with loading spinner
- Display helpful error messages to users
- Log auth errors for debugging

### ❌ DON'T
- Assume user is authenticated without checking
- Store tokens in localStorage (use secure cookies)
- Skip error handling in auth flows
- Show technical error details to users
- Retry failed auth indefinitely

```typescript
// ✅ Good
const { user, loading, error } = useAuth();
if (loading) return <Spinner />;
if (!user) return <LoginPrompt />;
return <Dashboard user={user} />;

// ❌ Bad
const user = JSON.parse(localStorage.getItem("user"));
return <Dashboard user={user} />;
```

## Data Synchronization

### ✅ DO
- Use `useCloudSync` for auto-debounced writes
- Provide `onError` callback to handle failures
- Trust offline queue for reliability
- Let retry logic handle transient failures
- Use `formatLastSynced()` for display

### ❌ DON'T
- Make synchronous cloud calls in state updates
- Ignore sync errors silently
- Retry failed syncs with manual loops
- Skip offline data queuing
- Show raw sync errors to users

```typescript
// ✅ Good
useCloudSync("notes", notes, ready, {
  onError: (err) => trackError(err, { type: "notes_sync" })
});

// ❌ Bad
const handleSave = () => {
  upsertCloudData(userId, { notes }).catch(console.error);
};
```

## Error Handling

### ✅ DO
- Classify errors as network vs. auth vs. client
- Use `getSyncErrorMessage()` for user-friendly text
- Log errors with context for debugging
- Provide retry mechanisms for transient failures
- Show actionable error messages

### ❌ DON'T
- Ignore errors silently
- Show technical error messages to users
- Retry auth/permission errors indefinitely
- Log PII in error messages
- Use catch-all error handlers without context

```typescript
// ✅ Good
try {
  await executeWithRetry(fn, {
    onError: (err) => {
      trackError(err, { context: "sync" });
      toast.error(getSyncErrorMessage(err));
    }
  });
} catch (err) {
  // Already handled above
}

// ❌ Bad
try {
  await fetch(url);
} catch (err) {
  console.error("Something went wrong");
}
```

## Performance Optimization

### ✅ DO
- Lazy load images with `createImageLazyLoader()`
- Use resource hints for known resources
- Measure critical functions with `measureExecutionTime()`
- Monitor long tasks to identify bottlenecks
- Respect `prefers-reduced-motion` setting

### ❌ DON'T
- Load all images upfront
- Ignore performance metrics
- Skip optimization for "fast enough"
- Animate continuously without respecting preferences
- Load resources without hints

```typescript
// ✅ Good
const loader = createImageLazyLoader();
images.forEach(img => loader.observe(img));

// ❌ Bad
images.forEach(img => {
  img.src = img.dataset.src;  // Loads immediately
});
```

## Offline Support

### ✅ DO
- Always save to localStorage first
- Use `createOfflineDetector()` for network awareness
- Trust the offline queue for reliability
- Auto-sync when reconnecting
- Respect save-data preferences

### ❌ DON'T
- Wait for cloud sync before UI feedback
- Discard failed writes without queuing
- Assume always-online
- Make unnecessary requests
- Ignore connection quality

```typescript
// ✅ Good
safeSave("key", value);                    // Immediate feedback
await upsertCloudData(id, patch);         // Background sync
if (!ok) enqueue(userId, "key", value);   // Queue on failure

// ❌ Bad
const ok = await upsertCloudData(id, patch);
if (ok) safeSave("key", value);           // Wait for network
```

## Accessibility

### ✅ DO
- Support keyboard-only navigation
- Use ARIA helpers for dynamic content
- Announce important state changes
- Respect `prefers-reduced-motion`
- Test with screen readers

### ❌ DON'T
- Rely on mouse/touch only
- Use confusing color-only indicators
- Auto-play animations
- Skip alt text on images
- Ignore keyboard shortcuts

```typescript
// ✅ Good
const focusTrap = createFocusTrap(modalElement);
focusTrap.activate();  // Lock focus to modal

announceToScreenReader("Saved successfully");

if (!prefersReducedMotion()) {
  animate(element);     // Respect preference
}

// ❌ Bad
onClick={() => {}}     // No keyboard support
style={{ animation: "spin 2s infinite" }}  // Always animates
```

## State Management

### ✅ DO
- Use Zustand for global state
- Keep state minimal and derived
- Use `zustand/subscriptions` for listeners
- Persist important state to localStorage
- Clear state on logout

### ❌ DON'T
- Over-normalize state
- Store derived values (compute them instead)
- Make entire object reactive if only one field changes
- Mix global and local state confusingly
- Forget to reset state on logout

```typescript
// ✅ Good
const store = create((set) => ({
  completedDays: [],
  markDayComplete: (day) => set(state => ({
    completedDays: [...state.completedDays, day]
  }))
}));

// ❌ Bad
const store = create((set) => ({
  days: [
    { id: 1, completed: false, completedAt: null, ... },
    // Over-normalized
  ]
}));
```

## Type Safety

### ✅ DO
- Enable TypeScript strict mode
- Type function parameters and returns
- Use discriminated unions for state
- Export types from modules
- Avoid `any` casts (use generics)

### ❌ DON'T
- Use `any` type
- Skip type annotations
- Mix typed and untyped code
- Use overly broad types
- Cast without understanding

```typescript
// ✅ Good
export function processData(data: UserData): Promise<Result> {
  // Type-safe throughout
}

// ❌ Bad
export function processData(data: any): any {
  return data.something;
}
```

## Testing

### ✅ DO
- Test happy paths and error cases
- Mock external dependencies
- Use fake timers for determinism
- Test accessibility features
- Write focused, single-responsibility tests

### ❌ DON'T
- Test implementation details
- Skip error cases
- Use real network calls in tests
- Make tests interdependent
- Over-test trivial code

```typescript
// ✅ Good
test("retries on network error", async () => {
  const fn = vi.fn()
    .mockRejectedValueOnce(networkError)
    .mockResolvedValueOnce("ok");
  
  const result = await executeWithRetry(fn);
  expect(fn).toHaveBeenCalledTimes(2);
  expect(result).toBe("ok");
});

// ❌ Bad
test("works", async () => {
  const result = await executeWithRetry(() => fetch(REAL_URL));
  expect(result).toBeTruthy();
});
```

## Monitoring & Analytics

### ✅ DO
- Track important user events
- Log errors with context
- Monitor performance metrics
- Export analytics periodically
- Respect user privacy

### ❌ DON'T
- Track every single action
- Send analytics immediately
- Log sensitive data
- Use analytics for user tracking
- Transmit data without consent

```typescript
// ✅ Good
trackFeatureUsage("export_data", { format: "csv" });
trackError(error, { context: "sync" });
const report = exportAnalytics();  // Manual export

// ❌ Bad
trackEvent("user_clicked_button");  // Too granular
trackEvent("login", { password: userPassword });  // PII
```

## Code Quality

### ✅ DO
- Write clear, descriptive names
- Keep functions focused and small
- DRY (Don't Repeat Yourself)
- Document complex logic
- Use consistent formatting

### ❌ DON'T
- Use cryptic variable names
- Write god functions
- Duplicate logic across files
- Leave dead code
- Mix styles inconsistently

```typescript
// ✅ Good
function isNetworkReliable(connection: Connection): boolean {
  return connection.downlink > 1 && connection.rtt < 100;
}

// ❌ Bad
function check(c: any): boolean {
  return c.d > 1 && c.r < 100;  // What do d and r mean?
}
```

## Documentation

### ✅ DO
- Document public APIs
- Include usage examples
- Explain edge cases
- Keep docs in sync with code
- Link related documentation

### ❌ DON'T
- Write doc-only APIs
- Leave undocumented edge cases
- Create stale documentation
- Overexplain simple code
- Isolate documentation from examples

```typescript
// ✅ Good
/**
 * Execute a function with automatic retry on failure.
 * 
 * @param fn - The async function to execute
 * @param options - Configuration options
 * @returns The result of the function
 * 
 * @example
 * const result = await executeWithRetry(
 *   () => fetch(url),
 *   { maxRetries: 3 }
 * );
 */
export function executeWithRetry<T>(
  fn: () => Promise<T>,
  options?: ExecOptions
): Promise<T>

// ❌ Bad
export function executeWithRetry(fn, options) {
  // No documentation
}
```

## Browser Compatibility

### ✅ DO
- Provide polyfills for missing APIs
- Test in multiple browsers
- Use feature detection
- Gracefully degrade unsupported features
- Support older browsers

### ❌ DON'T
- Assume modern browser features
- Break in older browsers
- Skip feature detection
- Force users to upgrade
- Remove polyfills without checking

```typescript
// ✅ Good
export function runWhenIdle(callback: () => void): number {
  if ("requestIdleCallback" in window) {
    return window.requestIdleCallback(callback);
  }
  return setTimeout(callback, 0);  // Polyfill
}

// ❌ Bad
export function runWhenIdle(callback: () => void): number {
  return window.requestIdleCallback(callback);  // Crashes in older browsers
}
```

## Security

### ✅ DO
- Validate input on server
- Use HTTPS for all communications
- Protect sensitive endpoints with auth
- Sanitize user output
- Use Content Security Policy

### ❌ DON'T
- Trust client-side validation alone
- Store secrets in code/localStorage
- Send unencrypted data
- Inject user input into HTML/SQL
- Skip CORS configuration

```typescript
// ✅ Good
const authorized = await checkAuth(userId);
if (!authorized) throw new Error("Unauthorized");
return userData;

// ❌ Bad
if (localStorage.getItem("isAdmin")) {
  return sensitiveData;
}
```

## Continuous Improvement

- Monitor performance metrics regularly
- Review error logs for patterns
- Get user feedback on UX
- Keep dependencies updated
- Refactor as code evolves
- Document learning and decisions
