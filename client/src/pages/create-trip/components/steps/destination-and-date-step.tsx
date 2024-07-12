import { format } from "date-fns";
import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "../../../../components/button";
import { ptBR } from "date-fns/locale";

interface DestinationAndDateStepProps {
	isGuestsInputOpen: boolean;
	closeGuestsInput: () => void;
	openGuestsInput: () => void;
	setDestination: (destination: string) => void;
	eventStartAndEndDates: DateRange | undefined;
	setEventStartAndEndDates: (
		eventStartAndEndDates: DateRange | undefined
	) => void;
}

export function DestinationAndDateStep({
	isGuestsInputOpen,
	closeGuestsInput,
	openGuestsInput,
	setDestination,
	eventStartAndEndDates,
	setEventStartAndEndDates,
}: DestinationAndDateStepProps) {
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

	const openDatePicker = () => {
		setIsDatePickerOpen(true);
	};

	const closeDatePicker = () => {
		setIsDatePickerOpen(false);
	};

	const displayedDate =
		eventStartAndEndDates &&
		eventStartAndEndDates.from &&
		eventStartAndEndDates.to
			? format(eventStartAndEndDates.from, "d' de 'LLL", {locale: ptBR})
					.concat(" até ")
					.concat(format(eventStartAndEndDates.to, "d' de 'LLL", {locale: ptBR}))
			: null;

	return (
		<div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3  shadow-shape">
			<div className="flex items-center gap-2 flex-1">
				<MapPin className="size-5 text-zinc-400" />
				<input
					type="text"
					disabled={isGuestsInputOpen}
					placeholder="Para onde você vai?"
					className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
					onChange={(event) => setDestination(event.target.value)}
				/>
			</div>
			<button
				onClick={openDatePicker}
				disabled={isGuestsInputOpen}
				className="flex items-center text-left gap-2 w-[240px]"
			>
				<Calendar className="size-5 text-zinc-400" />
				<span className="bg-transparent text-lg text-zinc-400 w-40 outline-none flex-1">
					{displayedDate ?? "Quando?"}
				</span>
			</button>

			<div className="w-px h-6 bg-zinc-800"></div>

			{isGuestsInputOpen ? (
				<Button variant="secondary" type="button" onClick={closeGuestsInput}>
					Alterar local/data
					<Settings2 className="size-5" />
				</Button>
			) : (
				<Button variant="primary" type="button" onClick={openGuestsInput}>
					Continuar
					<ArrowRight className="size-5" />
				</Button>
			)}

			{isDatePickerOpen && (
				<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
					<div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
						<header className="flex items-center justify-between">
							<h2 className="text-lg font-semibold">Selecione a data</h2>
							<button>
								<X onClick={closeDatePicker} className="size-5 text-zinc-400" />
							</button>
						</header>

						<div className="flex justify-center">
							<DayPicker
								mode="range"
								selected={eventStartAndEndDates}
								onSelect={setEventStartAndEndDates}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
