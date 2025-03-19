import { Separator } from "@/components/ui/separator"
import { SettingSection } from "./_components/setting-section"
import { ToggleTheme } from "@/components/toggle-theme"

export default function SettingsPage() {
  return (
    <div className="wrapper mx-auto py-4">
      <h2 className="headline-2 mb-6 sm:mb-8">SettingsPage</h2>

      <div className="grid gap-4 sm:gap-6">
        <SettingSection title="Profile">Test</SettingSection>

        <Separator />

        <SettingSection title="Theme">
          <ToggleTheme />
        </SettingSection>

        <Separator />
      </div>
    </div>
  )
}
