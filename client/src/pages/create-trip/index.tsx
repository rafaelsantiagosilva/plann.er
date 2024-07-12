import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { InviteGuestsModal } from "./components/modals/invite-guests-modal";
import { ConfirmTripModal } from "./components/modals/confirm-trip-modal";
import { DestinationAndDateStep } from "./components/steps/destination-and-date-step";
import { InviteGuestsStep } from "./components/steps/invite-guests-step";
import { TermsOfUseAndPrivacyPolicies } from "./components/terms-of-use-and-privacy-policies";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTripPage() {
	const navigate = useNavigate();

	const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
	const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
	const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

	const [destination, setDestination] = useState("");
	const [ownerName, setOwnerName] = useState("");
	const [ownerEmail, setOwnerEmail] = useState("");
	const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
		DateRange | undefined
	>();

	const [emailsToInvite, setEmailsToInvite] = useState([
		"diego@rocketseat.com.br",
		"john@acme.com",
	]);

	const openGuestsInput = () => {
		setIsGuestsInputOpen(true);
	};

	const closeGuestsInput = () => {
		setIsGuestsInputOpen(false);
	};

	const openGuestsModal = () => {
		setIsGuestsModalOpen(true);
	};

	const closeGuestsModal = () => {
		setIsGuestsModalOpen(false);
	};

	const openConfirmTripModal = () => {
		setIsConfirmTripModalOpen(true);
	};

	const closeConfirmTripModal = () => {
		setIsConfirmTripModalOpen(false);
	};

	const addNewEmailToInvite = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const email = data.get("email")?.toString();

		if (!email) return;

		if (emailsToInvite.includes(email)) return;

		setEmailsToInvite([...emailsToInvite, email]);

		event.currentTarget.reset();
	};

	const removeEmailFromInvites = (emailToRemove: string) => {
		const newEmailList = emailsToInvite.filter(
			(email) => email !== emailToRemove
		);

		setEmailsToInvite(newEmailList);
	};

	const createTrip = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(destination);
		console.log(eventStartAndEndDates);
		console.log(ownerEmail);
		console.log(ownerName);
		console.log(emailsToInvite);

		if (!destination) return;

		if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) return;

		if (emailsToInvite.length === 0) return;

		if (!ownerName || !ownerEmail) return;

		const response = await api.post("/trips", {
			destination: destination,
			starts_at: eventStartAndEndDates.from,
			ends_at: eventStartAndEndDates.to,
			emails_to_invite: emailsToInvite,
			owner_name: ownerName,
			owner_email: ownerEmail,
		});

		const { tripId } = response.data;

		navigate(`/trips/${tripId}`);
	};

	return (
		<div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
			<div className="max-w-3xl w-full px-6 text-center space-y-10">
				<header className="flex flex-col items-center gap-3">
					<img src="/logo.svg" alt="planner" />
					<p className="text-zinc-300 text-lg">
						Convide seus amigos e planeje sua próxima viagem!
					</p>
				</header>

				<DestinationAndDateStep
					isGuestsInputOpen={isGuestsInputOpen}
					closeGuestsInput={closeGuestsInput}
					openGuestsInput={openGuestsInput}
					setDestination={setDestination}
					eventStartAndEndDates={eventStartAndEndDates}
					setEventStartAndEndDates={setEventStartAndEndDates}
				/>

				<div className="space-y-4">
					{isGuestsInputOpen && (
						<InviteGuestsStep
							openGuestsModal={openGuestsModal}
							emailsToInvite={emailsToInvite}
							openConfirmTripModal={openConfirmTripModal}
						/>
					)}
				</div>

				<TermsOfUseAndPrivacyPolicies />
			</div>

			{isGuestsModalOpen && (
				<InviteGuestsModal
					emailsToInvite={emailsToInvite}
					addNewEmailToInvite={addNewEmailToInvite}
					closeGuestsModal={closeGuestsModal}
					removeEmailFromInvites={removeEmailFromInvites}
				/>
			)}

			{isConfirmTripModalOpen && (
				<ConfirmTripModal
					closeConfirmTripModal={closeConfirmTripModal}
					createTrip={createTrip}
					setOwnerName={setOwnerName}
					setOwnerEmail={setOwnerEmail}
				/>
			)}
		</div>
	);
}
