import { Timer } from './components/Timer';
import { useMemo, } from 'preact/hooks';
import { Dropdown } from './components/Dropdown';
import { DateComponents, formatDate, pd } from './dateformat';
import { useLocalStorageState } from './localstorage';

function App () {
	
	const dateFormats: ((components: DateComponents) => string)[] = useMemo(() => [
		c => `${c.month}/${c.day}/${c.year.substring(2,4)} ${c.hr12}:${pd(c.minute)} ${c.ampm}`,
		c => `${c.year}-${pd(c.month)}-${pd(c.day)} ${pd(c.hour)}:${pd(c.minute)}`,
	], []);

	const [chosenFormat, setChosenFormat] = useLocalStorageState(0, 'chosenFormat');

	const timeOptions = useMemo(() => [
		['LA District Event', new Date('2026-03-20T08:00:00')],
		['Digital Circus Ep 8', new Date('2026-03-20T15:00:00')],
		['Minecraft Live March 2026', new Date('2026-03-21T10:00:00')],
		['OC District Event', new Date('2026-04-02T08:00:00')],
		['SoCal District Championships', new Date('2026-04-09T08:00:00')],
		['FIRST Championships', new Date('2026-04-29T08:00:00')],
		['Class of 2026 Graduation', new Date('2026-06-11T00:00:00')],
		['Y2K38', new Date('2038-01-19T03:14:08')],
		['2045 US Eclipse', new Date('2045-08-12T08:12:00')],
	] as [name: string, start: Date][], []);

	const URIchosen = useMemo(() => {
		if (typeof window === 'undefined') return undefined;
		const search = window.location.hash.substring(1);
		const index = timeOptions.findIndex(e => e[0].toLowerCase().replaceAll(' ', '-') === search);
		return (index === -1) ? undefined : index
	}, []);
	
	const [chosenTime, setChosenTime] = useLocalStorageState(URIchosen ?? 0, 'chosenTime', URIchosen !== undefined);
	
	if (!(chosenTime in timeOptions)) {
		setChosenTime(0);
	}
	
	const targetTime = useMemo(() => timeOptions[chosenTime] ?? timeOptions[0], [timeOptions, chosenTime]);
	
	const handleSetTime = (index: number) => {
		setChosenTime(index);
		window.location.hash = timeOptions[index][0].toLowerCase().replaceAll(' ', '-');
	}

	return <main>
		<div class="center">
			<Timer targetTime={targetTime[1]} />
			<span class="subtitle">until</span>
			<Dropdown options={timeOptions} value={chosenTime} onInput={handleSetTime}>{(option) => (
				// <div class="option">
				// 	<div>{option[0]}</div>
				// 	<div>{formatDate(option[1], dateFormats[chosenFormat])}</div>
				// </div>
				<>
					{option[0]}{' '}
					<span class="fade">{formatDate(option[1], dateFormats[chosenFormat])}</span>
				</>
			)}</Dropdown>
		</div>
		<div class="corner">
			<Dropdown options={dateFormats} value={chosenFormat} onInput={setChosenFormat}>{(option) => (
				option({
					year: 'YYYY',
					month: 'MM',
					day: 'DD',
					hour: 'hh',
					hr12: 'hh',
					minute: 'mm',
					ampm: 'A/P'
				})
			)}</Dropdown>
		</div>
	</main>;
}

export { App };
