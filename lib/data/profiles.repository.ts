import {
  Profile,
  ProfileInput,
  ProfileFilters,
  ProfileStatus,
  SortOption,
  DashboardStats,
} from "@/types/profile";
import { INITIAL_PROFILES } from "./mock-profiles.data";
import { calculateAge } from "@/lib/utils";

export interface ProfilesRepository {
  list(params: {
    q?: string;
    filters?: ProfileFilters;
    sort?: SortOption;
    page: number;
    pageSize: number;
  }): Promise<{ items: Profile[]; total: number }>;
  get(id: string): Promise<Profile | null>;
  create(input: ProfileInput): Promise<Profile>;
  update(id: string, input: Partial<ProfileInput>): Promise<Profile>;
  updateStatus(id: string, status: ProfileStatus): Promise<Profile>;
  delete(id: string): Promise<void>;
  stats(): Promise<DashboardStats>;
}

const STORAGE_KEY = "vivaha_studio_profiles_v1";

// Helper for simulated network delay (300-500ms)
const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

class MockProfilesRepository implements ProfilesRepository {
  private profiles: Profile[] = [];

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window !== "undefined") {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.profiles = parsed;
            return;
          }
        }
      } catch (e) {
        console.warn("Could not read profiles from localStorage:", e);
      }
    }
    // Deep clone initial profiles
    this.profiles = JSON.parse(JSON.stringify(INITIAL_PROFILES));
  }

  private persist() {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.profiles));
      } catch (e) {
        console.warn("Could not persist profiles to localStorage:", e);
      }
    }
  }

  async list(params: {
    q?: string;
    filters?: ProfileFilters;
    sort?: SortOption;
    page: number;
    pageSize: number;
  }): Promise<{ items: Profile[]; total: number }> {
    await delay(350);

    // TODO(backend): Replace with GET /api/profiles?q=...&page=...&limit=... (Prisma findMany with where, orderBy, skip, take)
    let filtered = [...this.profiles];

    // Search query filter (searches name, phone, email, location, profession)
    if (params.q && params.q.trim()) {
      const q = params.q.trim().toLowerCase();
      filtered = filtered.filter((p) => {
        return (
          p.fullName.toLowerCase().includes(q) ||
          p.phone.includes(q) ||
          (p.email && p.email.toLowerCase().includes(q)) ||
          p.location.toLowerCase().includes(q) ||
          p.profession.toLowerCase().includes(q) ||
          p.education.toLowerCase().includes(q)
        );
      });
    }

    // Structured filters
    if (params.filters) {
      const f = params.filters;

      if (f.gender && f.gender.length > 0) {
        filtered = filtered.filter((p) => f.gender!.includes(p.gender));
      }

      if (f.ageMin !== undefined) {
        filtered = filtered.filter((p) => p.age >= f.ageMin!);
      }

      if (f.ageMax !== undefined) {
        filtered = filtered.filter((p) => p.age <= f.ageMax!);
      }

      if (f.locations && f.locations.length > 0) {
        filtered = filtered.filter((p) =>
          f.locations!.some((loc) =>
            p.location.toLowerCase().includes(loc.toLowerCase())
          )
        );
      }

      if (f.educations && f.educations.length > 0) {
        filtered = filtered.filter((p) =>
          f.educations!.some((edu) =>
            p.education.toLowerCase().includes(edu.toLowerCase())
          )
        );
      }

      if (f.professions && f.professions.length > 0) {
        filtered = filtered.filter((p) =>
          f.professions!.some((prof) =>
            p.profession.toLowerCase().includes(prof.toLowerCase())
          )
        );
      }

      if (f.maritalStatuses && f.maritalStatuses.length > 0) {
        filtered = filtered.filter((p) =>
          f.maritalStatuses!.includes(p.maritalStatus)
        );
      }

      if (f.statuses && f.statuses.length > 0) {
        filtered = filtered.filter((p) => f.statuses!.includes(p.status));
      }
    }

    // Sorting
    if (params.sort) {
      const { field, order } = params.sort;
      filtered.sort((a, b) => {
        let valA: string | number = a[field];
        let valB: string | number = b[field];

        if (field === "fullName") {
          return order === "asc"
            ? (valA as string).localeCompare(valB as string)
            : (valB as string).localeCompare(valA as string);
        } else if (field === "age") {
          return order === "asc"
            ? (valA as number) - (valB as number)
            : (valB as number) - (valA as number);
        } else if (field === "createdAt") {
          const dateA = new Date(valA as string).getTime();
          const dateB = new Date(valB as string).getTime();
          return order === "asc" ? dateA - dateB : dateB - dateA;
        }
        return 0;
      });
    } else {
      // Default sort: newest first
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    const total = filtered.length;
    const startIndex = (params.page - 1) * params.pageSize;
    const items = filtered.slice(startIndex, startIndex + params.pageSize);

    return { items, total };
  }

  async get(id: string): Promise<Profile | null> {
    await delay(300);
    // TODO(backend): Replace with GET /api/profiles/:id (Prisma findUnique)
    const profile = this.profiles.find((p) => p.id === id);
    return profile ? JSON.parse(JSON.stringify(profile)) : null;
  }

  async create(input: ProfileInput): Promise<Profile> {
    await delay(400);
    // TODO(backend): Replace with POST /api/profiles (Prisma create + S3 signed URL upload)
    const now = new Date().toISOString();
    const newProfile: Profile = {
      ...input,
      id: `prof_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      age: calculateAge(input.dateOfBirth),
      createdAt: now,
      updatedAt: now,
      status: input.status || "new",
    };
    this.profiles.unshift(newProfile);
    this.persist();
    return JSON.parse(JSON.stringify(newProfile));
  }

  async update(id: string, input: Partial<ProfileInput>): Promise<Profile> {
    await delay(350);
    // TODO(backend): Replace with PUT /api/profiles/:id (Prisma update)
    const index = this.profiles.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Profile with ID ${id} not found`);
    }

    const existing = this.profiles[index];
    const updated: Profile = {
      ...existing,
      ...input,
      age: input.dateOfBirth
        ? calculateAge(input.dateOfBirth)
        : existing.age,
      updatedAt: new Date().toISOString(),
    };

    this.profiles[index] = updated;
    this.persist();
    return JSON.parse(JSON.stringify(updated));
  }

  async updateStatus(id: string, status: ProfileStatus): Promise<Profile> {
    await delay(250);
    // TODO(backend): Replace with PATCH /api/profiles/:id/status (Prisma update)
    const index = this.profiles.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Profile with ID ${id} not found`);
    }

    this.profiles[index].status = status;
    this.profiles[index].updatedAt = new Date().toISOString();
    this.persist();
    return JSON.parse(JSON.stringify(this.profiles[index]));
  }

  async delete(id: string): Promise<void> {
    await delay(350);
    // TODO(backend): Replace with DELETE /api/profiles/:id (Prisma delete)
    this.profiles = this.profiles.filter((p) => p.id !== id);
    this.persist();
  }

  async stats(): Promise<DashboardStats> {
    await delay(300);
    // TODO(backend): Replace with GET /api/admin/stats (Prisma count & groupBy queries)
    const total = this.profiles.length;
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

    let newCount = 0;
    let active = 0;
    let inactive = 0;
    let matched = 0;
    let closed = 0;

    const statusCounts: Record<ProfileStatus, number> = {
      new: 0,
      active: 0,
      inactive: 0,
      matched: 0,
      closed: 0,
    };

    for (const p of this.profiles) {
      statusCounts[p.status] = (statusCounts[p.status] || 0) + 1;
      if (new Date(p.createdAt).getTime() >= sevenDaysAgo) {
        newCount++;
      }
      if (p.status === "active") active++;
      else if (p.status === "inactive") inactive++;
      else if (p.status === "matched") matched++;
      else if (p.status === "closed") closed++;
    }

    return {
      totalProfiles: total,
      newProfilesLast7Days: newCount,
      activeProfiles: active,
      inactiveProfiles: inactive,
      matchedProfiles: matched,
      closedProfiles: closed,
      statusCounts,
    };
  }
}

// Singleton repository instance for mock mode
export const profilesRepository: ProfilesRepository = new MockProfilesRepository();
