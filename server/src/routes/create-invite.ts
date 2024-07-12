import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { link } from "fs";
import z from "zod";
import nodemailer from "nodemailer";
import { dayjs } from "../lib/dayjs";
import { getMailClient } from "../lib/mail";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";
import { env } from "../env";

export async function createInvite(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/trips/:tripId/invites",
		{
			schema: {
				params: z.object({
					tripId: z.string().uuid(),
				}),

				body: z.object({
					email: z.string().email(),
				}),
			},
		},

		async (req) => {
			const { tripId } = req.params;
			const { email } = req.body;

			const trip = await prisma.trip.findUnique({
				where: {
					id: tripId,
				},
			});

			if (!trip) throw new ClientError("Trip not found.");

			const participant = await prisma.participant.create({
				data: {
					email,
					trip_id: tripId,
				},
			});

			const formattedStartDate = dayjs(trip.starts_at).format("LL");
			const formattedEndDate = dayjs(trip.ends_at).format("LL");

			const mail = await getMailClient();

			const confirmationLink = `${env.API_BASE_URL}/participants/${participant.id}/confirm`;

			const message = await mail.sendMail({
				from: {
					name: "Equipe plann.er",
					address: "oi@plann.er",
				},

				to: participant.email,

				subject: `Confirma sua viagem para ${trip.destination} em ${formattedStartDate}`,
				html: `
					<div style="font-family: sans-serif; font-size: 16px; line-height: 1.6">
						<p>
							Você solicitou a criação de uma viagem para
							<strong>${trip.destination}</strong> nas datas de
							<strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.
						</p>
	
						<p>Para confirmar sua presença na viagem, clique no link abaixo:</p>
	
						<p><a href="${confirmationLink}">Confirmar viagem</a></p>
	
						<p>Caso você não saiba do que se trata, apenas ignore esse e-mail.</p>
					</div>
	
					
					`.trim(),
			});

			console.log(nodemailer.getTestMessageUrl(message));

			return { participantId: participant.id };
		}
	);
}