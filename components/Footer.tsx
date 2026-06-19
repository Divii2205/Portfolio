'use client'

export default function Footer() {
    return (
        <>
            <footer className="text-gray-500 pt-10 pb-28 text-sm">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />
                    <p className="text-center">
                        &copy; {new Date().getFullYear()} All rights reserved. Designed by{' '}
                        <span className="text-gray-300 font-medium">Divijaa</span>
                    </p>
                </div>
            </footer>
        </>
    )
}