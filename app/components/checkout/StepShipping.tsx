"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";

const shippingSchema = z.object({
    email: z.string().email("Invalid email address"),
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    city: z.string().min(2, "City is required"),
    zipCode: z.string().regex(/^\d{5}$/, "Zip code must be exactly 5 digits"),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

export function StepShipping({ onNext, defaultValues }: { onNext: (data: ShippingFormData) => void, defaultValues: Partial<ShippingFormData> }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ShippingFormData>({
        resolver: zodResolver(shippingSchema),
        defaultValues,
    });

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <h2 className="text-2xl font-serif text-white mb-6">Shipping Information</h2>

            <form onSubmit={handleSubmit(onNext)} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Email Address</label>
                    <input
                        {...register("email")}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00735C] outline-none transition-colors"
                        placeholder="homie@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-1">First Name</label>
                        <input
                            {...register("firstName")}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00735C] outline-none transition-colors"
                        />
                        {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Last Name</label>
                        <input
                            {...register("lastName")}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00735C] outline-none transition-colors"
                        />
                        {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Address</label>
                    <input
                        {...register("address")}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00735C] outline-none transition-colors"
                        placeholder="123 Coffee Lane"
                    />
                    {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-1">City</label>
                        <input
                            {...register("city")}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00735C] outline-none transition-colors"
                        />
                        {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Zip Code</label>
                        <input
                            {...register("zipCode")}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00735C] outline-none transition-colors"
                            placeholder="12345"
                        />
                        {errors.zipCode && <p className="text-red-400 text-xs mt-1">{errors.zipCode.message}</p>}
                    </div>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        className="w-full bg-[#00735C] hover:bg-[#005c49] text-white font-bold py-4 rounded-xl uppercase tracking-widest transition-colors"
                    >
                        Continue to Delivery
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
