import { redirect } from "next/navigation";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcrypt";

async function actualizarUsuario(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));
  const correo = formData.get("correo") as string;
  const password = formData.get("password") as string;

  if (!id || !correo) {
    return;
  }

  const datosActualizar: { correo: string; password?: string } = {
    correo,
  };

  // Solo actualiza la contraseña si el campo no vino vacío
  if (password && password.trim() !== "") {
    datosActualizar.password = await bcrypt.hash(password, 10);
  }

  await prisma.usuario.update({
    where: {
      id,
    },
    data: datosActualizar,
  });

  // Redirige al listado tras guardar los cambios
  redirect("/gestion-usuarios?success=Usuario+actualizado+correctamente");
}

export default async function EditarUsuarioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const usuario = await prisma.usuario.findUnique({
    where: {
      id: Number(id),
    },
  });

  // Si no se encuentra el usuario, redirige a la lista
  if (!usuario) {
    redirect("/gestion-usuarios");
  }

  return (
    <main>
      <h1>Editar Usuario</h1>

      <form action={actualizarUsuario}>
        <input
          type="hidden"
          name="id"
          value={usuario.id}
        />

        <div>
          <label htmlFor="correo">Correo</label>
          <input
            id="correo"
            name="correo"
            type="email"
            defaultValue={usuario.correo}
            required
          />
        </div>

        <div>
          <label htmlFor="password">
            Nueva Contraseña (dejar vacío para no cambiarla)
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Solo completar si querés cambiarla"
          />
        </div>

        <button type="submit">
          Guardar Cambios
        </button>
      </form>
    </main>
  );
}