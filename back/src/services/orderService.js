import { supabase } from "../../supabase";

export async function AddProduct(gusto, amount) {
  const { data, error } = await supabase
    .from("order")
    .update({ cantidad: amount })
    .eq("gusto", gusto);

  if (error) {
    console.error("No se pudo añadir el producto");
  }
  console.log("Producto añadido");
}

export async function GetOrder() {
  const { data, error } = await supabase.from("order").select("*");
}
