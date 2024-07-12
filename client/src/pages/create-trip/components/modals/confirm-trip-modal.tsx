import { ArrowRight, Mail, User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../../../components/button";

interface ConfirmTripModalInterface {
	closeConfirmTripModal: () => void;
	createTrip: (event: FormEvent<HTMLFormElement>) => void;
	setOwnerName: (ownerName: string) => void;
	setOwnerEmail: (ownerEmail: string) => void;
}

export function ConfirmTripModal({
	closeConfirmTripModal,
	createTrip,
	setOwnerName,
	setOwnerEmail,
}: ConfirmTripModalInterface) {
	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
			<div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
				<header className="flex items-center justify-between">
					<h2 className="text-lg font-semibold">Confirmar criação de viagem</h2>
					<button>
						<X onClick={closeConfirmTripModal} className="size-5 text-zinc-400" />
					</button>
				</header>

				<p className="text-sm text-zinc-400 mt-2">
					Para concluir a criação da viagem para{" "}
					<strong className="text-zinc-100">Florianópolis, Brasil</strong> nas datas
					de <strong className="text-zinc-100">16 a 27 de Agosto de 2024</strong>{" "}
					preencha seus dados abaixo:
				</p>

				<form onSubmit={createTrip} className="space-y-3">
					<div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center flex-1 gap-2">
						<User className="size-5 text-zinc-400" />
						<input
							type="text"
							name="name"
							placeholder="Seu nome completo"
							className="flex-1 bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
							onChange={(event) => {
								setOwnerName(event.target.value);
							}}
						/>
					</div>

					<div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center flex-1 gap-2">
						<Mail className="size-5 text-zinc-400" />
						<input
							type="email"
							name="email"
							placeholder="Seu e-mail pessoal"
							className="flex-1 bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
							onChange={(event) => {
								setOwnerEmail(event.target.value);
							}}
						/>
					</div>

					<Button variant="primary" size="full" type="submit">
						Continuar
						<ArrowRight className="size-5 text-lime-950" />
					</Button>
				</form>
			</div>
		</div>
	);
}
