"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type Student = {
  id: string
  name: string
  email: string
  enrolledCourses: number
  lastActive: string
  status: "active" | "inactive"
}

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "enrolledCourses",
    header: "Enrolled Courses",
  },
  {
    accessorKey: "lastActive",
    header: "Last Active",
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => (
      <Badge
        variant={info.getValue() === "active" ? "default" : "destructive"}
        className={cn("w-fit", {
          "bg-green-500 hover:bg-green-500 text-white outline outline-1 outline-green-400/50":
            info.getValue() === "active",
          "bg-red-500 hover:bg-red-500 text-white outline outline-1 outline-red-400/50":
            info.getValue() === "inactive",
        })}
      >
        {info.getValue()}
      </Badge>
    ),
  },
]
