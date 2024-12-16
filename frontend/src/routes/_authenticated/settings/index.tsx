import { createFileRoute } from '@tanstack/react-router'
import { UserProfileForm } from '@/components/user-profile-form'

export const Route = createFileRoute('/_authenticated/settings/')({
  component: Settings,
})

function Settings() {
  return (
    <>
      <div>Hello settings!</div>

      <UserProfileForm />
    </>
  )
}
