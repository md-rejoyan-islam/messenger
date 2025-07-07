"use server";

import { cookies } from "next/headers";

const API_URL = process.env.API_URL + "/api/v1";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  //   const email = formData.get("email");
  //   const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || "Login failed." };
    }

    const data = await response.json();
    // console.log(data);

    const { accessToken, refreshToken } = data?.data || {};

    // set accessToken and refreshToken in cookies
    await storeCookie({
      name: "accessToken",
      value: accessToken,
      maxAge: 60 * 60, // 1 hour
    });
    await storeCookie({
      name: "refreshToken",
      value: refreshToken,
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An unexpected error occurred." };
  }
}

export async function logout() {
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");
}

export async function getTokens() {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  const refreshToken = cookiesStore.get("refreshToken")?.value;

  return { accessToken, refreshToken };
}

export async function refreshAccessToken(): Promise<string | null> {
  const { refreshToken } = await getTokens();

  if (!refreshToken) {
    console.log("Refresh token not found. Redirecting to login.");

    await logout();
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      console.error("Failed to refresh token:", await response.json());
      await logout();
      return null;
    }

    const data = await response.json();

    const { accessToken: newAccessToken } = data?.data || {};

    await storeCookie({
      name: "accessToken",
      value: newAccessToken,
      maxAge: 60 * 60, // 1 hour
    });

    return newAccessToken;
  } catch (error) {
    console.error("Refresh token error:", error);
    await logout();

    return null;
  }
}

export async function storeCookie({
  name,
  value,
  maxAge,
}: {
  name: string;
  value: string;
  maxAge: number;
}) {
  const cookiesStore = await cookies();
  cookiesStore.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: maxAge,
    path: "/",
  });
}

export async function deleteCookie(name: string) {
  const cookiesStore = await cookies();
  cookiesStore.delete(name);
}
