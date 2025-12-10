'use client'

export default function Footer() {
    return (
        <>
            <footer className="text-gray-600 py-8 text-sm">
                <div className=" flex justify-center container mx-auto px-4">
                    <p>&copy; {new Date().getFullYear()} All rights reserved. Designed by Divijaa</p>
                </div>
            </footer>
        </>
    )
}