interface DateComponents {
	year: string;
	month: string;
	day: string;
	hour: string;
	hr12: string;
	minute: string;
	ampm: string;
}

function formatDate(date: Date, formatter: (components: DateComponents) => string) {
	return formatter({
		year: 	date.getFullYear() .toString(),
		month: (date.getMonth()+1) .toString(), // 0 indexed
		day:    date.getDate()     .toString(),
		hour:   date.getHours()    .toString(),
		hr12:  (date.getHours()%12).toString(),
		minute: date.getMinutes()  .toString(),
		ampm:   date.getHours() > 11 ? 'PM' : 'AM'
	});
}

function pd(num: number | string) {
	return num.toString().padStart(2, '0');
}

export {formatDate, pd};
export type {DateComponents};
