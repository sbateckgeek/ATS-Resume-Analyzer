
import { Outlet } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { SettingsSidebar } from "@/components/settings/SettingsSidebar";

export default function SettingsLayout() {
  return (
    <div className="container max-w-6xl py-10">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SettingsSidebar />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
