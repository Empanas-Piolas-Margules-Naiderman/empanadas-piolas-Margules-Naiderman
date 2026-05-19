import { supabase } from "../../supabase";

export async function CreateUser(password, name) {
  const registered;
  const { data, error } = await supabase.from("users").insert({
    name: name,
    password: password,
  });
  if (error) {
    console.error("Failed to create user");
    registered = false;
    return [registered];
  }
  console.log("User created");
  registered = true;
  return [registered];
}

export async function LoginUser(password, name) {
  const isloggedin;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("name", name);
  if (error) {
    console.error("Account doesn't exist");
    isloggedin = false;
    return ["No existe la cuenta", isloggedin];
  }
  isloggedin = true;
  return ["Succesfully logged in", isloggedin];
}
