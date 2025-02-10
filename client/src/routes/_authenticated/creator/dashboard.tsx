import { createFileRoute } from "@tanstack/react-router";
import { Book, Users, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Courses from "@/components/dashboard/courses-tab";

function StatsTab() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Analytics & Statistics</h2>
      <p>Analytics and performance metrics will go here</p>
    </div>
  );
}

function StudentsTab() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Students</h2>
      <p>Students will go here</p>
    </div>
  );
}

function RouteComponent() {
  const [activeTab, setActiveTab] = useState("courses");

  const tabs = [
    { id: "courses", label: "Courses", icon: Book, component: Courses },
    { id: "students", label: "Students", icon: Users, component: StudentsTab },
    { id: "stats", label: "Stats", icon: BarChart, component: StatsTab },
  ];

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || Courses;

  return (
    <div className="h-full flex-1 p-8 pt-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex flex-row lg:flex-col gap-2 lg:w-[200px]">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                activeTab === tab.id && "bg-secondary"
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </Button>
          ))}
        </div>

        <div className="flex-1 bg-card rounded-lg border">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/_authenticated/creator/dashboard")({
  component: RouteComponent,
});
