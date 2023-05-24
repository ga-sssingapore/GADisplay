export async function fetchData(endpoint, token, method, body) {
  const res = await fetch(import.meta.env.VITE_SERVER + endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  let returnValue = {};

  if (res.ok) {
    if (data.status === "error") {
      returnValue = { ok: false, data: data.message };
    } else {
      returnValue = { ok: true, data };
    }
  } else {
    if (data?.errors && Array.isArray(data.errors)) {
      const messages = data.errors.map((item) => item.msg);
      returnValue = { ok: false, data: messages };
    } else if (data?.status === "error") {
      returnValue = { ok: false, data: data.message };
    } else {
      console.log(data);
      returnValue = { ok: false, data: "An error has occurred" };
    }
  }
  return returnValue;
}
