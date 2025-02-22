import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { HiHome, HiViewGrid, HiClipboardList, HiChartBar,  HiLogout } from "react-icons/hi";

const navigation = [
    { name: "Home", href: "/", icon: HiHome },
    { name: "Dashboard", href: "/dashboard", icon: HiViewGrid },
    { name: "Post Auctions", href: "/postauctions", icon: HiClipboardList },
    { name: "Live Auctions", href: "/liveAuction", icon: HiClipboardList },
    { name: "Analytics", href: "/analytics", icon: HiChartBar },
    
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div>
            <header className="fixed inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-4 lg:px-8 bg-primary/30  backdrop-blur-md shadow-md">
                    {/* Logo */}
                    <div className="flex font-bold lg:flex-1">
                        <a href="/" className="-m-1.5 p-1.5">
                            <h1 className="text-black text-3xl">Auction</h1>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex lg:gap-x-6">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary"
                            >
                                <item.icon className="size-5" />
                                <span>{item.name}</span>
                            </a>
                        ))}
                    </div>

                    {/* Logout Button (Desktop) */}
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a href="/signIn" className="text-sm font-semibold text-black hover:text-red-600 flex items-center gap-2">
                          
                            Logout <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </nav>

                {/* Mobile Navigation Menu */}
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">Auction</span>
                            </a>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>

                        {/* Mobile Menu Items */}
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="flex items-center gap-2 -mx-3 rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-primary hover:text-white"
                                        >
                                            <item.icon className="size-5" />
                                            <span>{item.name}</span>
                                        </a>
                                    ))}
                                </div>

                                {/* Logout Button (Mobile) */}
                                <div className="py-6">
                                    <a
                                        href="/signIn"
                                        className="flex items-center gap-2 -mx-3 rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-red-600 hover:text-white"
                                    >
                                        <HiLogout className="size-5" />
                                        Logout
                                    </a>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>
        </div>
    );
}
