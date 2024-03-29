import qs from "qs";

const cmsBaseUrl = process.env.CMS_URL!;

async function fetcher<T>(url: string, paramsObject: object = {}): Promise<T> {
  const paramsString = qs.stringify(paramsObject, { encodeValuesOnly: true });
  const path = `${url}?${paramsString}`;
  const response = await fetch(
    url.startsWith("/") ? cmsBaseUrl.concat(path) : path,
    {
      headers: {
        Authorization: `Bearer ${process.env.CMS_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    if (process.env.NODE_ENV === "development") {
      console.error(response);
    }

    throw new Error(response.statusText);
  }

  return response.json() as Promise<T>;
}

export { fetcher };
