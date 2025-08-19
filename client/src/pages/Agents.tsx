import React from "react";

export default function Agents() {
  return (
    <div
      className="min-h-screen flex flex-col bg-[rgb(6,6,7)] text-white"
      style={{
        /* San Francisco / iOS system font stack */
        fontFamily:
          '-apple-system, "SF Pro Text", "SF Pro Display", BlinkMacSystemFont, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif',
        /* Subtle dark contrast background (not flat gray) */
        backgroundImage:
          "radial-gradient(1200px 600px at 50% -200px, rgba(255,255,255,0.06), rgba(0,0,0,0)), linear-gradient(180deg, rgba(17,17,18,1) 0%, rgba(6,6,7,1) 100%)",
      }}
    >
      {/* Safe area top spacing */}
      <div className="pt-[env(safe-area-inset-top)]" />

      {/* Header Tabs */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center font-semibold text-[14px] tracking-[-0.2px]">Agents</div>
          <div className="flex-1 text-center font-semibold text-[14px] tracking-[-0.2px]">Dashboard</div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-3 mx-4 border-t border-white/10" />

      {/* Main content centered vertically (within safe area, above buttons) */}
      <div className="flex-1 px-4">
        <div className="h-full grid" style={{ gridTemplateRows: "1fr auto" }}>
          <div className="flex items-center justify-center">
            <div className="w-full" style={{ maxWidth: 480 }}>
              {/* Title */}
              <h1
                className="text-center font-medium text-[18px] leading-[24px] mb-3"
                style={{ color: "#D9D9D9" }}
              >
                Update main screen UI to match design
              </h1>

              {/* Subtext */}
              <p
                className="text-left text-[14px] leading-[20px] mb-3"
                style={{ color: "#B0B0B0" }}
              >
                Ensure the layout, font, tone, and spacing are indistinguishable from a real iOS app. Use a dark theme with subtle contrast, consistent padding, and refined typography.
              </p>

              {/* Tag / Badge */}
              <div className="mb-4">
                <span className="inline-block rounded-full px-3 py-1 text-[12px] leading-[16px]"
                  style={{
                    color: "#B0B0B0",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  gpt-5-high
                </span>
              </div>

              {/* Soft divider between sections */}
              <div className="border-t border-white/10 my-4" />

              {/* Message Bubble */}
              <div className="max-w-full">
                <div
                  className="inline-block rounded-2xl px-4 py-3 text-[14px] leading-[20px]"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    color: "#E6E6E6",
                  }}
                >
                  VM started
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Button Row */}
          <div className="pb-[calc(env(safe-area-inset-bottom)+16px)] pt-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                className="rounded-xl px-4 py-3 text-[14px] font-medium"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: "#FFFFFF",
                }}
              >
                Diff
              </button>
              <button
                className="rounded-xl px-4 py-3 text-[14px] font-medium"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: "#FFFFFF",
                }}
              >
                Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

