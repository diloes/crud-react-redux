import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { useUserActions } from "../hooks/useUserActions";

export function CreateNewUser() {
	const { addUser } = useUserActions();
	const [result, setResult] = useState<"ok" | "error" | null>(null); // para manejar errores

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setResult(null);

		const data = new FormData(event.currentTarget);

		const name = data.get("name") as string;
		const email = data.get("email") as string;
		const github = data.get("github") as string;

		// Validaciones
		if (!name || !email || !github) {
			setResult("error");
			return;
		}

		addUser({ name, email, github });
		setResult("ok");
		// resetear formularo
		event.currentTarget.reset();
	};

	return (
		<Card style={{ marginTop: "16px" }}>
			<Title>Crear nuevo usuario</Title>
			<form onSubmit={handleSubmit}>
				<TextInput name='name' placeholder="Aquí el nombre" />
				<TextInput name='email' placeholder="Aquí el email" />
				<TextInput name='github' placeholder="Aquí el usuario de GitHub" />

				<div>
					<Button type="submit" style={{ marginTop: "16px" }}>
						Crear usuario
					</Button>
					<span style={{ marginLeft: "0.5rem" }}>
						{result === "ok" && <Badge color="green">Usuario creado</Badge>}
						{result === "error" && (
							<Badge color="red">Error al crear usuario</Badge>
						)}
					</span>
				</div>
			</form>
		</Card>
	);
}
