
import { useState } from "react";
import { 
  FileText, 
  BarChart3, 
  Settings, 
  User, 
  Bell,
  Search,
  Linkedin,
  FileEdit,
  MenuIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const DashboardPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const stats = [
    {
      title: "Total Resumes",
      value: "125",
      change: "+12.5%",
      description: "Compared to last month"
    },
    {
      title: "AI Analysis",
      value: "89",
      change: "+8.2%",
      description: "Improvement rate"
    },
    {
      title: "Cover Letters",
      value: "45",
      change: "+15.3%",
      description: "Generation success rate"
    },
    {
      title: "Job Matches",
      value: "92%",
      change: "+4.5%",
      description: "Matching accuracy"
    }
  ];

  const navigationItems = [
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

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar for desktop */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-border bg-card lg:block">
        <div className="flex h-full flex-col">
          <div className="border-b border-border p-6">
            <div className="flex items-center gap-2 font-semibold">
              <FileText className="h-6 w-6" />
              <span>CV Master</span>
            </div>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="px-2 lg:hidden fixed left-4 top-4 z-50"
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            <div className="border-b border-border p-6">
              <div className="flex items-center gap-2 font-semibold">
                <FileText className="h-6 w-6" />
                <span>CV Master</span>
              </div>
            </div>
            <nav className="flex-1 space-y-1 p-4">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex flex-1">
              <Button variant="ghost" size="icon" className="lg:hidden">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="container mx-auto p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-green-500">{stat.change}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest resume analysis and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Activity items would go here */}
                  <p className="text-muted-foreground">No recent activity</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
