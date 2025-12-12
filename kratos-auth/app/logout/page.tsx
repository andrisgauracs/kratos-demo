// Copyright © 2024 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { redirect } from "next/navigation";

export default async function LogoutPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const token = params?.token;

  if (!token || typeof token !== "string") {
    // No logout token provided, redirect to login
    redirect("/login");
  }

  const kratosUrl = process.env.NEXT_PUBLIC_ORY_SDK_URL;

  if (!kratosUrl) {
    throw new Error("NEXT_PUBLIC_ORY_SDK_URL not set");
  }

  try {
    // Call the logout API with the token
    const response = await fetch(
      `${kratosUrl}self-service/logout?token=${token}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (response.ok) {
      // Logout successful, redirect to login
      redirect("/login");
    }
  } catch (error) {
    console.error("Logout error:", error);
  }

  // Fallback redirect on error
  redirect("/login");
}
