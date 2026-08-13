"use client";

import { useEffect, useState } from "react";

import DashboardService from "@/api/services/dashboard.service";
import {
  AdminDashboardResponse,
  SupplierDashboardResponse,
} from "@/types/dashboard";

export function useAdminDashboard() {
  const [dashboard, setDashboard] = useState<AdminDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const data = await DashboardService.getAdminDashboard();
      setDashboard(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return { dashboard, loading, error, refresh: loadDashboard };
}

export function useSupplierDashboard() {
  const [dashboard, setDashboard] = useState<SupplierDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const data = await DashboardService.getSupplierDashboard();
      setDashboard(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return { dashboard, loading, error, refresh: loadDashboard };
}
