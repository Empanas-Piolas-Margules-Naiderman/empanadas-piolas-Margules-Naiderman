import { supabase } from "../../supabase.js";

export async function getUsers() {
  const { data, error } = await supabase
    .from("users")
    .select("id,nombre,apellido")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getUserById(id) {
  const { data, error } = await supabase
    .from("users")
    .select("id,nombre,apellido")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function createUser({ nombre, apellido }) {
  const { data, error } = await supabase
    .from("users")
    .insert({ nombre, apellido })
    .select("id,nombre,apellido")
    .single();

  if (error) throw error;
  return data;
}

export async function updateUser(id, { nombre, apellido }) {
  const values = {};

  if (nombre !== undefined) values.nombre = nombre;
  if (apellido !== undefined) values.apellido = apellido;

  const { data, error } = await supabase
    .from("users")
    .update(values)
    .eq("id", id)
    .select("id,nombre,apellido")
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function deleteUser(id) {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", id)
    .select("id,nombre,apellido")
    .maybeSingle();

  if (error) throw error;
  return data;
}
