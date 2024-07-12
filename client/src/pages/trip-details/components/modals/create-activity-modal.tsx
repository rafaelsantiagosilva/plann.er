import { Calendar, Tag, X } from "lucide-react";

import { Button } from "../../../../components/button";
import { FormEvent } from "react";
import { api } from "../../../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateActivityModalProps {
	closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
	closeCreateActivityModal,
}: CreateActivityModalProps) {
	const { tripId } = useParams();

	const createActivity = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);

		const title = data.get("title")?.toString();
		const occurs_at = data.get("occurs_at")?.toString();

		await api.post(`/trips/${tripId}/activities`, {
			title,
			occurs_at,
		});

		window.document.location.reload();
	};

	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
			<div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
				<header className="flex items-center justify-between">
					<h2 className="text-lg font-semibold">Cadastrar atividade</h2>
					<button>
						<X onClick={closeCreateActivityModal} className="size-5 text-zinc-400" />
					</button>
				</header>

				<p className="text-sm text-zinc-400 mt-2">
					Todos convidados podem visualizar as atividades.
				</p>

				<form onSubmit={createActivity} className="space-y-3">
					<div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center flex-1 gap-2">
						<Tag className="size-5 text-zinc-400" />
						<input
							type="text"
							name="title"
							placeholder="Qual a atividade?"
							className="flex-1 bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
						/>
					</div>

					<div className="flex items-center gap-2">
						<div className="h-14 flex-1 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
							<Calendar className="size-5" />
							<input
								type="datetime-local"
								name="occurs_at"
								placeholder="Data e horário da atividade"
								className="[color-scheme:dark] flex-1 bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
							/>
						</div>
					</div>

					<Button variant="primary" size="full" type="submit">
						Salvar atividade
					</Button>
				</form>
			</div>
		</div>
	);
}
