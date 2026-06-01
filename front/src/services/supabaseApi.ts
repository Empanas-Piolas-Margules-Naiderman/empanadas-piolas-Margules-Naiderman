export type User = {
  id: number;
  name: string;
};

export type PedidoItem = {
  nombre: string;
  cantidad: number;
};

export type PedidoEmpanadas = {
  items: PedidoItem[];
  pago: string;
  envio: string;
  createdAt: string;
};

export type Pedido = {
  id: number;
  user_id: number;
  empanadas: PedidoEmpanadas | PedidoItem[];
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Faltan VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY");
}

const restUrl = `${supabaseUrl}/rest/v1`;

function getHeaders(extraHeaders?: HeadersInit): HeadersInit {
  return {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    "Content-Type": "application/json",
    ...extraHeaders,
  };
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${restUrl}${path}`, {
    ...options,
    headers: getHeaders(options.headers),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "No se pudo completar la operacion");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

function filterValue(value: string) {
  return encodeURIComponent(value.trim());
}

export async function loginUser(name: string, password: string): Promise<User | null> {
  const users = await request<User[]>(
    `/users?select=id,name&name=eq.${filterValue(name)}&password=eq.${filterValue(
      password,
    )}&limit=1`,
  );

  return users[0] ?? null;
}

export async function createUser(name: string, password: string): Promise<User> {
  const existingUsers = await request<User[]>(
    `/users?select=id,name&name=eq.${filterValue(name)}&limit=1`,
  );

  if (existingUsers.length > 0) {
    throw new Error("Ya existe un usuario con ese nombre");
  }

  const users = await request<User[]>("/users?select=id,name", {
    method: "POST",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify([{ name: name.trim(), password }]),
  });

  return users[0];
}

export async function createPedido(
  userId: number,
  empanadas: PedidoEmpanadas,
): Promise<Pedido> {
  const pedidos = await request<Pedido[]>("/pedido?select=id,user_id,empanadas", {
    method: "POST",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify([{ user_id: userId, empanadas }]),
  });

  return pedidos[0];
}

export async function getPedidosByUser(userId: number): Promise<Pedido[]> {
  return request<Pedido[]>(
    `/pedido?select=id,user_id,empanadas&user_id=eq.${userId}&order=id.desc`,
  );
}
