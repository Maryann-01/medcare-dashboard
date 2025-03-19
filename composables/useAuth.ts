// composables/useAuth.ts
export const useAuth = (): { login: () => Promise<boolean> } => {
  const login = async (): Promise<boolean> => {
    try {
      const response = await fetch("https://testdrive.kompletecare.com/graphql", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `mutation { 
            login(email: "tester@kompletecare.com", password: "password") 
          }`
        })
      });

      const { data, errors } = await response.json();
      
      if (errors) throw new Error(errors[0].message);
      if (!data?.login) throw new Error("No token received");

      localStorage.setItem("authToken", data.login);
      return true;
      
    } catch (error) {
      console.error("Login Error:", error);
      localStorage.removeItem("authToken");
      return false;
    }
  };


  return { login };
};