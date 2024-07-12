import nodemailer from "nodemailer";

export async function getMailClient() {
	const account = await nodemailer.createTestAccount(); // Cria um servidor de email fictício (smtp)

	const transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false,
		auth: {
			user: account.user,
			pass: account.pass,
		},
	});

     return transporter;
}
