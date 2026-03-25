import { ENVIRONTMENT } from "../../config/environment.config";

const authRoute = `${ENVIRONTMENT.URL_BACKEND}/api/auth`;

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response_http = await fetch(`${authRoute}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const response = await response_http.json();
  return response;
}

export async function register({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const response_http = await fetch(`${authRoute}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const response = await response_http.json();
  return response;
}

export async function verifyEmail({ token }: { token: string }) {
  const response_http = await fetch(
    `${authRoute}/verify-email?verify_email_token=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    },
  );

  const response = await response_http.json();
  return response;
}

export async function requestResetPassword({ email }: { email: string }) {
  const response_http = await fetch(`${authRoute}/request-password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  const response = await response_http.json();
  return response;
}

export async function resetPassword({
  password,
  token,
}: {
  password: string;
  token: string;
}) {
  const response_http = await fetch(`${authRoute}/reset-password?reset_password_token=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
    }),
  });

  const response = await response_http.json();
  return response;
}