import { Plus, CircleCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ActivitiesProps {
	openCreateActivityModal: () => void;
}

interface Activity {
	date: string;
	activities: {
		id: string;
		title: string;
		occurs_at: string;
	}[];
}

export function Activities({ openCreateActivityModal }: ActivitiesProps) {
	const { tripId } = useParams();
	const [activities, setActivities] = useState<Activity[]>([]);

	useEffect(() => {
		api
			.get(`/trips/${tripId}/activities`)
			.then((response) => setActivities(response.data.activities));
	}, [tripId]);

	return (
		<div className="flex-1 space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-semibold">Atividades</h2>
				<button
					onClick={openCreateActivityModal}
					type="button"
					className="flex items-center gap-2 bg-lime-300 text-lime-950 font-medium rounded-lg px-5 py-2 hover:bg-lime-400"
				>
					<Plus className="size-5" />
					Cadastrar atividade
				</button>
			</div>

			<div className="space-y-8">
				{activities.map((category) => {
					return (
						<section key={category.date} className="space-y-2.5">
							<header className="flex gap-2 items-baseline">
								<h3 className="text-xl text-zinc-300 font-semibold">
									Dia {format(category.date, "d")}
								</h3>
								<span className="text-xs text-zinc-500">
									{format(category.date, "EEE", { locale: ptBR })}
								</span>
							</header>
							{category.activities.length > 0 ? (
								category.activities.map((activity) => {
									return (
										<div key={activity.id} className="space-y-2.5">
											<div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
												<CircleCheck className="size-5 text-lime-300" />
												<span className="text-zinc-100">{activity.title}</span>
												<span className="text-zinc-400 text-sm ml-auto">
													{format(activity.occurs_at, "HH:mm")}h
												</span>
											</div>
										</div>
									);
								})
							) : (
								<p className="text-zinc-500 text-sm">
									Nenhuma atividade cadastrada nessa data.
								</p>
							)}
						</section>
					);
				})}
			</div>
		</div>
	);
}