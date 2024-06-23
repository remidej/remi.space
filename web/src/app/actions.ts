"use server";

import { revalidatePath } from "next/cache";
import { draftMode } from "next/headers";

export async function clearDraftMode() {
  draftMode().disable();
  revalidatePath("/", "layout");
}
