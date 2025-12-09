'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Github, Linkedin, ArrowUpRight, Check } from 'lucide-react'
import emailjs from '@emailjs/browser'

export default function Contact() {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const formRef = React.useRef<HTMLFormElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('submitting')

        if (!formRef.current) return

        const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ''
        const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ''
        const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''

        try {
            const templateParams = {
                title: "Contacting from your Portfolio",
                name: formState.name,
                time: new Date().toLocaleTimeString(),
                message: formState.message,
                email: formState.email,
            }

            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)

            console.log("Email sent successfully")
            setStatus('success')
            setFormState({ name: '', email: '', message: '' })
            setTimeout(() => setStatus('idle'), 4000)
        } catch (error: any) {
            console.error("Failed to send email:", error)
            // Log specific details if available
            if (error.text) console.error("EmailJS Error:", error.text)

            setStatus('error')
            setTimeout(() => setStatus('idle'), 3000)
        }
    }

    const socialLinks = [
        { icon: Linkedin, href: "https://www.linkedin.com/in/divijaa-arjun", label: "LinkedIn" },
        { icon: Mail, href: "mailto:divijaa22am@gmail.com", label: "Email" },
        { icon: Github, href: "https://github.com/Divii2205", label: "GitHub" },
    ]

    return (
        <section id="contact" className="py-24 px-4 relative flex items-center justify-center min-h-screen overflow-hidden">
            {/* Ambient Background - Deep Space Vibe with Grain */}
            <div className="absolute inset-0 bg-[#030303]">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            {/* Animated Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-900/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

            <div className="w-full max-w-6xl relative z-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-center">

                {/* LEFT: Typography & Socials */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-12 relative"
                >
                    {/* Status Indicator */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                        </span>
                        <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">Available for work</span>
                    </div>

                    <div className="relative">
                        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-[0.9]">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f0abfc] via-[#fda4af] to-[#f0abfc]  background-animate">Connect</span>
                        </h2>
                    </div>

                    <p className="text-gray-400 text-lg leading-relaxed max-w-md font-light">
                        Got a question, proposal, or project in mind? <br />
                        I'm all ears. Let's turn your vision into reality.
                    </p>

                    <div className="flex flex-col gap-6">
                        <h3 className="text-sm uppercase tracking-widest text-gray-500 font-semibold">Connect with me</h3>
                        <div className="flex flex-wrap gap-4">
                            {socialLinks.map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group flex items-center gap-3 px-4 py-2 rounded-2xl border border-white/10 hover:border-purple-500/50 bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                                >
                                    <div className="p-2 rounded-lg bg-black/40 text-gray-400 group-hover:text-purple-400 transition-colors">
                                        <social.icon size={15} />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-white font-medium transition-colors">{social.label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* RIGHT: High-End Glass Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="relative"
                >
                    {/* Glowing Backlight for Form */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl transform rotate-3 scale-105 opacity-50" />

                    <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
                        {/* Shimmer effect */}
                        <div className="absolute top-0 right-[-100%] w-[200%] h-full bg-gradient-to-l from-transparent via-white/5 to-transparent skew-x-12 animate-shimmer pointer-events-none" />

                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-10 relative z-10">

                            <div className="space-y-10">
                                <FormInput
                                    id="name"
                                    type="text"
                                    label="What's your name?"
                                    value={formState.name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormState({ ...formState, name: e.target.value })}
                                    focusColor="peer-focus:text-purple-400"
                                    gradientColor="from-purple-500 to-pink-500"
                                />
                                <FormInput
                                    id="email"
                                    type="email"
                                    label="What's your email?"
                                    value={formState.email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormState({ ...formState, email: e.target.value })}
                                    focusColor="peer-focus:text-pink-400"
                                    gradientColor="from-pink-500 to-purple-500"
                                />
                                <FormInput
                                    id="message"
                                    type="textarea"
                                    label="Your message..."
                                    value={formState.message}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormState({ ...formState, message: e.target.value })}
                                    focusColor="peer-focus:text-purple-400"
                                    gradientColor="from-purple-500 to-pink-500"
                                />
                            </div>

                            <div className="pt-4 flex items-center justify-between">
                                <p className="text-xs text-gray-500 font-light hidden sm:block">

                                </p>
                                <motion.button
                                    type="submit"
                                    disabled={status !== 'idle'}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#f5d0fe] to-[#c084fc] text-[#2b0d3b] font-semibold shadow-lg hover:shadow-purple-500/10 transition-transform hover:-translate-y-0.5"

                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {status === 'idle' && (
                                            <>Send Message <Send size={16} /></>
                                        )}
                                        {status === 'submitting' && 'Sending...'}
                                        {status === 'success' && (
                                            <>Sent <Check size={16} /></>
                                        )}
                                        {status === 'error' && (
                                            <span>Failed ❌</span>
                                        )}
                                    </span>
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                .background-animate {
                    background-size: 200%;
                    animation: gradient-shift 5s ease infinite;
                }
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes shimmer {
                    100% { right: 100%; }
                }
                .animate-shimmer {
                    animation: shimmer 8s infinite linear;
                }
                .animate-pulse-slow {
                    animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
            <style jsx global>{`
            input,
            textarea {
                background-color: transparent;
                color: #ffffff;
            }

            input:-webkit-autofill,
            input:-webkit-autofill:hover,
            input:-webkit-autofill:focus,
            textarea:-webkit-autofill,
            textarea:-webkit-autofill:hover,
            textarea:-webkit-autofill:focus {
                -webkit-text-fill-color: #fff !important;
                transition: background-color 9999s ease 0s;
                -webkit-box-shadow: 0 0 0px 1000px rgba(255,255,255,0) inset !important;
                box-shadow: 0 0 0px 1000px rgba(255,255,255,0) inset !important;
                caret-color: #fff;
            }
            `}</style>
        </section>
    )
}

// Reusable Input Component for cleanness
function FormInput({ id, type, label, value, onChange, focusColor, gradientColor }: any) {
    return (
        <div className="relative group">
            {type === 'textarea' ? (
                <textarea
                    id={id}
                    required
                    rows={1}
                    value={value}
                    onChange={onChange}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-lg text-white placeholder-transparent focus:outline-none focus:border-transparent transition-all peer resize-none min-h-[60px] max-h-[150px] overflow-y-auto custom-scrollbar"
                    placeholder={label}
                    onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = target.scrollHeight + 'px';
                    }}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    required
                    value={value}
                    onChange={onChange}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-lg text-white placeholder-transparent focus:outline-none focus:border-transparent transition-all peer"
                    placeholder={label}
                />
            )}
            <label
                htmlFor={id}
                className={`absolute left-0 -top-3 text-sm text-gray-500 transition-all cursor-text
                           peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-600 
                           peer-focus:-top-3 peer-focus:text-sm ${focusColor}`}
            >
                {label}
            </label>
            <div className={`absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r ${gradientColor} transition-all duration-500 peer-focus:w-full`} />
        </div>
    )
}
