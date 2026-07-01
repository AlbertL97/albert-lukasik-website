import { createServiceClient } from '@/lib/supabase/server'
import SettingsForm from './SettingsForm'

export default async function SettingsPage() {
  const supabase = await createServiceClient()
  const { data: profile } = await supabase.from('site_profile').select('*').single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-da-text mb-1">Site Settings</h1>
        <p className="text-da-text-muted text-sm">Edit your public profile and site information.</p>
      </div>
      <SettingsForm profile={profile} />
    </div>
  )
}
