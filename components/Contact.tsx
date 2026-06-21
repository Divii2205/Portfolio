'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Github, Linkedin, XCircle, CheckCircle } from 'lucide-react'
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
        <section id="contact" className="py-20 md:py-28 px-6 relative flex items-center justify-center">
            <div className="w-full max-w-6xl relative z-10 grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-center">

                {/* LEFT: Typography & Socials */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-10 relative"
                >
                    {/* Status Indicator */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(44,40,36,0.2)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7d3c3c] opacity-60"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7d3c3c]"></span>
                        </span>
                        <span className="font-mono text-[0.7rem] font-medium text-[#6b6358] tracking-[0.18em] uppercase">Available for work</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-extrabold text-[#2c2824] tracking-tight leading-[0.95]">
                        Let&apos;s <span className="text-[#7d3c3c]">connect</span>
                    </h2>

                    <p className="text-[#4a443c] text-lg leading-relaxed max-w-md">
                        Got something to share or want to collaborate? <br/> Would love to hear from you.
                    </p>

                    <div className="flex flex-col gap-5">
                        <h3 className="eyebrow">
                            <span className="tick" />
                            Connect with me
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -2 }}
                                    className="group flex items-center gap-3 px-4 py-2 rounded-full border border-[rgba(44,40,36,0.2)] hover:border-[#7d3c3c] hover:bg-[#7d3c3c] transition-colors duration-300"
                                >
                                    <social.icon size={16} className="text-[#2c2824] group-hover:text-[#f3eee4] transition-colors" />
                                    <span className="font-mono text-xs uppercase tracking-wider text-[#2c2824] group-hover:text-[#f3eee4] transition-colors">{social.label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* RIGHT: Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="relative"
                >
                    <div className="bg-[#e7ddcb]/50 border border-[rgba(44,40,36,0.16)] rounded-xl p-8 md:p-12 relative">
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-10 relative z-10">

                            <div className="space-y-10">
                                <FormInput
                                    id="name"
                                    type="text"
                                    label="What's your name?"
                                    value={formState.name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormState({ ...formState, name: e.target.value })}
                                />
                                <FormInput
                                    id="email"
                                    type="email"
                                    label="What's your email?"
                                    value={formState.email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormState({ ...formState, email: e.target.value })}
                                />
                                <FormInput
                                    id="message"
                                    type="textarea"
                                    label="Your message..."
                                    value={formState.message}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormState({ ...formState, message: e.target.value })}
                                />
                            </div>

                            <div className="pt-2 flex items-center justify-between">
                                <motion.button
                                    type="submit"
                                    disabled={status !== 'idle'}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#7d3c3c] text-[#f3eee4] font-mono text-sm uppercase tracking-wider hover:bg-[#65302f] transition-colors disabled:opacity-70"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {status === 'idle' && (
                                            <>Send Message <Send size={15} /></>
                                        )}
                                        {status === 'submitting' && 'Sending...'}
                                        {status === 'success' && (
                                            <>Sent <CheckCircle size={15} /></>
                                        )}
                                        {status === 'error' && (
                                            <span className='flex items-center gap-2'>Failed <XCircle size={16} /></span>
                                        )}
                                    </span>
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>

            <style jsx global>{`
            input,
            textarea {
                background-color: transparent;
                color: #2c2824;
            }

            input:-webkit-autofill,
            input:-webkit-autofill:hover,
            input:-webkit-autofill:focus,
            textarea:-webkit-autofill,
            textarea:-webkit-autofill:hover,
            textarea:-webkit-autofill:focus {
                -webkit-text-fill-color: #2c2824 !important;
                transition: background-color 9999s ease 0s;
                -webkit-box-shadow: 0 0 0px 1000px #efe9dd inset !important;
                box-shadow: 0 0 0px 1000px #efe9dd inset !important;
                caret-color: #2c2824;
            }
            `}</style>
        </section>
    )
}

// Reusable Input Component for cleanness
function FormInput({ id, type, label, value, onChange }: any) {
    return (
        <div className="relative group">
            {type === 'textarea' ? (
                <textarea
                    id={id}
                    required
                    rows={1}
                    value={value}
                    onChange={onChange}
                    className="w-full bg-transparent border-b border-[rgba(44,40,36,0.2)] py-3 text-lg text-[#2c2824] placeholder-transparent focus:outline-none focus:border-transparent transition-all peer resize-none min-h-[60px] max-h-[150px] overflow-y-auto"
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
                    className="w-full bg-transparent border-b border-[rgba(44,40,36,0.2)] py-3 text-lg text-[#2c2824] placeholder-transparent focus:outline-none focus:border-transparent transition-all peer"
                    placeholder={label}
                />
            )}
            <label
                htmlFor={id}
                className="absolute left-0 -top-3 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[#6b6358] transition-all cursor-text
                           peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-[#877f72]
                           peer-focus:-top-3 peer-focus:text-[0.7rem] peer-focus:uppercase peer-focus:tracking-[0.15em] peer-focus:text-[#7d3c3c]"
            >
                {label}
            </label>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7d3c3c] transition-all duration-500 peer-focus:w-full" />
        </div>
    )
}
