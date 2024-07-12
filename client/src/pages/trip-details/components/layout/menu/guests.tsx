import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../../../components/button";
import { api } from "../../../../../lib/axios";

interface Participant {
	id: string;
	name: string | null;
	email: string;
	is_confirmed: boolean;
}

export function Guests() {
	const { tripId } = useParams();
	const [participants, setParticipants] = useState<Participant[]>([]);

	useEffect(() => {
		api
			.get(`/trips/${tripId}/participants`)
			.then((response) => setParticipants(response.data.participants));
	}, [tripId]);

	return (
		<section className="space-y-6">
			<h2 className="font-semibold text-xl">Convidados</h2>
			<ul className="space-y-5">
				{participants.map((participant, index) => {
					return (
						<li
							key={participant.id}
							className="flex items-center justify-between gap-4"
						>
							<div className="space-y-1.5">
								<h3 className="font-medium text-zinc-100">{participant.name ?? `Convidado ${index}`}</h3>
								<span className="block text-sm text-zinc-400 truncate">
									{participant.email}
								</span>
							</div>
							{participant.is_confirmed ? (
								<CircleCheck className="size-5 text-lime-300 shrink-0" />
							) : (
								<CircleDashed className="text-zinc-400 size-5 shrink-0" />
							)}
						</li>
					);
				})}
			</ul>
			<Button variant="secondary" size="full" type="button">
				<UserCog className="size-5" />
				Gerenciar convidados
			</Button>
		</section>
	);
}
