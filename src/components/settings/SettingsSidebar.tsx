
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const settingsNavItems = [
  {
    title: "Profile",
    href: "/dashboard/settings",
  },
  {
    title: "Account",
    href: "/dashboard/settings/account",
  },
  {
    title: "Appearance",
    href: "/dashboard/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/dashboard/settings/notifications",
  },
];

export function SettingsSidebar() {
  const location = useLocation();

  return (
    <nav className="space-y-1">
      {settingsNavItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "block px-3 py-2 rounded-md text-sm font-medium",
            location.pathname === item.href
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
