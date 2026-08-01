"use client";

import { useEffect, useState } from "react";

import DashboardService from "@/api/services/dashboard.service";
import { DashboardResponse } from "@/types/dashboard";

export function useDashboard() {
  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const data =
        await DashboardService.getDashboard();

      setDashboard(data);

      setError(null);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    dashboard,
    loading,
    error,
    refresh: loadDashboard,
  };
}