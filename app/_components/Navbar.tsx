import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="flex items-center justify-center w-full bg-white p-4 shadow-md">
            <div className="container">
                <Link href="/" className="flex flex-row items-center gap-3">
                    <Image src="/logo.svg" alt="Logo" width={40} height={40} />
                    <span className="font-bold text-lg">Países do mundo</span>
                </Link>
            </div>
        </nav>
    )
}
