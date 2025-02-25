
import { useState, useEffect } from "react";
import { MenuIcon, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FileText } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import { DashboardNav } from "@/components/dashboard/Navigation";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { RecentActivities } from "@/components/dashboard/RecentActivities";

type UserStats = Database['public']['Tables']['user_stats']['Row'];
type UserActivity = Database['public']['Tables']['user_activities']['Row'];

const DashboardPage = () => {
  const [stats, setStats] = useState<UserStats>({
    user_id: "",
    total_resumes: 0,
    ai_analyses: 0,
    cover_letters: 0,
    job_matches: 0,
    updated_at: new Date().toISOString()
  });
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: statsData } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (statsData) {
        setStats(statsData);
      }

      const { data: activitiesData } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', user.id)
        .eq('archived', false)
        .order('created_at', { ascending: false })
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

  const archiveActivity = async (activityId: string) => {
    try {
      const { error } = await supabase
        .from('user_activities')
        .update({ archived: true })
        .eq('id', activityId);

      if (error) throw error;

      setActivities(activities.filter(activity => activity.id !== activityId));
      toast.success("Activity archived");
    } catch (error) {
      console.error("Error archiving activity:", error);
      toast.error("Failed to archive activity");
    }
  };

  const deleteActivity = async (activityId: string) => {
    try {
      const { error } = await supabase
        .from('user_activities')
        .delete()
        .eq('id', activityId);

      if (error) throw error;

      setActivities(activities.filter(activity => activity.id !== activityId));
      toast.success("Activity deleted");
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast.error("Failed to delete activity");
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
          <DashboardNav />
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
            <DashboardNav />
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

          <StatsCards stats={stats} />

          <div className="mt-8">
            <RecentActivities
              activities={activities}
              loading={loading}
              onArchive={archiveActivity}
              onDelete={deleteActivity}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
