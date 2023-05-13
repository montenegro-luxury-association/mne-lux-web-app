import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// NOTE: The 'favorites' array perhaps feels a bit out of place here, but I also don't feel like
// creating a whole new context or implementing a mobx store for it
type AuthContextUser = { id: string; favorites: string[] } | undefined;

type AuthContext = {
	user: AuthContextUser;
	loginUser: (user: AuthContextUser) => void;
	logoutUser: () => void;
	updateUserFavorites: (newFavorites: string[]) => void;
	isLoading?: boolean;
};

// TODO: Make this work for admins
type AuthStatusResponse =
	// TODO: Make a clearer definition of this 'status' field
	| { status: "unauthorized"; user: undefined }
	| { status: undefined; user: NonNullable<AuthContextUser> };

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
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchAndSetUserAuthData();
	}, []);

	async function fetchAndSetUserAuthData() {
		setIsLoading(true);
		try {
			const response = await axios.get<AuthStatusResponse>("/auth/status");

			if (response.data.status !== "unauthorized" && response.data.user.id) {
				setUserAuthData(response.data.user);
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
		setUserAuthData(undefined);
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
			value={{ user: userAuthData, isLoading, loginUser, logoutUser, updateUserFavorites }}>
			{children}
		</AuthContext.Provider>
	);
}
