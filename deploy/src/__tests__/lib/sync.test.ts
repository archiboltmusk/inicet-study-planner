import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getRetryDelay,
  isRetryableError,
  executeWithRetry,
  formatLastSynced,
  getSyncErrorMessage,
  type SyncError,
} from "@/lib/sync";

describe("sync utilities", () => {
  describe("getRetryDelay", () => {
    it("calculates exponential backoff correctly", () => {
      expect(getRetryDelay(0)).toBe(1000); // 1s
      expect(getRetryDelay(1)).toBe(2000); // 2s
      expect(getRetryDelay(2)).toBe(4000); // 4s
    });
  });

  describe("isRetryableError", () => {
    it("returns true for network errors", () => {
      const error = new Error("Network failed") as SyncError;
      error.isNetworkError = true;
      expect(isRetryableError(error)).toBe(true);
    });

    it("returns true for retryable HTTP status codes", () => {
      const codes = [408, 429, 500, 502, 503, 504];
      codes.forEach(code => {
        const error = new Error("HTTP error") as SyncError;
        error.status = code;
        expect(isRetryableError(error)).toBe(true);
      });
    });

    it("returns false for non-retryable status codes", () => {
      const error = new Error("Not Found") as SyncError;
      error.status = 404;
      expect(isRetryableError(error)).toBe(false);
    });

    it("returns false for non-Error objects", () => {
      expect(isRetryableError("not an error")).toBe(false);
      expect(isRetryableError(null)).toBe(false);
    });
  });

  describe("executeWithRetry", () => {
    it("succeeds on first attempt", async () => {
      const fn = vi.fn().mockResolvedValue("success");
      const result = await executeWithRetry(fn);
      expect(result).toBe("success");
      expect(fn).toHaveBeenCalledOnce();
    });

    it("retries on retryable error and succeeds", async () => {
      let attempts = 0;
      const fn = vi.fn(async () => {
        attempts++;
        if (attempts === 1) {
          const error = new Error("Network error") as SyncError;
          error.isNetworkError = true;
          throw error;
        }
        return "success";
      });

      const onRetry = vi.fn();
      const result = await executeWithRetry(fn, { onRetry });

      expect(result).toBe("success");
      expect(fn).toHaveBeenCalledTimes(2);
      expect(onRetry).toHaveBeenCalledOnce();
    });

    it("stops retrying after max retries", async () => {
      const error = new Error("Network error") as SyncError;
      error.isNetworkError = true;
      const fn = vi.fn().mockRejectedValue(error);

      await expect(
        executeWithRetry(fn, { maxRetries: 2 })
      ).rejects.toThrow("Network error");

      expect(fn).toHaveBeenCalledTimes(3); // initial + 2 retries
    });

    it("does not retry non-retryable errors", async () => {
      const error = new Error("Auth failed");
      const fn = vi.fn().mockRejectedValue(error);

      await expect(executeWithRetry(fn)).rejects.toThrow("Auth failed");
      expect(fn).toHaveBeenCalledOnce();
    });

    it("calls onError on final failure", async () => {
      const error = new Error("Final error") as SyncError;
      error.isNetworkError = true;
      const fn = vi.fn().mockRejectedValue(error);
      const onError = vi.fn();

      await expect(
        executeWithRetry(fn, { maxRetries: 1, onError })
      ).rejects.toThrow();

      expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: "Final error" }));
    });

    it("converts non-Error throws to Error objects", async () => {
      const fn = vi.fn().mockRejectedValue("string error");
      const onError = vi.fn();

      await expect(
        executeWithRetry(fn, { onError })
      ).rejects.toThrow();

      expect(onError).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("formatLastSynced", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2024-01-15 12:00:00"));
    });

    it("returns 'Never' for null date", () => {
      expect(formatLastSynced(null)).toBe("Never");
    });

    it("returns 'Just now' for recent syncs", () => {
      const date = new Date("2024-01-15 11:59:50");
      expect(formatLastSynced(date)).toBe("Just now");
    });

    it("formats minutes correctly", () => {
      const date = new Date("2024-01-15 11:55:00");
      expect(formatLastSynced(date)).toBe("5m ago");
    });

    it("formats hours correctly", () => {
      const date = new Date("2024-01-15 09:00:00");
      expect(formatLastSynced(date)).toBe("3h ago");
    });

    it("formats days correctly", () => {
      const date = new Date("2024-01-13 12:00:00");
      expect(formatLastSynced(date)).toBe("2d ago");
    });
  });

  describe("getSyncErrorMessage", () => {
    it("returns network error message", () => {
      const error = new Error("Network failed") as SyncError;
      error.isNetworkError = true;
      const msg = getSyncErrorMessage(error);
      expect(msg).toContain("Network connection issue");
    });

    it("returns auth error message for PGRST301", () => {
      const error = new Error("Auth required") as SyncError;
      error.code = "PGRST301";
      const msg = getSyncErrorMessage(error);
      expect(msg).toContain("sign in");
    });

    it("returns fetch error message", () => {
      const error = new Error("Failed to fetch data");
      const msg = getSyncErrorMessage(error);
      expect(msg).toContain("Connection failed");
    });

    it("returns error message if available", () => {
      const error = new Error("Custom error message");
      const msg = getSyncErrorMessage(error);
      expect(msg).toBe("Custom error message");
    });

    it("returns generic message for unknown errors", () => {
      const msg = getSyncErrorMessage("not an error");
      expect(msg).toBe("Sync failed. Please try again.");
    });
  });
});
