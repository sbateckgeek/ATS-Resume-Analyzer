
import { FileText, BarChart3, FileEdit, Archive, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import type { Database } from "@/integrations/supabase/types";

type UserActivity = Database['public']['Tables']['user_activities']['Row'];

interface RecentActivitiesProps {
  activities: UserActivity[];
  loading: boolean;
  onArchive: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

function getActivityIcon(type: string) {
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
}

export function RecentActivities({ activities, loading, onArchive, onDelete }: RecentActivitiesProps) {
  return (
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
                    onClick={() => onArchive(activity.id)}
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
                          onClick={() => onDelete(activity.id)}
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
  );
}
