import { Transform } from 'class-transformer'
import { DateType } from '../db/utils/date'

export default function JsonDateFormat(format?: string) {
  return (target: any, key: string) =>
    Transform((value: DateType) => value ? value.format(format) : null, { toPlainOnly: true })(target, key)
}
