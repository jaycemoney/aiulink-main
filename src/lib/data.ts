import type { ApiEndpoint, ApiKey, NavItem, RecentActivity, ScheduledTask, TeamMember } from "@/lib/types";
import {
  Home,
  DatabaseZap,
  LayoutDashboard,
  KeyRound,
  Timer,
  Users,
  Settings,
  Briefcase, 
  GitCompareArrows, 
  AreaChart, 
  Telescope, 
  Bot,
  Fuel,
  Factory
} from "lucide-react";



export const navItems: NavItem[] = [
  {
    title: "AIU Link",
    href: "/",
    icon: Bot,
  },
  {
    title: "Dashboards",
    href: "/dashboards",
    icon: LayoutDashboard,
  },
  {
    title: "API Management",
    href: "/api",
    icon: KeyRound,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export const recentActivities: RecentActivity[] = [
    {
        id: "1",
        user: { name: "Alex", avatar: "https://i.pravatar.cc/32?u=alex" },
        action: "ran query",
        target: "Weekly Sales Report",
        timestamp: "2 minutes ago",
    },
    {
        id: "2",
        user: { name: "Brian", avatar: "https://i.pravatar.cc/32?u=brian" },
        action: "updated",
        target: "Marketing KPI Dashboard",
        timestamp: "15 minutes ago",
    },
    {
        id: "3",
        user: { name: "Casey", avatar: "https://i.pravatar.cc/32?u=casey" },
        action: "shared",
        target: "Q3 Financials",
        timestamp: "1 hour ago",
    },
    {
        id: "4",
        user: { name: "Alex", avatar: "https://i.pravatar.cc/32?u=alex" },
        action: "created API key",
        target: "Campaign-Tracker-Key",
        timestamp: "3 hours ago",
    },
    {
        id: "5",
        user: { name: "Dana", avatar: "https://i.pravatar.cc/32?u=dana" },
        action: "scheduled",
        target: "Daily User Sync",
        timestamp: "yesterday",
    },
];

export const queryHistory: string[] = [
  "SELECT * FROM users WHERE signup_date > '2023-10-01'",
  "SELECT product_name, COUNT(*) as order_count FROM orders GROUP BY product_name ORDER BY order_count DESC LIMIT 10",
  "SELECT AVG(order_total) as aov FROM orders WHERE country = 'USA'",
  "SELECT * FROM customers WHERE last_seen < NOW() - INTERVAL '30 days'",
  "SELECT status, count(*) FROM support_tickets GROUP BY status",
];

export const apiKeys: ApiKey[] = [
  { id: '1', name: 'Marketing Campaign Tracker', key_preview: 'sk_..._a1b2', created_at: '2023-10-25', expires_at: '2024-10-25', status: 'active' },
  { id: '2', name: 'Product Analytics Pipeline', key_preview: 'pk_..._c3d4', created_at: '2023-09-01', expires_at: 'N/A', status: 'active' },
  { id: '3', name: 'Old Reporting Key', key_preview: 'sk_..._e5f6', created_at: '2022-05-10', expires_at: '2023-05-10', status: 'expired' },
  { id: '4', name: 'Test Key (Revoked)', key_preview: 'tk_..._g7h8', created_at: '2023-11-01', expires_at: '2023-11-02', status: 'revoked' },
];

export const apiEndpoints: ApiEndpoint[] = [
    {
        id: 'customers',
        method: 'GET',
        path: '/v1/customers',
        description: 'Retrieve a list of customers with optional filtering.',
        parameters: [
            { name: 'limit', type: 'integer', description: 'Number of customers to return.' },
            { name: 'signup_after', type: 'date', description: 'Filter customers who signed up after this date.' }
        ]
    },
    {
        id: 'orders',
        method: 'GET',
        path: '/v1/orders/{id}',
        description: 'Get details for a specific order by its ID.',
        parameters: [
            { name: 'id', type: 'string', description: 'The unique identifier for the order.' }
        ]
    },
    {
        id: 'products',
        method: 'POST',
        path: '/v1/products',
        description: 'Create a new product in the catalog.',
        parameters: [
            { name: 'name', type: 'string', description: 'The name of the product.' },
            { name: 'price', type: 'float', description: 'The price of the product.' },
            { name: 'sku', type: 'string', description: 'The stock keeping unit.' }
        ]
    }
];

export const teamMembers: TeamMember[] = [
    { id: '1', name: 'Alex Parker', email: 'alex@datalens.io', role: 'Admin', avatar: 'https://i.pravatar.cc/40?u=alex' },
    { id: '2', name: 'Brian Miller', email: 'brian@datalens.io', role: 'Manager', avatar: 'https://i.pravatar.cc/40?u=brian' },
    { id: '3', name: 'Casey Flores', email: 'casey@datalens.io', role: 'Analyst', avatar: 'https://i.pravatar.cc/40?u=casey' },
    { id: '4', name: 'Dana Ross', email: 'dana@datalens.io', role: 'Analyst', avatar: 'https://i.pravatar.cc/40?u=dana' },
    { id: '5', name: 'Evan Reed', email: 'evan@datalens.io', role: 'Viewer', avatar: 'https://i.pravatar.cc/40?u=evan' },
];

export const scheduledTasks: ScheduledTask[] = [
    { id: '1', name: 'Daily Sales Report', cron_expression: '0 9 * * *', query_name: 'daily_sales', last_run: '2023-11-15 09:00:00', next_run: '2023-11-16 09:00:00', status: 'active' },
    { id: '2', name: 'Hourly Health Check', cron_expression: '0 * * * *', query_name: 'db_health', last_run: '2023-11-15 14:00:00', next_run: '2023-11-15 15:00:00', status: 'active' },
    { id: '3', name: 'Weekly User Sync', cron_expression: '0 0 * * 1', query_name: 'user_sync', last_run: '2023-11-13 00:00:00', next_run: '2023-11-20 00:00:00', status: 'paused' },
    { id: '4', name: 'Failed Job Example', cron_expression: '*/30 * * * *', query_name: 'inventory_check', last_run: '2023-11-15 13:30:00', next_run: '2023-11-15 14:00:00', status: 'error' },
];

export const tableSchemas = {
  'customers': ['customer_id', 'first_name', 'last_name', 'email', 'signup_date', 'country', 'last_seen'],
  'orders': ['order_id', 'customer_id', 'order_date', 'order_total', 'status'],
  'products': ['product_id', 'product_name', 'category', 'price', 'stock_quantity'],
  'marketing_campaigns': ['campaign_id', 'campaign_name', 'start_date', 'end_date', 'budget', 'roi']
};
