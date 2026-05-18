import { describe, it, expect, beforeEach, vi } from "vitest";
import { fetchCloudData, upsertCloudData, mergeCloudIntoLocal } from "@/lib/cloud";
import { supabase } from "@/lib/supabase";
import { safeSave, safeLoad } from "@/lib/storage";

vi.mock("@/lib/supabase");
vi.mock("@/lib/storage");

describe("cloud operations with retry logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchCloudData", () => {
    it("fetches data successfully on first attempt", async () => {
      const mockData = {
        user_id: "123",
        completed_days: [1, 2, 3],
        notes: {},
        mcq_scores: {},
        flagged: [],
        sr_cards: {},
        streak: { count: 5, longest: 10, lastDate: "2024-01-15" },
        exam_date: "2024-06-01",
      };

      vi.mocked(supabase).from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: mockData, error: null }),
          }),
        }),
      } as any);

      const result = await fetchCloudData("123");
      expect(result).toEqual(mockData);
    });

    it("returns null when row not found (PGRST116)", async () => {
      vi.mocked(supabase).from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { code: "PGRST116", message: "Row not found" },
            }),
          }),
        }),
      } as any);

      const result = await fetchCloudData("123");
      expect(result).toBeNull();
    });

    it("retries on network errors", async () => {
      let attempts = 0;
      vi.mocked(supabase).from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockImplementation(async () => {
              attempts++;
              if (attempts === 1) {
                return {
                  data: null,
                  error: { code: "connection", message: "connection error" },
                };
              }
              return {
                data: { user_id: "123", completed_days: [1] },
                error: null,
              };
            }),
          }),
        }),
      } as any);

      const result = await fetchCloudData("123");
      expect(result).toBeTruthy();
      expect(attempts).toBeGreaterThan(1);
    });
  });

  describe("upsertCloudData", () => {
    it("upserts data successfully", async () => {
      vi.mocked(supabase).from.mockReturnValue({
        upsert: vi.fn().mockResolvedValue({ error: null }),
      } as any);

      const result = await upsertCloudData("123", { completed_days: [1, 2] });
      expect(result).toBe(true);
    });

    it("returns false on error", async () => {
      vi.mocked(supabase).from.mockReturnValue({
        upsert: vi.fn().mockResolvedValue({
          error: { message: "Auth required", code: "PGRST301" },
        }),
      } as any);

      const result = await upsertCloudData("123", { completed_days: [1, 2] });
      expect(result).toBe(false);
    });

    it("retries on retryable network errors", async () => {
      let attempts = 0;
      vi.mocked(supabase).from.mockReturnValue({
        upsert: vi.fn().mockImplementation(async () => {
          attempts++;
          if (attempts === 1) {
            return {
              error: { code: "connection", message: "connection error" },
            };
          }
          return { error: null };
        }),
      } as any);

      const result = await upsertCloudData("123", { completed_days: [1, 2] });
      expect(result).toBe(true);
      expect(attempts).toBeGreaterThan(1);
    });

    it("includes updated_at timestamp", async () => {
      const upsertMock = vi.fn().mockResolvedValue({ error: null });
      vi.mocked(supabase).from.mockReturnValue({
        upsert: upsertMock,
      } as any);

      await upsertCloudData("123", { completed_days: [1, 2] });

      const call = upsertMock.mock.calls[0]?.[0];
      expect(call).toHaveProperty("updated_at");
      expect(call?.user_id).toBe("123");
      expect(call?.completed_days).toEqual([1, 2]);
    });
  });

  describe("mergeCloudIntoLocal", () => {
    it("merges completed_days from cloud", () => {
      const saveMock = vi.mocked(safeSave);
      const loadMock = vi.mocked(safeLoad);
      loadMock.mockReturnValue({ count: 0, longest: 0, lastDate: "" });

      const cloudData = {
        completed_days: [1, 2, 3],
        notes: {},
        mcq_scores: {},
        flagged: [],
        sr_cards: {},
        streak: { count: 0, longest: 0, lastDate: "" },
        exam_date: null,
      };

      mergeCloudIntoLocal(cloudData);

      expect(saveMock).toHaveBeenCalledWith("neetpg_completed_days", [1, 2, 3]);
    });

    it("takes longer streak when merging", () => {
      const saveMock = vi.mocked(safeSave);
      const loadMock = vi.mocked(safeLoad);
      loadMock.mockReturnValue({ count: 3, longest: 5, lastDate: "2024-01-10" });

      const cloudData = {
        completed_days: [],
        notes: {},
        mcq_scores: {},
        flagged: [],
        sr_cards: {},
        streak: { count: 10, longest: 20, lastDate: "2024-01-15" },
        exam_date: null,
      };

      mergeCloudIntoLocal(cloudData);

      const streakSaveCall = saveMock.mock.calls.find(
        call => call[0] === "neetpg_streak"
      );
      const savedStreak = streakSaveCall?.[1] as { count: number; longest: number; lastDate: string } | undefined;

      expect(savedStreak?.count).toBe(10); // max(3, 10)
      expect(savedStreak?.longest).toBe(20); // max(5, 20)
    });

    it("takes more recent lastDate when merging streaks", () => {
      const saveMock = vi.mocked(safeSave);
      const loadMock = vi.mocked(safeLoad);
      loadMock.mockReturnValue({ count: 5, longest: 5, lastDate: "2024-01-15" });

      const cloudData = {
        completed_days: [],
        notes: {},
        mcq_scores: {},
        flagged: [],
        sr_cards: {},
        streak: { count: 5, longest: 10, lastDate: "2024-01-10" },
        exam_date: null,
      };

      mergeCloudIntoLocal(cloudData);

      const streakSaveCall = saveMock.mock.calls.find(
        call => call[0] === "neetpg_streak"
      );
      const savedStreak = streakSaveCall?.[1] as { count: number; longest: number; lastDate: string } | undefined;

      expect(savedStreak?.lastDate).toBe("2024-01-15"); // more recent local date
    });
  });
});
