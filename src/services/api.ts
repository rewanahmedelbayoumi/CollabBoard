const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || ''

type RequestOptions = RequestInit & {
  token?: string
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { token, headers, ...requestOptions } = options

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...requestOptions,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
      },
    },
  )

  if (!response.ok) {
    let message = 'Something went wrong.'

    try {
      const errorData = await response.json()

      if (errorData?.message) {
        message = errorData.message
      }
    } catch {
      // Ignore invalid error responses.
    }

    throw new Error(message)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}