import {
  deleteCookie,
  getTokens,
  refreshAccessToken,
  storeCookie,
} from "@/lib/auth/actions";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL + "/api/v1";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxyRequest(request, (await params).path);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxyRequest(request, (await params).path);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxyRequest(request, (await params).path);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxyRequest(request, (await params).path);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxyRequest(request, (await params).path);
}

async function handleProxyRequest(
  request: NextRequest,
  pathSegments: string[]
) {
  const { accessToken, refreshToken } = await getTokens();

  const urlPath = pathSegments.join("/");
  const targetUrl = `${API_URL}/${urlPath}${request.nextUrl.search}`;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete("host");

  if (accessToken) {
    requestHeaders.set("Authorization", `Bearer ${accessToken}`);
  }

  let response = await fetch(targetUrl, {
    method: request.method,
    headers: requestHeaders,
    body:
      request.method === "GET" || request.method === "HEAD"
        ? undefined
        : await request.arrayBuffer(),
  });

  // Handle 401 Unauthorized - attempt to refresh token
  if (response.status === 401) {
    if (!refreshToken) {
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");

      return new NextResponse(
        JSON.stringify({
          message: "Authentication failed. Please login again.",
        }),
        { status: 401 }
      );
    }

    console.log("Access token expired or invalid. Attempting to refresh...");
    const newAccessToken = await refreshAccessToken(); // This refreshes and sets new cookies

    if (newAccessToken) {
      console.log("Token refreshed successfully. Retrying request.");

      // Update authorization header with new token
      requestHeaders.set("Authorization", `Bearer ${newAccessToken}`);
      // Retry the original request with the new token
      response = await fetch(targetUrl, {
        method: request.method,
        headers: requestHeaders,
        body:
          request.method === "GET" || request.method === "HEAD"
            ? undefined
            : await request.arrayBuffer(),
        duplex: "half",
      } as RequestInit);

      await storeCookie({
        name: "accessToken",
        value: newAccessToken || "",
        maxAge: 60 * 60, // 1 hour
      });
    } else {
      console.log("Refresh token failed. Redirecting to login.");
      // If refresh failed, the `refreshAccessTokenServer` action already handled redirecting to login.
      // We return a 401 here so RTK Query client-side can also react (e.g., clear its cache).

      NextResponse.redirect(new URL("/login", request.url));

      return new NextResponse(
        JSON.stringify({
          message: "Authentication failed. Please login again.",
        }),
        { status: 401 }
      );
    }
  }

  // Forward the backend response to the client
  const responseBody = await response.arrayBuffer();
  const res = new NextResponse(responseBody, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });

  return res;
}
