import { useState } from "react";

import { CreateActivityModal } from "./components/modals/create-activity-modal";
import { ImportantLinks } from "./components/layout/menu/important-links";
import { Guests } from "./components/layout/menu/guests";
import { DestinationAndDateHeader } from "./components/layout/destination-and-date-header";
import { Activities } from "./components/activities";

export function TripDetailsPage() {
	const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
		useState(false);

	const openCreateActivityModal = () => {
		setIsCreateActivityModalOpen(true);
	};

	const closeCreateActivityModal = () => {
		setIsCreateActivityModalOpen(false);
	};

	return (
		<div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
			<DestinationAndDateHeader />
			<main className="flex gap-16 px-4">
				<Activities openCreateActivityModal={openCreateActivityModal} />
				<menu className="w-80 space-y-6">
					<ImportantLinks />
					<div className="w-full h-px bg-zinc-800"></div>
					<Guests />
				</menu>
			</main>
			{isCreateActivityModalOpen && (
				<CreateActivityModal closeCreateActivityModal={closeCreateActivityModal} />
			)}
		</div>
	);
}
