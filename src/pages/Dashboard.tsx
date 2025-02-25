
import { useState, useEffect } from "react";
import { 
  FileText, 
  BarChart3, 
  Settings, 
  User, 
  Bell,
  Search,
  Linkedin,
  FileEdit,
  MenuIcon,
  Archive,
  Trash2
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";

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

const DashboardPage = () => {
  const [stats, setStats] = useState({
    total_resumes: 0,
    ai_analyses: 0,
    cover_letters: 0,
    job_matches: 0
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load user stats
      const { data: statsData } = await supabase
        .from("user_stats")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (statsData) {
        setStats(statsData);
      }

      // Load recent activities
      const { data: activitiesData } = await supabase
        .from("user_activities")
        .select("*")
        .eq("user_id", user.id)
        .eq("archived", false)
        .order("created_at", { ascending: false })
        .limit(10);

      if (activitiesData) {
        setActivities(activitiesData);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const archiveActivity = async (activityId) => {
    try {
      const { error } = await supabase
        .from("user_activities")
        .update({ archived: true })
        .eq("id", activityId);

      if (error) throw error;

      setActivities(activities.filter(activity => activity.id !== activityId));
      toast.success("Activity archived");
    } catch (error) {
      console.error("Error archiving activity:", error);
      toast.error("Failed to archive activity");
    }
  };

  const deleteActivity = async (activityId) => {
    try {
      const { error } = await supabase
        .from("user_activities")
        .delete()
        .eq("id", activityId);

      if (error) throw error;

      setActivities(activities.filter(activity => activity.id !== activityId));
      toast.success("Activity deleted");
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast.error("Failed to delete activity");
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "resume_upload":
        return <FileText className="h-4 w-4" />;
      case "ai_analysis":
        return <BarChart3 className="h-4 w-4" />;
      case "cover_letter":
        return <FileEdit className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

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
            <p className="text-muted-foreground">
              Welcome back! Here's your overview.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Resumes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold">
                    {stats.total_resumes}
                  </div>
                  <div className="text-sm text-green-500">
                    +12.5%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  From previous month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold">
                    {stats.ai_analyses}
                  </div>
                  <div className="text-sm text-green-500">
                    +8.2%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Improvement rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Cover Letters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold">
                    {stats.cover_letters}
                  </div>
                  <div className="text-sm text-green-500">
                    +15.3%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Generation success rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Job Matches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold">
                    {stats.job_matches}
                  </div>
                  <div className="text-sm text-green-500">
                    +4.5%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Matching accuracy
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest resume analysis and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : activities.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No recent activity
                  </p>
                ) : (
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-4 rounded-lg border"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 rounded-full bg-primary/10">
                            {getActivityIcon(activity.activity_type)}
                          </div>
                          <div>
                            <p className="font-medium">
                              {activity.activity_type.replace(/_/g, " ")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {format(
                                new Date(activity.created_at),
                                "MMM d, yyyy 'at' h:mm a"
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => archiveActivity(activity.id)}
                          >
                            <Archive className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Activity
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this activity?
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteActivity(activity.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
