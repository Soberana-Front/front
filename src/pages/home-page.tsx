import { Calculator, GraduationCap, ShieldCheck } from 'lucide-react'

const highlights = [
  {
    icon: Calculator,
    title: 'Precificação clara',
    description: 'Organize custos e visualize o resultado calculado pela API.',
  },
  {
    icon: ShieldCheck,
    title: 'Dados consistentes',
    description: 'Contratos da API tipados automaticamente pelo OpenAPI.',
  },
  {
    icon: GraduationCap,
    title: 'Projeto didático',
    description: 'Arquitetura simples para evoluir junto com a turma.',
  },
]

export function HomePage() {
  return (
    <section aria-labelledby="page-title">
      <p className="mb-3 font-medium text-emerald-700">
        Codi Academy + Faculdade Soberana
      </p>
      <h1
        id="page-title"
        className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl"
      >
        Base do front-end preparada para construir o produto em equipe.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
        React, TypeScript e uma estrutura por funcionalidades para apoiar o
        desenvolvimento da aplicação de precificação odontológica.
      </p>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {highlights.map(({ icon: Icon, title, description }) => (
          <article
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            key={title}
          >
            <Icon aria-hidden="true" className="mb-4 text-emerald-700" />
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
