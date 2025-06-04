import Image from "next/image";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="min-h-screen bg-bg grid md:grid-cols-2">
			{/* Left side - Auth Form */}
			<div className="w-full px-6 py-12 flex flex-col justify-center items-center">
				<div className="w-full max-w-md space-y-8">
					<div className="text-center mb-8">
                    <div className="w-8 h-8 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">C</span>
                    </div>
						<h1 className="text-2xl font-bold text-text-primary">
							Welcome to CrowdChain
						</h1>
						<p className="text-text-secondary mt-2">
							Decentralized crowdfunding for innovative startups
						</p>
					</div>
					{children}
				</div>
			</div>

			{/* Right side - Image */}
			<div className="hidden md:block relative bg-primary/5">
				<div className="absolute inset-0 flex items-center justify-center p-12">
					<div className="max-w-lg space-y-4 text-center">
						<h2 className="text-3xl font-bold text-primary">
							Empowering Innovation Through Blockchain
						</h2>
						<p className="text-text-secondary">
							Connect with innovative startups and be part of the next big thing in
							technology. Secure, transparent, and decentralized crowdfunding.
						</p>
					</div>
				</div>
			</div>
		</main>
	);
} 