// app/dashboard/new/getUserAction.ts
"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getUserAction() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return user;
}