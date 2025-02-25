
import { FileText, BarChart3, Settings, Linkedin, FileEdit } from "lucide-react";
import { Link } from "react-router-dom";

export const navigationItems = [
  { 
    icon: FileText, 
    label: "Resume Analyzer",
    href: "/dashboard/resume"
  },
  { 
    icon: BarChart3, 
    label: "Job Description Analyzer",
    href: "/dashboard/job-analysis"
  },
  { 
    icon: Linkedin, 
    label: "LinkedIn Sync",
    href: "/dashboard/linkedin"
  },
  { 
    icon: FileEdit, 
    label: "Cover Letter Generator",
    href: "/dashboard/cover-letter"
  },
  { 
    icon: Settings, 
    label: "Settings",
    href: "/dashboard/settings"
  },
];

export function DashboardNav() {
  return (
    <nav className="flex-1 space-y-1 p-4">
      {navigationItems.map((item) => (
        <Link
          key={item.label}
          to={item.href}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
