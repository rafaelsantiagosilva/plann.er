import { X, AtSign, Plus } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../../../components/button";

interface InviteGuestsModalProps {
	closeGuestsModal: () => void;
	emailsToInvite: string[];
	addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
	removeEmailFromInvites: (email: string) => void;
}

export function InviteGuestsModal({
	closeGuestsModal,
	emailsToInvite,
	addNewEmailToInvite,
	removeEmailFromInvites,
}: InviteGuestsModalProps) {
	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
			<div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
				<header className="flex items-center justify-between">
					<h2 className="text-lg font-semibold">Selecionar convidados</h2>
					<button>
						<X onClick={closeGuestsModal} className="size-5 text-zinc-400" />
					</button>
				</header>

				<p className="text-sm text-zinc-400 mt-2">
					Os convidados irão receber e-mails para confirmar a participação na viagem.
				</p>

				<section className="flex flex-wrap gap-2">
					{emailsToInvite.map((email) => {
						return (
							<div
								key={email}
								className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
							>
								<span className="text-zinc-300">{email}</span>
								<button
									onClick={() => {
										removeEmailFromInvites(email);
									}}
									type="button"
								>
									<X className="size-5 text-zinc-400" />
								</button>
							</div>
						);
					})}
				</section>

				<div className="w-full h-px bg-zinc-800"></div>

				<form
					onSubmit={(e) => {
						addNewEmailToInvite(e);
					}}
					className="p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2"
				>
					<div className="px-2 flex items-center flex-1 gap-2">
						<AtSign className="size-5 text-zinc-400" />
						<input
							type="email"
							name="email"
							placeholder="Digite o e-mail do convidado"
							className="flex-1 bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
						/>
					</div>

					<Button type="submit">
						Convidar
						<Plus className="size-5 text-lime-950" />
					</Button>
				</form>
			</div>
		</div>
	);
}
