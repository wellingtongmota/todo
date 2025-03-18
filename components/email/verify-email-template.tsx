import React from "react"

export function VerifyEmailTemplate({ url }: { url: string }) {
  return (
    <div className="grid gap-4">
      <h2>Click the link to verify your email:</h2>
      <a href={url}>{url}</a>
    </div>
  )
}
