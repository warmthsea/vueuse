import type { MaybeRefOrGetter, ShallowRef } from 'vue'
import type { Pausable } from '../utils'
import { shallowReadonly, shallowRef } from 'vue'
import { useIntervalFn } from '../useIntervalFn'

export interface UseIntervalOptions<Controls extends boolean> {
  /**
   * Expose more controls
   *
   * @default false
   */
  controls?: Controls

  /**
   * Execute the update immediately on calling
   *
   * @default true
   */
  immediate?: boolean

  /**
   * Callback on every interval
   */
  callback?: (count: number) => void
}

export interface UseIntervalControls {
  counter: ShallowRef<number>
  reset: () => void
}

export type UseIntervalReturn = Readonly<ShallowRef<number>> | Readonly<UseIntervalControls & Pausable>

/**
 * Reactive counter increases on every interval
 *
 * @see https://vueuse.org/useInterval
 * @param interval
 * @param options
 */
export function useInterval(interval?: MaybeRefOrGetter<number>, options?: UseIntervalOptions<false>): Readonly<ShallowRef<number>>
export function useInterval(interval: MaybeRefOrGetter<number>, options: UseIntervalOptions<true>): Readonly<UseIntervalControls & Pausable>
export function useInterval(interval: MaybeRefOrGetter<number> = 1000, options: UseIntervalOptions<boolean> = {}): UseIntervalReturn {
  const {
    controls: exposeControls = false,
    immediate = true,
    callback,
  } = options

  const counter = shallowRef(0)
  const update = () => counter.value += 1
  const reset = () => {
    counter.value = 0
  }
  const controls = useIntervalFn(
    callback
      ? () => {
          update()
          callback(counter.value)
        }
      : update,
    interval,
    { immediate },
  )

  if (exposeControls) {
    return {
      counter: shallowReadonly(counter),
      reset,
      ...controls,
    }
  }
  else {
    return shallowReadonly(counter)
  }
}
