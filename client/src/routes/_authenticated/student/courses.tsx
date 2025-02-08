import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/student/courses')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/student/courses"!</div>
}
