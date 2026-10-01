"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Profile,
  ProfileInput,
  ProfileFilters,
  ProfileStatus,
  SortOption,
  DashboardStats,
} from "@/types/profile";
import { profilesRepository } from "./profiles.repository";

export function useProfiles(params: {
  q?: string;
  filters?: ProfileFilters;
  sort?: SortOption;
  page?: number;
  pageSize?: number;
}) {
  const [items, setItems] = useState<Profile[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await profilesRepository.list({
        q: params.q,
        filters: params.filters,
        sort: params.sort,
        page: params.page ?? 1,
        pageSize: params.pageSize ?? 20,
      });
      setItems(res.items);
      setTotal(res.total);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load profiles"
      );
    } finally {
      setLoading(false);
    }
  }, [
    params.q,
    JSON.stringify(params.filters),
    JSON.stringify(params.sort),
    params.page,
    params.pageSize,
  ]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return { items, total, loading, error, refetch: fetchProfiles };
}

export function useProfile(id: string | null) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!id) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await profilesRepository.get(id);
      setProfile(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile };
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await profilesRepository.stats();
      setStats(res);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load dashboard metrics"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}

export function useProfileMutations() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createProfile = async (input: ProfileInput) => {
    setIsSubmitting(true);
    try {
      return await profilesRepository.create(input);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateProfile = async (id: string, input: Partial<ProfileInput>) => {
    setIsSubmitting(true);
    try {
      return await profilesRepository.update(id, input);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateStatus = async (id: string, status: ProfileStatus) => {
    setIsSubmitting(true);
    try {
      return await profilesRepository.updateStatus(id, status);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProfile = async (id: string) => {
    setIsSubmitting(true);
    try {
      await profilesRepository.delete(id);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    createProfile,
    updateProfile,
    updateStatus,
    deleteProfile,
    isSubmitting,
  };
}
