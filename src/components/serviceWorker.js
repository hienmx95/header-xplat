function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const publicVapidKey =
  "BNvAjcpe8aD1M9IksIM_9nK5xfFRzUsSMCol31c2kTAfkFP1dGbIPPcYYi-Co3dqyCq7lVs53RdRi2SEwtu0iQ8";

async function register() {
  console.log("navigator: ", navigator);
  if ("serviceWorker" in navigator) {
    const register = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });

    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    const token = localStorage.getItem("token");
    await fetch(process.env.REACT_APP_FWORK_API_ENDPOINT + "/notification/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json",
        access_token: token,
      },
    });
  } else {
    console.error("Service workers are not supported in this browser");
  }
}

export { register };
