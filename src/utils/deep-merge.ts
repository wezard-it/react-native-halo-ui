export type DeepMerge<T> = {
  [K in keyof T]: DeepMerge<T[K]>
}

export const deepMerge = <T extends object>(target: T, source: T): DeepMerge<T> => {
  const mergedObject = {} as DeepMerge<T>

  for (const key in target) {
    mergedObject[key as keyof T] = target[key]
  }

  for (const key in source) {
    if (mergedObject[key]) {
      if (typeof mergedObject[key] === 'object' && typeof source[key] === 'object') {
        mergedObject[key] = deepMerge(mergedObject[key], source[key])
      }
    } else {
      mergedObject[key] = source[key]
    }
  }

  return mergedObject as DeepMerge<T>
}
