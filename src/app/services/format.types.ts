import * as moment from 'moment';

export class FormatTypes {
    static formatDate(date: Date) {
        return moment(date).format('DD/MM/YYYY')
    }

    static formatDateDDMM(date: Date) {
        return moment(date).format('DD/MM')
    }

    static formatDateTime(date: Date) {
        return moment(date).format('DD/MM HH:mm')
    }

    static formatTime(date: Date) {
        return moment(date).format('HH:mm')
    }
}