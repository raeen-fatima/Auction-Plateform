// export const fetchUserProfile = async (token) => {
//   try {
//     const response = await fetch("http://localhost:4001/api/users/profile", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch profile");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     return null;
//   }
// };
