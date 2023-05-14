import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContextProvider";

// TODO: get this to work
export default function AdminRoute(props: React.ComponentProps<typeof Route>) {
	const { admin, isLoading } = useAuthContext();

	if (isLoading) {
		return (
			<div className="vh-100 w-100 d-flex flex-column align-items-center justify-content-center">
				<h4 className="text-center">Loading...</h4>
			</div>
		);
	}

	if (!admin) {
		return <Navigate to="/" />;
	}

	return <Route {...props} />;
}
