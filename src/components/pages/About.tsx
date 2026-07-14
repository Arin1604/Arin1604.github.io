import { BriefcaseBusiness, Camera, GraduationCap } from 'lucide-react';
import HorizontalCardRail from '@/components/HorizontalCardRail';

const roles = [
  {
    title: 'Camera Software Intern',
    organization: 'Metalenz',
    status: 'Current',
    description: 'Working on Qualcomm-based camera pipeline drivers and the software behind computational imaging systems.',
    focus: ['Camera pipelines', 'Qualcomm drivers'],
    icon: Camera,
  },
  {
    title: 'Research Assistant',
    organization: 'Brown Visual Computing Lab',
    status: 'Current',
    description: 'Improving depth-completion models for a VR teleoperation project using the Boston Dynamics Spot robot.',
    focus: ['Computer vision', 'VR teleoperation'],
    icon: BriefcaseBusiness,
  },
  {
    title: 'Computer Graphics TA',
    organization: 'Brown University',
    status: 'Returning',
    description: 'Returning as a teaching assistant to help students build the mathematical and practical foundations of graphics.',
    focus: ['Computer graphics', 'Teaching'],
    icon: GraduationCap,
  },
];

export default function About() {
  return (
    <main className="min-h-[calc(100svh-4rem)] bg-[#111827] px-4 py-10 text-white sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-white/55">About</p>
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Creative technology, graphics, and visual storytelling.</h1>
          <p className="text-base leading-8 text-gray-300 sm:text-lg">
            Hi! My name is Arin, and I’m a senior at Brown University studying Computer Science. I’m deeply passionate about Computer Graphics, Computer Vision, and Software Engineering. Outside the lab and classroom, you’ll likely find me taking pictures or gushing over the cinematography in my favorite films.
          </p>
        </div>

        <HorizontalCardRail
          id="current-roles"
          title="Current Roles"
          className="mt-10 w-full"
        >
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <article
                key={`${role.organization}-${role.title}`}
                className="flex w-[82vw] max-w-sm flex-none snap-start flex-col rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-lg transition duration-300 hover:-translate-y-0.5 hover:border-white/25 md:w-[26rem] md:max-w-none md:p-6"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                    <Icon className="h-5 w-5 text-white/85" />
                  </div>
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
                    {role.status}
                  </span>
                </div>

                <p className="mb-1 text-xs uppercase tracking-[0.15em] text-white/50">{role.organization}</p>
                <h3 className="mb-3 text-xl font-bold text-white">{role.title}</h3>
                <p className="flex-1 text-sm leading-6 text-gray-300">{role.description}</p>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                  {role.focus.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </HorizontalCardRail>

        <div className="mt-10 grid gap-6 border-t border-white/10 pt-8 text-base leading-7 text-gray-300 md:grid-cols-2">
          <p>
            My recent work includes building tools in Unity and C#, contributing to VR teleoperation research, and developing a physically based ray tracer from scratch.
          </p>
          <p>
            Outside of tech, I enjoy exploring visual storytelling, writing tools for Maya, and experimenting with real-time shaders.
          </p>
        </div>
      </div>
    </main>
  );
}
