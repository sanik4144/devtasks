import { useLocation } from "react-router-dom";

const SIDEBAR_SECTIONS = [
  {
    title: "Overview",
    description: "Jump back to the main workspace",
    match: (pathname) => pathname === "/" || pathname === "/dashboard",
    items: [
      { label: "Home", description: "Landing page", path: "/", exact: true },
      { label: "Dashboard", description: "App overview", path: "/dashboard", exact: true },
    ],
  },
  {
    title: "Task Management",
    description: "Roadmaps, logs, and backups",
    match: (pathname) => pathname.startsWith("/taskmanage"),
    items: [
      { label: "Task Workspace", description: "Task section hub", path: "/taskmanage", exact: true },
      { label: "Add Tasks", description: "Create new roadmap items", path: "/taskmanage/add-tasks" },
      { label: "Task List", description: "Review active and completed tasks", path: "/taskmanage/list-tasks" },
      { label: "Delete History", description: "Restore removed items", path: "/taskmanage/delete-history" },
      { label: "Data Center", description: "Import and export backups", path: "/taskmanage/data-center" },
    ],
  },
  {
    title: "Snippet Vault",
    description: "Save, review, and restore snippets",
    match: (pathname) => pathname.startsWith("/snippetvault"),
    items: [
      { label: "Vault Home", description: "Snippet overview", path: "/snippetvault", exact: true },
      { label: "Add Snippet", description: "Create a new snippet", path: "/snippetvault/add" },
      { label: "Snippet List", description: "Browse saved snippets", path: "/snippetvault/list" },
      { label: "Delete History", description: "Restore removed snippets", path: "/snippetvault/delete-history" },
      { label: "Data Center", description: "Import and export backups", path: "/snippetvault/data-center" },
    ],
  },
  {
    title: "Resource Hub",
    description: "Links, references, and backups",
    match: (pathname) => pathname.startsWith("/resourcehub"),
    items: [
      { label: "Hub Home", description: "Resource overview", path: "/resourcehub", exact: true },
      { label: "Add Resource", description: "Save a new link", path: "/resourcehub/add" },
      { label: "Resource List", description: "Browse saved resources", path: "/resourcehub/list" },
      { label: "Delete History", description: "Restore removed resources", path: "/resourcehub/delete-history" },
      { label: "Data Center", description: "Import and export backups", path: "/resourcehub/data-center" },
    ],
  },
  {
    title: "Dev Utilities",
    description: "Quick tools and converters",
    match: (pathname) => pathname.startsWith("/devutilities"),
    items: [
      { label: "Utilities Home", description: "Tool overview", path: "/devutilities", exact: true },
      { label: "Regex Tester", description: "Test expressions", path: "/devutilities/regex" },
      { label: "JSON Formatter", description: "Format and validate JSON", path: "/devutilities/json" },
      { label: "Base64", description: "Encode and decode", path: "/devutilities/base64" },
      { label: "Timestamp", description: "Convert timestamps", path: "/devutilities/timestamp" },
      { label: "UUID", description: "Generate UUIDs", path: "/devutilities/uuid" },
      { label: "JWT Decoder", description: "Inspect tokens", path: "/devutilities/jwt" },
      { label: "Diff Checker", description: "Compare text differences", path: "/devutilities/diff" },
    ],
  },
];

const useSidebarSection = () => {
  const location = useLocation();

  const activeSection =
    SIDEBAR_SECTIONS.find((section) => section.match(location.pathname)) ||
    null;

  return {
    activeSection,
    hasSidebarSection: Boolean(activeSection),
  };
};

export default useSidebarSection;