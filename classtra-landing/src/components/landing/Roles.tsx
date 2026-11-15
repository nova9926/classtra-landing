import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { IconChip } from '@/components/landing/Icon'
import { RolePreview } from '@/components/landing/RolePreviews'
import { Segmented } from '@/components/landing/Segmented'
import { BlurFade } from '@/components/ui/blur-fade'
import type { RoleId } from '@/i18n/types'
import { useContent } from '@/lib/prefs'

const EASE = [0.22, 1, 0.36, 1] as const

/** §5: three tabs, one preview panel. Each person sees only what concerns them. */
export function Roles() {
  const { roles } = useContent()
  const [active, setActive] = useState<RoleId>(roles.tabs[0].id)
  const tab = roles.tabs.find((t) => t.id === active) ?? roles.tabs[0]

  return (
    <section className="relative">

      <div className="relative mx-auto flex max-w-[1120px] flex-col items-center gap-8 text-center">
        <BlurFade>
          <h2 className="heading max-w-[820px] text-h2 text-balance">
            {roles.titleStart} <span className="text-soft-on-board">{roles.titleSoft}</span>
          </h2>
        </BlurFade>

        <BlurFade delay={0.06} className="max-w-full">
          <Segmented
            name="roles"
            label={roles.tabsLabel}
            options={roles.tabs}
            value={active}
            onChange={setActive}
          />
        </BlurFade>

        <BlurFade delay={0.12} className="w-full">
          {/* The glass panel stays; only its content cross-fades (0.3s in total). */}
          <div
            role="tabpanel"
            id="roles-panel"
            aria-labelledby={`roles-tab-${active}`}
            className="glass-dark w-full rounded-panel p-7 text-start md:min-h-[21rem] md:p-10"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                className="grid items-center gap-7 md:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: EASE }}
              >
                <div className="flex flex-col gap-3">
                  <IconChip name={tab.icon} />
                  <h3 className="heading mt-1 text-[2rem]">{tab.label}</h3>
                  <p className="text-muted-on-board">{tab.text}</p>
                </div>
                <RolePreview role={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
