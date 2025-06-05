"use client";

import { useState } from "react";
import { Input } from "@/components/Input";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { RiAddLine, RiCloseLine } from "@remixicon/react";

export default function NewCampaignPage() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        goalAmount: "",
        endDate: "",
        tags: [] as string[],
        newTag: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log("Form submitted:", formData);
    };

    const addTag = () => {
        if (formData.newTag && !formData.tags.includes(formData.newTag)) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, prev.newTag],
                newTag: ""
            }));
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    return (
        <>
            <Navbar />
            <div className="max-w-3xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">Launch New Campaign</h1>
                    <p className="text-text-secondary">
                        Fill in the details below to create your fundraising campaign
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                        {/* Campaign Title */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Campaign Title
                            </label>
                            <Input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="Enter a compelling title for your campaign"
                                required
                            />
                        </div>

                        {/* Campaign Description */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Describe your campaign and what you're raising funds for"
                                className="w-full h-32 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                required
                            />
                        </div>

                        {/* Funding Goal */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Funding Goal (ETH)
                            </label>
                            <Input
                                type="number"
                                value={formData.goalAmount}
                                onChange={(e) => setFormData(prev => ({ ...prev, goalAmount: e.target.value }))}
                                placeholder="Enter your funding goal in ETH"
                                min="0.1"
                                step="0.1"
                                required
                            />
                            <p className="mt-1 text-sm text-text-secondary">
                                Minimum goal amount is 0.1 ETH
                            </p>
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Campaign End Date
                            </label>
                            <Input
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Tags
                            </label>
                            <div className="flex gap-2 mb-3 flex-wrap">
                                {formData.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-gray-100 text-text-secondary px-3 py-1 rounded-full text-sm flex items-center gap-1"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="hover:text-red-500"
                                        >
                                            <RiCloseLine className="size-4" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    type="text"
                                    value={formData.newTag}
                                    onChange={(e) => setFormData(prev => ({ ...prev, newTag: e.target.value }))}
                                    placeholder="Add a tag"
                                    className="flex-1"
                                />
                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="px-4 py-2 bg-gray-100 text-text-secondary rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-4 justify-end">
                        <Link
                            href="/startup/dashboard"
                            className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Launch Campaign
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
} 