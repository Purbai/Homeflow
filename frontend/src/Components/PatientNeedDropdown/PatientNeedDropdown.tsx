import { useState } from "react"

interface PatientNeedType {
  id: number
  needDescription: string
  careDuration: string
  isTransportRequired: string
  transportTypeId: string
  otherDescription: number
  patient: []
}

export function PatientNeedDropdown({
  getPatientNeedIdFromDropdown,
}: {
  getPatientNeedIdFromDropdown(patientNeedIdFromDropdown: number): void
}) {
  const [patientNeedType, setPatientNeedType] = useState<PatientNeedType[]>([])

  if (patientNeedType.length === 0) {
    fetch("http://localhost:5280/patientneedtype", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPatientNeedType(data.listOfPatientNeedType)
      })
  }

  if (!patientNeedType) {
    return <div>Loading...</div>
  } else {
    return (
      <select
        id="patientNeedType"
        className="form-control"
        onChange={(event) => getPatientNeedIdFromDropdown(patientNeedType[event.target.selectedIndex].id)}
      >
        {patientNeedType.map((option) => (
          <option value={option.id}>{option.needDescription}</option>
        ))}
      </select>
    )
  }
}
