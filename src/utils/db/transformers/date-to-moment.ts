import { ValueTransformer } from 'typeorm'
import moment from 'moment'

class DateToMomentTransformer implements ValueTransformer {
  from(value: Date|string) {
    return value ? moment(value) : value
  }

  to(value: moment.Moment|Date|string): any {
    if (moment.isMoment(value)) {
      return value.toDate()
    }

    return value
  }
}

const columnDateToMomentTransformer = new DateToMomentTransformer()
export default columnDateToMomentTransformer
