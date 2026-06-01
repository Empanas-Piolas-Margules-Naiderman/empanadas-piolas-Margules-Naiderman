import { supabase } from "../../supabase.js";

const ORDER_SELECT = "id,user_id,empanadas,users(id,name)";

export async function getOrders() {
  const { data, error } = await supabase
    .from("pedido")
    .select(ORDER_SELECT)
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getOrderById(id) {
  const { data, error } = await supabase
    .from("pedido")
    .select(ORDER_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getOrdersByUserId(userId) {
  const { data, error } = await supabase
    .from("pedido")
    .select(ORDER_SELECT)
    .eq("user_id", userId)
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
}

export async function createOrder({ user_id, empanadas }) {
  const { data, error } = await supabase
    .from("pedido")
    .insert({ user_id, empanadas })
    .select(ORDER_SELECT)
    .single();

  if (error) throw error;
  return data;
}

export async function updateOrder(id, { user_id, empanadas }) {
  const values = {};

  if (user_id !== undefined) values.user_id = user_id;
  if (empanadas !== undefined) values.empanadas = empanadas;

  const { data, error } = await supabase
    .from("pedido")
    .update(values)
    .eq("id", id)
    .select(ORDER_SELECT)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function deleteOrder(id) {
  const { data, error } = await supabase
    .from("pedido")
    .delete()
    .eq("id", id)
    .select(ORDER_SELECT)
    .maybeSingle();

  if (error) throw error;
  return data;
}
