import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
  disabled?: boolean;
};

export type DashboardWidget = {
  id: string;
  title: string;
  description: string;
  type: 'chart' | 'stat' | 'table';
};

export type RecentActivity = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  target: string;
  timestamp: string;
};

export type ApiKey = {
  id: string;
  name: string;
  key_preview: string;
  created_at: string;
  expires_at: string;
  status: 'active' | 'expired' | 'revoked';
};

export type ApiEndpoint = {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  parameters: { name: string; type: string; description: string }[];
};

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Analyst' | 'Viewer' | 'Manager';
  avatar: string;
};

export type ScheduledTask = {
  id: string;
  name: string;
  cron_expression: string;
  query_name: string;
  last_run: string;
  next_run: string;
  status: 'active' | 'paused' | 'error';
};
