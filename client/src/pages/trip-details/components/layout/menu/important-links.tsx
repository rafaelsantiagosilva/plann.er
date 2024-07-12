import { Link2, Plus } from "lucide-react";
import { Button } from "../../../../../components/button";

export function ImportantLinks() {
	return (
		<section className="space-y-6">
			<h2 className="font-semibold text-xl">Links Importantes</h2>
			<ul className="space-y-5">
				<li className="flex items-center justify-between gap-4">
					<div className="space-y-1.5">
						<h3 className="font-medium text-zinc-100">Reserva do AirBnB</h3>
						<a
							href="#"
							className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
						>
							https://www.airbnb.com.br/rooms/10470001
						</a>
					</div>
					<Link2 className="text-zinc-400 size-5 shrink-0" />
				</li>

				<li className="flex items-center justify-between gap-4">
					<div className="space-y-1.5">
						<h3 className="font-medium text-zinc-100">Reserva do AirBnB</h3>
						<a
							href="#"
							className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
						>
							https://www.airbnb.com.br/rooms/10470001
						</a>
					</div>
					<Link2 className="text-zinc-400 size-5 shrink-0" />
				</li>
			</ul>

			<Button variant="secondary" size="full" type="button">
				<Plus className="size-5" />
				Cadastrar novo link
			</Button>
		</section>
	);
}
