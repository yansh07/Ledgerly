import { LuReceiptIndianRupee } from "react-icons/lu";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 border-t border-gray-800">
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-3xl text-amber-400">
                                <LuReceiptIndianRupee />
                            </span>
                            <span className="text-2xl font-black text-gray-100">Ledgerly</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Making expense tracking less painful and more honest. Your financial chaos deserves better.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="text-gray-100 font-black text-sm mb-6 uppercase tracking-wide">Product</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#features" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#pricing" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#security" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                                    Security
                                </a>
                            </li>
                            <li>
                                <a href="#changelog" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                                    Changelog
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-gray-100 font-black text-sm mb-6 uppercase tracking-wide">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#about" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#blog" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#careers" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-gray-100 font-black text-sm mb-6 uppercase tracking-wide">Legal</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#privacy" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#terms" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#cookies" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                                    Cookie Policy
                                </a>
                            </li>
                            <li>
                                <a href="#legal" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                                    Legal Notice
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-12" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Copyright */}
                    <div className="text-center md:text-left">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} Ledgerly. Crafted with <span className="text-amber-400">★</span> by{" "}
                            <span className="text-amber-400 font-semibold">Priaynshu</span> • All rights reserved.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-6 items-center">
                        <a
                            href="https://github.com/yansh07/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-amber-400 transition-colors text-xl"
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://twitter.com/yansh_08"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-amber-400 transition-colors text-xl"
                            aria-label="Twitter"
                        >
                            <FaSquareXTwitter />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/yansh08/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-amber-400 transition-colors text-xl"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="mailto:pksingh69313@gmail.com"
                            className="text-gray-400 hover:text-amber-400 transition-colors text-xl"
                            aria-label="Email"
                        >
                            <SiGmail />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
