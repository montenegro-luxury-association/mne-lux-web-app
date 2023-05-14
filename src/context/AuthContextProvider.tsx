import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// NOTE: The 'favorites' array perhaps feels a bit out of place here, but I also don't feel like
// creating a whole new context or implementing a mobx store for it
type AuthContextUser = { id: string; favorites: string[] } | undefined;
type AuthContextAdmin = { id: string } | undefined;

type AuthContext = {
	user: AuthContextUser;
	admin: AuthContextAdmin;
	loginUser: (user: AuthContextUser) => void;
	logoutUser: () => void;
	loginAdmin: (user: AuthContextAdmin) => void;
	logoutAdmin: () => void;
	updateUserFavorites: (newFavorites: string[]) => void;
	isLoading?: boolean;
};

type AuthStatusResponse = { user: AuthContextUser; admin: AuthContextAdmin };

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function useAuthContext() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within a AuthProvider");
	}

	return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [userAuthData, setUserAuthData] = useState<AuthContextUser>();
	const [adminAuthData, setAdminAuthData] = useState<AuthContextAdmin>();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchAndSetUserAuthData();
	}, []);

	async function fetchAndSetUserAuthData() {
		setIsLoading(true);
		try {
			const response = await axios.get<AuthStatusResponse>("/auth/status");

			if (response.data.user?.id) {
				setUserAuthData(response.data.user);
			}
			if (response.data.admin?.id) {
				setAdminAuthData(response.data.admin);
			}
		} catch (err) {
			console.error("Error getting user auth data: ", err);
		} finally {
			setIsLoading(false);
		}
	}

	function loginUser(user: AuthContextUser) {
		setUserAuthData(user);
	}

	function logoutUser() {
		// TODO: call backend to clear cookie
		setUserAuthData(undefined);
	}

	function loginAdmin(admin: AuthContextAdmin) {
		setAdminAuthData(admin);
	}

	function logoutAdmin() {
		// TODO: call backend to clear cookie
		setAdminAuthData(undefined);
	}

	function updateUserFavorites(newFavorites: string[]) {
		if (!userAuthData) {
			return;
		}

		setUserAuthData(
			prevState => ({ ...prevState, favorites: newFavorites } as AuthContextUser)
		);
	}

	return (
		<AuthContext.Provider
			value={{
				user: userAuthData,
				admin: adminAuthData,
				isLoading,
				loginUser,
				logoutUser,
				loginAdmin,
				logoutAdmin,
				updateUserFavorites
			}}>
			{children}
		</AuthContext.Provider>
	);
}
