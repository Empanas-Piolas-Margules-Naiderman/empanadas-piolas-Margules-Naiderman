import { supabase } from "../../supabase";

export async function CreateUser(password, name) {
  const { data, error } = await supabase.from("users").insert({
    name: name,
    password: password,
  });
  if (error) {
    console.error("Failed to create user");
    return null;
  }
  console.log("User created");
  return [];
}

export async function LoginUser(password, name) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("name", `${name}`);
  if (error) {
    console.error("Account doesn't exist");
    return null;
  }
  return [data];
}
