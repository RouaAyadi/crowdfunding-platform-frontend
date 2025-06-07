"use client";
import { useState } from "react";
import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";
import { useAuth } from "@/contexts/AuthContext";
import { Roles } from "@/types/roles";
import RoleToggle from "@/components/auth/RoleToggle";
import ConnectWalletButton from "@/components/auth/ConnectWalletButton";

export default function LoginPage() {
	const { login, error, loading } = useAuth();
	const [role, setRole] = useState<Roles>(Roles.INVESTOR);

	const handleLogin = async () => {
		try {
			await login();
		} catch (error) {
			// Error is already handled in the auth context
			console.error(error);
		}
	};

	return (
		<div className="space-y-6">
			<RoleToggle selectedRole={role} onRoleChange={setRole} />

			<div className="space-y-4">
				<ConnectWalletButton />
				<button
					onClick={handleLogin}
					disabled={loading}
					className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{loading ? 'Logging in...' : 'Login'}
				</button>

				{error && (
					<p className="text-red-500 text-sm text-center">{error}</p>
				)}
			</div>

			<div className="text-center space-y-4">
				<p className="text-text-secondary">
					Don't have an account?{" "}
					<Link
						href="/register"
						className="text-primary hover:text-primary/90 font-medium"
					>
						Register here
						<RiArrowRightLine className="inline-block ml-1 size-4" />
					</Link>
				</p>
			</div>
		</div>
	);
} 