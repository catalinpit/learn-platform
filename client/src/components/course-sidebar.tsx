import { Link } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  PlayCircle,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type CourseNavigationProps = {
  course: {
    title: string;
    description: string;
    chapters?: Array<{
      id: string;
      title: string;
      lessons?: Array<{
        id: string;
        title: string;
        progress?: Array<{
          completed: boolean;
        }>;
      }>;
    }>;
  };
  courseId: string;
  lessonId?: string;
};

export function CourseNavigation({
  course,
  courseId,
  lessonId,
}: CourseNavigationProps) {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((current) =>
      current.includes(chapterId)
        ? current.filter((id) => id !== chapterId)
        : [...current, chapterId]
    );
  };

  return (
    <Sidebar className="fixed top-16 left-0 z-30 h-[calc(100vh-4rem)]">
      <SidebarHeader>
        <h2 className="font-semibold px-4 py-2">Course Content</h2>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {course.chapters?.map((chapter) => (
                <SidebarMenuItem key={chapter.id}>
                  <SidebarMenuButton
                    onClick={() => toggleChapter(chapter.id)}
                    className="gap-2"
                  >
                    {expandedChapters.includes(chapter.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    <BookOpen className="h-4 w-4" />
                    <span>{chapter.title}</span>
                  </SidebarMenuButton>
                  {expandedChapters.includes(chapter.id) && (
                    <SidebarMenuSub>
                      {chapter.lessons?.map((lesson) => (
                        <SidebarMenuItem key={lesson.id}>
                          <SidebarMenuButton asChild>
                            <Link
                              to="/student/courses/$courseId/lessons/$lessonId"
                              params={{
                                courseId,
                                lessonId: lesson.id,
                              }}
                              className={cn(
                                "gap-2",
                                lessonId === lesson.id &&
                                  "bg-accent text-accent-foreground"
                              )}
                            >
                              {lesson.progress?.[0]?.completed ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <PlayCircle className="h-4 w-4" />
                              )}
                              <span>{lesson.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <SidebarMenuButton asChild>
          <Link
            to="/student/courses/$courseId"
            params={{ courseId }}
            className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Back to Course
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
