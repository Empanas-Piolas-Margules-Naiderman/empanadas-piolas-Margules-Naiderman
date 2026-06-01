import { supabase } from "../../supabase.js";

export async function getUsers() {
  const { data, error } = await supabase
    .from("users")
    .select("id,name")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getUserById(id) {
  const { data, error } = await supabase
    .from("users")
    .select("id,name")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function loginUser({ name, password }) {
  const { data, error } = await supabase
    .from("users")
    .select("id,name")
    .eq("name", name)
    .eq("password", password)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function createUser({ name, password }) {
  const { data, error } = await supabase
    .from("users")
    .insert({ name, password })
    .select("id,name")
    .single();

  if (error) throw error;
  return data;
}

export async function updateUser(id, { name, password }) {
  const values = {};

  if (name !== undefined) values.name = name;
  if (password !== undefined) values.password = password;

  const { data, error } = await supabase
    .from("users")
    .update(values)
    .eq("id", id)
    .select("id,name")
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function deleteUser(id) {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", id)
    .select("id,name")
    .maybeSingle();

  if (error) throw error;
  return data;
}
