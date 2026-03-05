"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        <nav
          className={cn(
            "h-12 flex items-center justify-between px-5 rounded-full transition-all duration-500",
            scrolled
              ? "w-full max-w-3xl premium-glass"
              : "w-full max-w-4xl bg-transparent"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-semibold text-sm tracking-tight text-[#ededed] hover:text-white transition-colors"
          >
            {SITE_CONFIG.name.split(" ")[0]}
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href} className="relative px-3 py-1.5">
                  <Link
                    href={item.href}
                    className={cn(
                      "relative z-10 text-[13px] font-medium transition-colors duration-300",
                      isActive ? "text-[#030303]" : "text-[#888] hover:text-[#ededed]"
                    )}
                  >
                    {item.label}
                  </Link>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-[#c4a482] rounded-full shadow-[0_0_12px_rgba(196,164,130,0.4)]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Contact CTA */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="text-[13px] font-medium text-[#c4a482] hover:text-[#e5cdb4] transition-colors"
            >
              Say hello
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 text-[#888] hover:text-white transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile slide-in drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="drawer-backdrop md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] z-50 premium-glass rounded-l-2xl md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Drawer header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
                  <span className="text-sm font-medium text-white">Menu</span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1.5 text-[#888] hover:text-white transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Nav links */}
                <ul className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                  {NAV_ITEMS.map((item) => {
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "block px-4 py-3 text-sm rounded-xl transition-all",
                            isActive
                              ? "bg-[#c4a482]/10 text-[#c4a482]"
                              : "text-[#888] hover:text-white hover:bg-white/5"
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Contact CTA */}
                <div className="px-4 py-6 border-t border-white/[0.06]">
                  <Link
                    href="/contact"
                    className="block text-center px-4 py-3 text-sm font-medium text-[#030303] bg-[#c4a482] rounded-xl hover:bg-[#d4b896] transition-colors"
                  >
                    Say hello &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
