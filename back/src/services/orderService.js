import { supabase } from "../../supabase";

export async function AddProduct(userId, empanadas) {
  const { data, error } = await supabase
    .from("pedido")
    .update({ empanadas: empanadas })
    .eq("user_id", userId);

  if (error) {
    console.error("No se pudo añadir el producto");
    return ["No se pudo añadir el producto"];
  }
  console.log("Producto añadido");
  return ["Producto añadido"];
}

export async function GetOrder() {
  const { data, error } = await supabase.from("order").select("*");
}
