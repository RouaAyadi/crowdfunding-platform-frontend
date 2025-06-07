"use client";
import { RiUserLine, RiBuilding3Line } from "@remixicon/react";
import { Roles } from "@/types/roles";

interface RoleToggleProps {
	selectedRole: Roles;
	onRoleChange: (role: Roles) => void;
}

export default function RoleToggle({
	selectedRole,
	onRoleChange,
}: RoleToggleProps) {
	return (
		<div className="flex p-1 gap-1 bg-text-secondary/10 rounded-lg">
			<button
				className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
					selectedRole === Roles.INVESTOR
						? "bg-white text-primary shadow-sm"
						: "text-text-secondary hover:text-text-primary"
				}`}
				onClick={() => onRoleChange(Roles.INVESTOR)}
			>
				<RiUserLine className="size-5" />
				<span>Investor</span>
			</button>
			<button
				className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
					selectedRole === Roles.STARTUP
						? "bg-white text-primary shadow-sm"
						: "text-text-secondary hover:text-text-primary"
				}`}
				onClick={() => onRoleChange(Roles.STARTUP)}
			>
				<RiBuilding3Line className="size-5" />
				<span>Startup</span>
			</button>
		</div>
	);
} 