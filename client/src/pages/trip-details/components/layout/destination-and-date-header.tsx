import { format } from "date-fns";
import { Calendar, MapPin, Settings2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../../components/button";
import { api } from "../../../../lib/axios";

interface Trip {
	id: string;
	destination: string;
	starts_at: string;
	ends_at: string;
	is_confirmed: boolean;
}

export function DestinationAndDateHeader({}) {
	const { tripId } = useParams();
	const [trip, setTrip] = useState<Trip | undefined>(undefined);

	useEffect(() => {
		api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip));
	}, [tripId]);

	const displayedDate = trip
		? format(trip.starts_at, "d' de 'LLL")
				.concat(" até ")
				.concat(format(trip.ends_at, "d' de 'LLL"))
		: null;

	return (
		<header className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
			<div className="flex items-center gap-2">
				<MapPin className="size-5 text-zinc-400" />
				<h1 className="text-lg text-zinc-100">{trip?.destination}</h1>
			</div>
			<div className="flex items-center gap-5">
				<div className="flex items-center gap-2">
					<Calendar className="size-5 text-zinc-400" />
					<h1 className="text-lg text-zinc-100">{displayedDate}</h1>
				</div>

				<div className="w-px h-6 bg-zinc-800"></div>

				<Button variant="secondary">
					Alterar local/data
					<Settings2 className="size-5" />
				</Button>
			</div>
		</header>
	);
}