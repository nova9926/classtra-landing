import type { ReactNode } from 'react'
import { Icon } from '@/components/landing/Icon'
import type { RoleId } from '@/i18n/types'
import { useContent } from '@/lib/prefs'
import { cn } from '@/lib/utils'

// What each role sees (LANDING_SPEC.md §5). Sample data only: the previews are
// pictures of the app, so their "buttons" are not real buttons and the whole
// preview is hidden from screen readers. The text beside it says the same thing.

const tile = 'rounded-[18px] border border-chalk/15 bg-chalk/8 p-3.5'

/** Looks like a button, is not one. */
function MockButton({ icon, tone, children }: { icon?: string; tone: 'accent' | 'glass'; children: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-semibold whitespace-nowrap',
        tone === 'accent' ? 'bg-accent text-ink' : 'border border-chalk/18 bg-chalk/8 text-chalk',
      )}
    >
      {icon && <Icon name={icon} size={16} />}
      {children}
    </span>
  )
}

function Directeur() {
  const data = useContent().roles.previews.directeur
  return (
    <div className="flex flex-col gap-2.5">
      <div className="grid grid-cols-2 gap-2.5">
        <div className={tile}>
          <div className="text-xs text-muted-on-board">{data.revenueLabel}</div>
          <div className="heading mt-1 text-xl whitespace-nowrap sm:text-[1.75rem]">{data.revenue}</div>
        </div>
        <div className={tile}>
          <div className="text-xs text-muted-on-board">{data.lateLabel}</div>
          <div className="heading mt-1 text-xl text-late sm:text-[1.75rem]">{data.late}</div>
        </div>
      </div>
      <div className={cn(tile, 'flex flex-col gap-2 text-[13px]')}>
        <div className="text-muted-on-board">{data.occupancyLabel}</div>
        {data.groups.map((group, i) => (
          <div key={group.name} className="flex items-center gap-2.5">
            <span className="w-[100px] shrink-0">{group.name}</span>
            <div className="h-2.5 flex-1 rounded-full bg-chalk/12">
              <div
                className={cn('h-full rounded-full', i === 0 ? 'bg-accent' : 'bg-orb-mint')}
                style={{ width: `${group.fill}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Secretariat() {
  const data = useContent().roles.previews.secretariat
  return (
    <div className="flex flex-col gap-2.5">
      <div className={cn(tile, 'flex flex-col gap-2 text-[13px]')}>
        <div className="text-muted-on-board">{data.title}</div>
        {data.payments.map((payment) => (
          <div
            key={payment.name}
            className="flex items-center justify-between gap-3 rounded-xl bg-chalk/6 px-3 py-2"
          >
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="font-semibold">{payment.name}</span>
              <span className="text-xs text-muted-on-board">{payment.detail}</span>
            </span>
            <MockButton tone="accent">{data.collect}</MockButton>
          </div>
        ))}
      </div>
      <div>
        <MockButton tone="glass" icon="person_add">
          {data.enrol}
        </MockButton>
      </div>
    </div>
  )
}

function Formateurs() {
  const data = useContent().roles.previews.formateurs
  return (
    <div className="flex flex-col gap-2.5">
      <div className={cn(tile, 'flex items-center justify-between gap-3')}>
        <span className="flex flex-col leading-tight">
          <span className="text-xs text-muted-on-board">{data.groupLabel}</span>
          <span className="heading mt-1 text-xl">{data.group}</span>
        </span>
        <span className="rounded-full bg-chalk/12 px-3 py-1 text-xs font-semibold">{data.room}</span>
      </div>
      <div className={cn(tile, 'flex flex-col text-[13px]')}>
        {data.students.map((student) => (
          <div
            key={student.name}
            className="flex items-center justify-between border-b border-chalk/10 py-2 last:border-b-0"
          >
            {student.name}
            <span
              className={cn(
                'flex size-6 items-center justify-center rounded-full',
                student.present ? 'bg-accent text-ink' : 'border border-dashed border-chalk/35',
              )}
            >
              {student.present && <Icon name="check" size={16} />}
            </span>
          </div>
        ))}
      </div>
      <div>
        <MockButton tone="accent" icon="check_circle">
          {data.validate}
        </MockButton>
      </div>
    </div>
  )
}

const byRole: Record<RoleId, () => ReactNode> = {
  directeur: Directeur,
  secretariat: Secretariat,
  formateurs: Formateurs,
}

export function RolePreview({ role }: { role: RoleId }) {
  const Preview = byRole[role]
  return (
    <div aria-hidden="true">
      <Preview />
    </div>
  )
}
