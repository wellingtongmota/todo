import { ToggleTheme } from "@/components/toggle-theme"
import { Separator } from "@/components/ui/separator"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { ProfileForm } from "./_components/profile-form"
import { SettingSection } from "./_components/setting-section"

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <div className="wrapper mx-auto py-4">
      <h2 className="headline-2 mb-6 sm:mb-8">Settings</h2>

      <div className="grid gap-4 sm:gap-6">
        <SettingSection title="Profile">
          <ProfileForm user={session?.user || null} />
        </SettingSection>

        <Separator />

        <SettingSection title="Theme">
          <ToggleTheme />
        </SettingSection>
      </div>
    </div>
  )
}
