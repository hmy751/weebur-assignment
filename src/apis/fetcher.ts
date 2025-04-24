export const baseURL = "https://dummyjson.com";

interface FetcherConfig {
  baseURL?: string;
  headers?: HeadersInit;
  timeout?: number;
}

interface RequestConfig extends Omit<RequestInit, "headers"> {
  headers?: HeadersInit;
  timeout?: number;
}

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string,
    public data?: unknown,
    public reset?: () => void
  ) {
    super(message);
    this.name = "APIError";
  }
}

const createAbortController = (timeout: number) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout);
  return controller;
};

const handleResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type");
  const isJSON = contentType?.includes("application/json");

  const data = isJSON ? await response.json() : await response.text();

  if (!response.ok) {
    throw new APIError(
      data.message || response.statusText,
      response.status,
      data.code || "UNKNOWN_ERROR",
      data
    );
  }

  return data;
};

const handleError = (error: unknown) => {
  if (error instanceof APIError) throw error;

  if (error instanceof Error) {
    if (error.name === "AbortError") {
      throw new APIError("요청 시간이 초과되었습니다", 408, "REQUEST_TIMEOUT");
    }
    throw new APIError("네트워크 에러가 발생했습니다", 0, "NETWORK_ERROR", error);
  }

  throw new APIError("알 수 없는 에러가 발생했습니다", 0, "UNKNOWN_ERROR", error);
};

const createHttpClient = (defaultConfig: FetcherConfig) => {
  const request = async <T>(
    url: string,
    options: RequestConfig = {}
  ): Promise<T> => {
    try {
      const finalOptions = { ...options };

      const controller = createAbortController(finalOptions.timeout || defaultConfig.timeout!);
      const fullURL = `${defaultConfig.baseURL}/${url}`;

      const response = await fetch(fullURL, {
        ...finalOptions,
        headers: {
          ...defaultConfig.headers,
          ...finalOptions.headers,
        },
        signal: controller.signal,
      });

      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  };

  return {
    get: <T>(url: string, options?: RequestConfig) =>
      request<T>(url, { ...options, method: "GET" }),

    post: <T>(url: string, data?: unknown, options?: RequestConfig) =>
      request<T>(url, {
        ...options,
        method: "POST",
        body: JSON.stringify(data),
      }),

    put: <T>(url: string, data?: unknown, options?: RequestConfig) =>
      request<T>(url, {
        ...options,
        method: "PUT",
        body: JSON.stringify(data),
      }),

    delete: <T>(url: string, options?: RequestConfig) =>
      request<T>(url, { ...options, method: "DELETE" }),
  };
};

const fetcher = createHttpClient({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default fetcher;
