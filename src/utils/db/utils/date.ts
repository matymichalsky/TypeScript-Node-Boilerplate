import { ColumnOptions } from 'typeorm'
import { Moment } from 'moment'
import columnDateToMomentTransformer from '../transformers/date-to-moment'

export function dateColumnOptions(options: ColumnOptions = {}): ColumnOptions {
  return { type: 'timestamp', transformer: columnDateToMomentTransformer, ...options }
}

export type DateType = Moment
