import { ref, onMounted } from "vue";

export const useAuth = () => {
  const token = ref<string | null>(null);

  onMounted(() => {
    token.value = localStorage.getItem("authToken");
  });

  const login = async (): Promise<void> => {
    try {
      const response = await fetch("https://testdrive.kompletecare.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          email: "tester@kompletecare.com",
          password: "password",
        }),
      });

      const data = await response.json();
      console.log("API Response:", data);  // 🔥 Debugging: See full API response

      if (data.success && data.data.token) {  // ✅ Correctly accessing the token now!
        token.value = data.data.token;
        localStorage.setItem("authToken", data.data.token);
        console.log("Token saved:", data.data.token);
      } else {
        console.error("Login failed: No token received.");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return { token, login };
};
