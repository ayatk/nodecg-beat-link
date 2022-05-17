import { useCallback, useEffect, useState } from "react"
import { ReplicantMap, replicantDefaultValues } from "../nodecg"

export const useReplicant = <T extends keyof ReplicantMap>(
  name: T
): [ReplicantMap[T] | undefined, (newValue: ReplicantMap[T]) => void] => {
  const [rep] = useState(() =>
    nodecg.Replicant(name, {
      defaultValue: replicantDefaultValues[name],
    })
  )
  const [value, setValue] = useState(rep.value)
  useEffect(() => {
    const handleChange = (newValue: ReplicantMap[T]) => setValue(newValue)
    rep.on("change", handleChange)
    return () => {
      rep.removeListener("change", handleChange)
    }
  }, [rep])
  return [value, useCallback((newValue) => (rep.value = newValue), [rep])]
}
