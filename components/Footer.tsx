'use client'

export default function Footer() {
    return (
        <footer className="pt-10 pb-28 text-sm">
            <div className="max-w-5xl mx-auto px-6">
                <div className="h-px w-full bg-[rgba(44,40,36,0.14)] mb-6" />
                <p className="text-center font-mono text-xs uppercase tracking-[0.18em] text-[#6b6358]">
                    &copy; {new Date().getFullYear()} All rights reserved. Designed by{' '}
                    <span className="text-[#7d3c3c]">Divijaa</span>
                </p>
            </div>
        </footer>
    )
}
