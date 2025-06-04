"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/Input";
import RoleToggle from "@/components/auth/RoleToggle";
import ConnectWalletButton from "@/components/auth/ConnectWalletButton";
import { RiArrowRightLine } from "@remixicon/react";

export default function LoginPage() {
	const [role, setRole] = useState<"investor" | "startup">("investor");
	const [nickname, setNickname] = useState("");

	return (
		<div className="space-y-6">
			<RoleToggle selectedRole={role} onRoleChange={setRole} />

			<div className="space-y-4">
				<ConnectWalletButton />

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