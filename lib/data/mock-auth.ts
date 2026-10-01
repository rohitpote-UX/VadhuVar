// TODO: replace with real auth (NextAuth / Supabase / Clerk / Iron Session)

export const MOCK_ADMIN_CREDENTIALS = {
  email: "admin@example.com",
  password: "Admin@12345",
  name: "Radhika Kulkarni",
  role: "Principal Matchmaker",
  avatarInitials: "RK",
};

const AUTH_STORAGE_KEY = "vivaha_admin_session_v1";

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  avatarInitials: string;
}

export const mockAuth = {
  login: async (email: string, password: string): Promise<AdminUser> => {
    // Simulated auth delay
    await new Promise((resolve) => setTimeout(resolve, 350));

    if (
      email.trim().toLowerCase() ===
        MOCK_ADMIN_CREDENTIALS.email.toLowerCase() &&
      password === MOCK_ADMIN_CREDENTIALS.password
    ) {
      const user: AdminUser = {
        email: MOCK_ADMIN_CREDENTIALS.email,
        name: MOCK_ADMIN_CREDENTIALS.name,
        role: MOCK_ADMIN_CREDENTIALS.role,
        avatarInitials: MOCK_ADMIN_CREDENTIALS.avatarInitials,
      };

      if (typeof window !== "undefined") {
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      }
      return user;
    }

    throw new Error("Incorrect email or password.");
  },

  logout: async (): Promise<void> => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  },

  getSession: (): AdminUser | null => {
    if (typeof window === "undefined") return null;
    try {
      const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return mockAuth.getSession() !== null;
  },
};
