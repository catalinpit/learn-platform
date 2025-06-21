import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

export const fetchUser = createServerFn({ method: "GET" }).handler(async () => {
  // Make a direct fetch to your session API endpoint instead of using getSession
  const request = getWebRequest();

  try {
    const url = new URL(request.url);

    const response = await fetch(`${url.origin}/api/auth/get-session`, {
      headers: {
        cookie: request.headers.get("cookie") || ""
      }
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
        
    return data;
  } catch (error) {
    console.error("Error fetching user session:", error);
    return null;
  }
});
