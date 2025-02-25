
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Database } from "@/integrations/supabase/types";

type UserStats = Database['public']['Tables']['user_stats']['Row'];

export function StatsCards({ stats }: { stats: UserStats }) {
  return (
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
  );
}
