function getToken(name) {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, val] = cookie.split('=');
    if (key === name) return val;
  }
  return null;
}

async function submitForm(){
    const username = document.getElementById("username").value;
    const csrfToken = getToken("csrf_token_client");

    try {
        const response = await fetch("/api/submit-form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-csrf-token": csrfToken
            },
            body: JSON.stringify({ username }),
            credentials: "include" // sends cookies with request
        });

        const data = await response.json();
    } catch (error) {
        console.error("Eror submitting form:", error);
    }

}