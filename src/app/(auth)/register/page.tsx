"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/Input";
import RoleToggle from "@/components/auth/RoleToggle";
import ConnectWalletButton from "@/components/auth/ConnectWalletButton";
import { RiArrowLeftLine, RiAddLine, RiCloseLine } from "@remixicon/react";
import { useAuth } from "@/contexts/AuthContext";
import { Roles } from "@/types/roles";

const EMPLOYEE_COUNT_OPTIONS = [
	"<10",
	"25+",
	"50+",
	"100+",
	"250+",
	"500+",
	"1000+",
];

export default function RegisterPage() {
	const { register, loading, error } = useAuth();
	const [role, setRole] = useState<Roles>(Roles.INVESTOR);
	const [investorForm, setInvestorForm] = useState({
		name: "",
		nickname: "",
	});
	const [startupForm, setStartupForm] = useState({
		name: "",
		location: "",
		foundedDate: "",
		employeeCount: EMPLOYEE_COUNT_OPTIONS[0],
		website: "",
		bio: "",
		goals: [""],
	});

	const addGoal = () => {
		setStartupForm((prev) => ({
			...prev,
			goals: [...prev.goals, ""],
		}));
	};

	const removeGoal = (index: number) => {
		setStartupForm((prev) => ({
			...prev,
			goals: prev.goals.filter((_, i) => i !== index),
		}));
	};

	const updateGoal = (index: number, value: string) => {
		setStartupForm((prev) => ({
			...prev,
			goals: prev.goals.map((goal, i) => (i === index ? value : goal)),
		}));
	};

	const handleRegister = async () => {
		try {
			if (role === Roles.INVESTOR) {
				await register({
					role,
					investorData: {
						name: investorForm.name,
						nickname: investorForm.nickname,
					},
				});
			} else {
				await register({
					role,
					startupData: {
						name: startupForm.name,
						location: startupForm.location,
						website: startupForm.website,
						bio: startupForm.bio,
						mission: startupForm.goals.filter(goal => goal.trim() !== ""),
					},
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="space-y-6">
			<RoleToggle selectedRole={role} onRoleChange={setRole} />

			<div className="space-y-6">
				<ConnectWalletButton />

				{role === Roles.INVESTOR ? (
					<div className="space-y-4">
						<Input
							label="Full Name"
							placeholder="Enter your full name"
							value={investorForm.name}
							onChange={(e) => setInvestorForm(prev => ({ ...prev, name: e.target.value }))}
							required
						/>
						<Input
							label="Nickname (optional)"
							placeholder="How should we call you?"
							value={investorForm.nickname}
							onChange={(e) => setInvestorForm(prev => ({ ...prev, nickname: e.target.value }))}
						/>
					</div>
				) : (
					<form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
						{/* Required Fields */}
						<div className="space-y-4">
							<Input
								label="Startup Name"
								placeholder="Enter your startup's name"
								value={startupForm.name}
								onChange={(e) =>
									setStartupForm((prev) => ({ ...prev, name: e.target.value }))
								}
								required
							/>
							<Input
								label="Location"
								placeholder="City, Country"
								value={startupForm.location}
								onChange={(e) =>
									setStartupForm((prev) => ({ ...prev, location: e.target.value }))
								}
								required
							/>
							<Input
								type="date"
								label="First Funded Date"
								value={startupForm.foundedDate}
								onChange={(e) =>
									setStartupForm((prev) => ({
										...prev,
										foundedDate: e.target.value,
									}))
								}
								required
							/>
							<div className="space-y-1">
								<label className="block text-sm text-text-secondary">
									Number of Employees
								</label>
								<select
									className="w-full px-4 py-2 rounded-lg border border-text-secondary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
									value={startupForm.employeeCount}
									onChange={(e) =>
										setStartupForm((prev) => ({
											...prev,
											employeeCount: e.target.value,
										}))
									}
									required
								>
									{EMPLOYEE_COUNT_OPTIONS.map((option) => (
										<option key={option} value={option}>
											{option} employees
										</option>
									))}
								</select>
							</div>

							<div className="space-y-2">
								<label className="block text-sm text-text-secondary">
									Mission & Goals
								</label>
								{startupForm.goals.map((goal, index) => (
									<div key={index} className="flex gap-2">
										<Input
											placeholder={`Goal ${index + 1}`}
											value={goal}
											onChange={(e) => updateGoal(index, e.target.value)}
											required
										/>
										{startupForm.goals.length > 1 && (
											<button
												type="button"
												onClick={() => removeGoal(index)}
												className="p-2 text-text-secondary hover:text-red-500 transition-colors"
											>
												<RiCloseLine className="size-5" />
											</button>
										)}
									</div>
								))}
								<button
									type="button"
									onClick={addGoal}
									className="flex items-center gap-1 text-primary hover:text-primary/90 font-medium"
								>
									<RiAddLine className="size-5" />
									Add Goal
								</button>
							</div>

							<div className="space-y-1">
								<label className="block text-sm text-text-secondary">
									About Your Startup
								</label>
								<textarea
									className="w-full px-4 py-2 rounded-lg border border-text-secondary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none min-h-[100px]"
									placeholder="Tell us about your startup..."
									value={startupForm.bio}
									onChange={(e) =>
										setStartupForm((prev) => ({ ...prev, bio: e.target.value }))
									}
									required
								/>
							</div>
						</div>

						{/* Optional Fields */}
						<div className="space-y-4 pt-6 border-t border-text-secondary/20">
							<h3 className="text-sm font-medium text-text-secondary">
								Optional Information
							</h3>
							<Input
								label="Website URL"
								type="url"
								placeholder="https://your-startup.com"
								value={startupForm.website}
								onChange={(e) =>
									setStartupForm((prev) => ({ ...prev, website: e.target.value }))
								}
							/>
							<Input
								label="Company Logo"
								type="file"
								accept="image/*"
								placeholder="Upload Logo"
							/>
							<Input
								label="Legal Documents"
								type="file"
								accept=".pdf,.doc,.docx"
								placeholder="Upload legal papers"
								multiple
							/>
						</div>
					</form>
				)}

				<button
					onClick={handleRegister}
					disabled={loading}
					className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{loading ? "Registering..." : "Register"}
				</button>

				{error && (
					<p className="text-red-500 text-sm text-center">{error}</p>
				)}
			</div>

			<div className="text-center space-y-4">
				<p className="text-text-secondary">
					Already have an account?{" "}
					<Link
						href="/login"
						className="text-primary hover:text-primary/90 font-medium"
					>
						<RiArrowLeftLine className="inline-block mr-1 size-4" />
						Login here
					</Link>
				</p>
			</div>
		</div>
	);
} 