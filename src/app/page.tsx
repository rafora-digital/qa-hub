
"use client";

import { useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Code2,
  Command,
  FileBarChart,
  FileText,
  Filter,
  Gauge,
  GitBranch,
  LayoutDashboard,
  Menu,
  Moon,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sun,
  Users,
  X,
  Zap,
  Bug,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const navGroups = [
  {
    label: "WORKSPACE",
    items: [
      { label: "Overview", icon: LayoutDashboard },
      { label: "Projects", icon: Command },
      { label: "Environments & Builds", icon: GitBranch },
    ],
  },
  {
    label: "TEST MANAGEMENT",
    items: [
      { label: "Requirements", icon: FileText },
      { label: "Test Plans & Suites", icon: ClipboardCheck },
      { label: "Test Cases", icon: CheckCircle2 },
      { label: "Test Execution", icon: Activity },
      { label: "Regression Testing", icon: ShieldCheck },
    ],
  },
  {
    label: "QUALITY & AUTOMATION",
    items: [
      { label: "Defect Tracker", icon: Bug },
      { label: "API Testing", icon: Code2 },
      { label: "Automation Runs", icon: Zap },
      { label: "Performance Testing", icon: Gauge },
      { label: "Release Readiness", icon: ShieldCheck },
    ],
  },
  {
    label: "REPORTS & ADMIN",
    items: [
      { label: "QA Analytics", icon: FileBarChart },
      { label: "Team & Assignments", icon: Users },
      { label: "Integrations", icon: GitBranch },
      { label: "Audit Logs", icon: Clock3 },
      { label: "Settings", icon: Settings2 },
    ],
  },
];

const trendData = [
  { day: "12 Oct", passed: 42, failed: 9 },
  { day: "13 Oct", passed: 58, failed: 6 },
  { day: "14 Oct", passed: 51, failed: 11 },
  { day: "15 Oct", passed: 74, failed: 7 },
  { day: "16 Oct", passed: 68, failed: 5 },
  { day: "17 Oct", passed: 86, failed: 4 },
  { day: "18 Oct", passed: 92, failed: 3 },
];

const defects = [
  {
    id: "BUG-024",
    title: "Login validation accepts invalid input",
    project: "ISB Net Banking",
    severity: "Critical",
    status: "Open",
    assignee: "AR",
  },
  {
    id: "BUG-023",
    title: "Transaction history API returns 500",
    project: "ISB Net Banking",
    severity: "High",
    status: "In Progress",
    assignee: "DS",
  },
  {
    id: "BUG-022",
    title: "Cart total not updated after quantity change",
    project: "GrowiaShop",
    severity: "Medium",
    status: "Retest",
    assignee: "RF",
  },
  {
    id: "BUG-021",
    title: "Profile image does not persist after refresh",
    project: "Belajar Bareng",
    severity: "Low",
    status: "Open",
    assignee: "NA",
  },
];

const runs = [
  {
    name: "Login & Authentication",
    detail: "TC-001 to TC-024 · Manual",
    result: "Passed",
    progress: 100,
  },
  {
    name: "Banking API Regression",
    detail: "Postman / Newman",
    result: "Failed",
    progress: 92,
  },
  {
    name: "Checkout E2E",
    detail: "WebdriverIO",
    result: "Running",
    progress: 64,
  },
];

function StatusBadge({ value }: { value: string }) {
  const styles: Record<string, string> = {
    Critical: "bg-rose-500/10 text-rose-600 dark:text-rose-300",
    High: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
    Medium: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    Low: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
    Open: "bg-rose-500/10 text-rose-600 dark:text-rose-300",
    "In Progress":
      "bg-blue-500/10 text-blue-700 dark:text-blue-300",
    Retest: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
    Passed: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    Failed: "bg-rose-500/10 text-rose-600 dark:text-rose-300",
    Running: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[value] ?? "bg-gray-500/10 text-gray-500"
      }`}
    >
      {value}
    </span>
  );
}

function MetricCard({
  label,
  value,
  sub,
  icon: Icon,
  trend,
  positive = true,
}: {
  label: string;
  value: string;
  sub: string;
  icon: typeof Activity;
  trend: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-[var(--muted)]">{label}</p>
        <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-500">
          <Icon size={19} />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-2">
        <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {value}
        </h3>
        <span
          className={`flex items-center gap-1 text-xs font-semibold ${
            positive ? "text-emerald-600" : "text-rose-500"
          }`}
        >
          {positive ? (
            <ArrowUpRight size={15} />
          ) : (
            <ArrowDownRight size={15} />
          )}
          {trend}
        </span>
      </div>
      <p className="mt-2 text-xs text-[var(--muted)]">{sub}</p>
    </div>
  );
}

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [activePage, setActivePage] = useState("Overview");
  const [search, setSearch] = useState("");
  const [project, setProject] = useState("All Projects");
  const [mobileNav, setMobileNav] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredDefects = useMemo(
    () =>
      defects.filter((defect) => {
        const matchesSearch =
          `${defect.id} ${defect.title} ${defect.project}`
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesProject =
          project === "All Projects" || defect.project === project;

        return matchesSearch && matchesProject;
      }),
    [search, project],
  );

  function notify(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  }

  function navigate(page: string) {
    setActivePage(page);
    setMobileNav(false);

    if (page !== "Overview") {
      notify(
        `${page}: tampilan modul berikutnya akan kita implementasikan.`,
      );
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {mobileNav && (
        <button
          aria-label="Close navigation"
          onClick={() => setMobileNav(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-[var(--border)] bg-[var(--sidebar)] transition-transform duration-200 ${
          mobileNav ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-[76px] items-center gap-3 border-b border-[var(--border)] px-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <ShieldCheck size={23} />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight">
              Rafora <span className="text-blue-500">QA Hub</span>
            </h1>
            <p className="mt-0.5 text-[11px] text-[var(--muted)]">
              Quality Engineering
            </p>
          </div>
          <button
            aria-label="Close sidebar"
            onClick={() => setMobileNav(false)}
            className="ml-auto rounded-lg p-1.5 hover:bg-[var(--surface-muted)] lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <div className="border-b border-[var(--border)] p-4">
          <button
            onClick={() => notify("Pemilihan workspace akan ditambahkan.")}
            className="flex w-full items-center gap-3 rounded-xl border border-[var(--border)] p-3 text-left hover:bg-[var(--surface-muted)]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 font-bold text-violet-500">
              R
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Rafora Digital</p>
              <p className="mt-0.5 text-xs text-[var(--muted)]">
                Personal workspace
              </p>
            </div>
            <ChevronDown size={16} className="text-[var(--muted)]" />
          </button>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 px-3 text-[10px] font-bold tracking-[0.16em] text-[var(--muted)]">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = activePage === item.label;

                  return (
                    <button
                      key={item.label}
                      onClick={() => navigate(item.label)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] transition-colors ${
                        active
                          ? "bg-blue-500/10 font-semibold text-blue-600 dark:text-blue-300"
                          : "text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      <Icon size={17} />
                      <span className="flex-1">{item.label}</span>
                      {item.label === "Defect Tracker" && (
                        <span className="rounded-md bg-rose-500/10 px-1.5 py-0.5 text-[10px] font-bold text-rose-500">
                          12
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-[var(--border)] p-4">
          <div className="rounded-xl bg-blue-500/5 p-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <CircleHelp size={16} className="text-blue-500" />
              QA Workspace
            </div>
            <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
              Manage tests, track defects, and monitor product quality.
            </p>
            <button
              onClick={() => notify("Panduan penggunaan akan ditambahkan.")}
              className="mt-3 text-xs font-semibold text-blue-500"
            >
              View documentation <ArrowRight size={13} className="ml-1 inline" />
            </button>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-xs font-bold text-white">
              RF
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">QA Administrator</p>
              <p className="text-xs text-[var(--muted)]">Demo account</p>
            </div>
            <button
              aria-label="Account menu"
              onClick={() => notify("Autentikasi akan ditambahkan.")}
              className="rounded-lg p-1.5 hover:bg-[var(--surface-muted)]"
            >
              <MoreHorizontal size={19} />
            </button>
          </div>
        </div>
      </aside>

      <div className="min-w-0 lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface)]/95 px-4 backdrop-blur sm:px-6 xl:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              aria-label="Open navigation"
              onClick={() => setMobileNav(true)}
              className="rounded-lg p-2 hover:bg-[var(--surface-muted)] lg:hidden"
            >
              <Menu size={21} />
            </button>
            <div className="min-w-0">
              <p className="truncate text-xs text-[var(--muted)]">
                Workspace / Quality Management
              </p>
              <h2 className="mt-1 truncate text-base font-bold sm:text-lg">
                {activePage === "Overview"
                  ? "Overview Dashboard"
                  : activePage}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search defects..."
                aria-label="Search defects"
                className="h-10 w-48 rounded-xl border border-[var(--border)] bg-[var(--background)] pl-9 pr-3 text-xs outline-none focus:border-blue-500 xl:w-60"
              />
            </div>
            <button
              aria-label="Toggle color theme"
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] hover:bg-[var(--surface-muted)]"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              aria-label="Notifications"
              onClick={() => notify("Notifikasi akan tersedia setelah backend aktif.")}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] hover:bg-[var(--surface-muted)]"
            >
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500" />
            </button>
            <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white sm:flex">
              QA
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 xl:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  Quality overview
                </h2>
                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[10px] font-semibold text-blue-600 dark:text-blue-300">
                  DEMO DATA
                </span>
              </div>
              <p className="mt-1.5 text-sm text-[var(--muted)]">
                Monitor test execution, defects, and release quality.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="relative">
                <Filter
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  aria-label="Filter project"
                  className="h-10 max-w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface)] py-2 pl-9 pr-8 text-xs font-medium outline-none focus:border-blue-500"
                >
                  <option>All Projects</option>
                  <option>ISB Net Banking</option>
                  <option>GrowiaShop</option>
                  <option>Belajar Bareng</option>
                </select>
              </label>
              <button
                onClick={() => notify("Form pembuatan test run akan ditambahkan.")}
                className="flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-3.5 text-xs font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus size={16} />
                New Test Run
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
            <MetricCard
              label="Total Test Cases"
              value="248"
              sub="Across 8 test suites"
              icon={ClipboardCheck}
              trend="+12 this week"
            />
            <MetricCard
              label="Pass Rate"
              value="92.4%"
              sub="Based on completed tests"
              icon={CheckCircle2}
              trend="+3.2%"
            />
            <MetricCard
              label="Open Defects"
              value="12"
              sub="4 high or critical severity"
              icon={Bug}
              trend="2 fewer"
              positive={true}
            />
            <MetricCard
              label="Requirement Coverage"
              value="86%"
              sub="43 of 50 requirements linked"
              icon={ShieldCheck}
              trend="+6.5%"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 2xl:grid-cols-[1.65fr_1fr]">
            <section className="min-w-0 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold">Test execution trends</h3>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    Daily test outcomes · Last 7 days
                  </p>
                </div>
                <button
                  onClick={() => navigate("QA Analytics")}
                  className="flex items-center gap-1 text-xs font-semibold text-blue-500"
                >
                  View reports <ArrowRight size={14} />
                </button>
              </div>
              <div className="mt-5 h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={trendData}
                    margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="passedFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3984F5" stopOpacity={0.28} />
                        <stop offset="95%" stopColor="#3984F5" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      stroke="var(--border)"
                      strokeDasharray="4 4"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="day"
                      tick={{ fill: "var(--muted)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                    />
                    <YAxis
                      tick={{ fill: "var(--muted)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        color: "var(--foreground)",
                        fontSize: 12,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="passed"
                      name="Passed"
                      stroke="#3984F5"
                      strokeWidth={2.5}
                      fill="url(#passedFill)"
                    />
                    <Area
                      type="monotone"
                      dataKey="failed"
                      name="Failed"
                      stroke="#F16C79"
                      strokeWidth={2}
                      fill="transparent"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 flex flex-wrap gap-5 text-xs text-[var(--muted)]">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  Passed
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  Failed
                </span>
              </div>
            </section>

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold">Latest test runs</h3>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    Execution activity
                  </p>
                </div>
                <button
                  aria-label="More test run options"
                  onClick={() => navigate("Test Execution")}
                  className="rounded-lg p-2 hover:bg-[var(--surface-muted)]"
                >
                  <MoreHorizontal size={19} />
                </button>
              </div>
              <div className="mt-5 space-y-5">
                {runs.map((run) => (
                  <div key={run.name}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">{run.name}</p>
                        <p className="mt-1 text-xs text-[var(--muted)]">
                          {run.detail}
                        </p>
                      </div>
                      <StatusBadge value={run.result} />
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                      <div
                        className={`h-full rounded-full ${
                          run.result === "Failed"
                            ? "bg-rose-500"
                            : run.result === "Passed"
                              ? "bg-emerald-500"
                              : "bg-blue-500"
                        }`}
                        style={{ width: `${run.progress}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-right text-[10px] text-[var(--muted)]">
                      {run.progress}% complete
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("Test Execution")}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] py-2.5 text-xs font-semibold hover:bg-[var(--surface-muted)]"
              >
                View all executions <ArrowRight size={14} />
              </button>
            </section>
          </div>

          <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <div className="flex flex-col justify-between gap-3 p-4 sm:flex-row sm:items-center sm:p-5">
              <div>
                <h3 className="font-bold">Recent defects</h3>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  Track issues requiring attention
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative md:hidden">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                  />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search defects..."
                    aria-label="Search defects"
                    className="h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] pl-9 pr-3 text-xs outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={() => navigate("Defect Tracker")}
                  className="flex h-9 items-center gap-2 rounded-lg border border-[var(--border)] px-3 text-xs font-semibold hover:bg-[var(--surface-muted)]"
                >
                  View all defects <ArrowRight size={14} />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-xs">
                <thead className="border-y border-[var(--border)] bg-[var(--background)] text-[var(--muted)]">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Defect</th>
                    <th className="px-4 py-3 font-semibold">Project</th>
                    <th className="px-4 py-3 font-semibold">Severity</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Assignee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filteredDefects.map((defect) => (
                    <tr
                      key={defect.id}
                      className="transition hover:bg-[var(--surface-muted)]"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-blue-600 dark:text-blue-300">
                          {defect.id}
                        </p>
                        <p className="mt-1 max-w-[280px] truncate text-[var(--foreground)]">
                          {defect.title}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-[var(--muted)]">
                        {defect.project}
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge value={defect.severity} />
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge value={defect.status} />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/10 text-[10px] font-bold text-blue-600 dark:text-blue-300">
                            {defect.assignee}
                          </span>
                          <span className="text-[var(--muted)]">
                            {defect.assignee}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredDefects.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-10 text-center text-[var(--muted)]"
                      >
                        No defects match your search or project filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="border-t border-[var(--border)] px-5 py-3 text-xs text-[var(--muted)]">
              Showing {filteredDefects.length} of {defects.length} demo defects
            </div>
          </section>

          <div className="flex flex-col justify-between gap-2 pb-3 text-xs text-[var(--muted)] sm:flex-row">
            <p>© 2026 Rafora QA Hub · Rafora Digital</p>
            <p className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Demo environment · Not connected to production
            </p>
          </div>
        </main>
      </div>

      {notice && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-[60] flex max-w-[calc(100vw-40px)] items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm shadow-2xl"
        >
          <AlertCircle size={18} className="shrink-0 text-blue-500" />
          <span>{notice}</span>
          <button
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
            className="ml-1 rounded p-1 hover:bg-[var(--surface-muted)]"
          >
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
