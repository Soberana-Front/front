import { useState } from 'react'

type Clinic = {
  id: string
  name: string
}

const clinics: Clinic[] = [
  {
    id: '1',
    name: 'Clínica 1',
  },
  {
    id: '2',
    name: 'Clínica 2',
  },
  {
    id: '3',
    name: 'Clínica 3',
  },
]

export function ClinicSelector() {
  const [selectedClinic, setSelectedClinic] = useState('')

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedClinic(event.target.value)
  }

  return (
    <div className="w-full max-w-md">
      <label
        htmlFor="clinic"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Clínica
      </label>

      <select
        id="clinic"
        value={selectedClinic}
        onChange={handleChange}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
      >
        <option value="">Selecione uma clínica</option>

        {clinics.map((clinic) => (
          <option key={clinic.id} value={clinic.id}>
            {clinic.name}
          </option>
        ))}
      </select>
    </div>
  )
}