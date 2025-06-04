"use client";
import { RiUserLine, RiBuilding3Line } from "@remixicon/react";

type Role = "investor" | "startup";

export default function RoleToggle({
	selectedRole,
	onRoleChange,
}: {
	selectedRole: Role;
	onRoleChange: (role: Role) => void;
}) {
	return (
		<div className="flex p-1 gap-1 bg-text-secondary/10 rounded-lg">
			<button
				className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
					selectedRole === "investor"
						? "bg-white text-primary shadow-sm"
						: "text-text-secondary hover:text-text-primary"
				}`}
				onClick={() => onRoleChange("investor")}
			>
				<RiUserLine className="size-5" />
				<span>Investor</span>
			</button>
			<button
				className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
					selectedRole === "startup"
						? "bg-white text-primary shadow-sm"
						: "text-text-secondary hover:text-text-primary"
				}`}
				onClick={() => onRoleChange("startup")}
			>
				<RiBuilding3Line className="size-5" />
				<span>Startup</span>
			</button>
		</div>
	);
} 