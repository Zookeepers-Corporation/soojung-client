"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { UserRole } from "@/types/api"

export default function Header() {
  const { isLoggedIn, user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const isAdmin = isLoggedIn && user?.role === UserRole.ADMIN

  const menuItems = [
    {
      label: "교회소개",
      href: "#intro",
      submenu: [
        { label: "환영인사", href: "/intro/welcome" },
        { label: "교회소식", href: "/intro/news" },
        { label: "성도소식", href: "/intro/members" },
        { label: "섬기는 사람들", href: "/intro/staff" },
        { label: "예배시간", href: "/intro/worship" },
        { label: "오시는길", href: "/intro/location" },
      ],
    },
    {
      label: "새가족안내",
      href: "/intro/new-family",
    },
    {
      label: "말씀과 찬양",
      href: "#sermon",
      submenu: [
        { label: "주일예배", href: "/sermon/sunday" },
        { label: "수요예배", href: "/sermon/wednesday" },
        { label: "금요기도회", href: "/sermon/friday" },
        { label: "새벽기도회", href: "/sermon/dawn" },
      ],
    },
    {
      label: "커뮤니티",
      href: "#community",
      submenu: [
        { label: "게시판", href: "/community/board" },
        { label: "앨범", href: "/community/album" },
        { label: "자료실", href: "/community/resources" },
      ],
    },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar - Auth Links */}
        <div className="hidden md:flex justify-end items-center h-10 border-b border-gray-100">
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Link href="/admin" className="text-gray-600 hover:text-blue-900 text-xs font-medium transition">
                    관리자 페이지
                  </Link>
                )}
                <span className="text-gray-600 text-xs font-medium">{user?.name}님</span>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-blue-900 text-xs font-medium transition"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-blue-900 text-xs font-medium transition">
                  로그인
                </Link>
                <Link href="/signup" className="text-gray-600 hover:text-blue-900 text-xs font-medium transition">
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Main Header */}
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 flex-shrink-0">
            {/* 로고 마크 */}
            <div className="relative w-10 h-10">
              <Image 
                src="/church_mark.svg" 
                alt="포항수정교회 마크" 
                fill
                className="drop-shadow-md object-contain"
              />
            </div>
            
            {/* 교회 이름 */}
            <div className="relative">
              <h1 
                className="text-2xl text-blue-900 tracking-wider relative inline-block"
                style={{ fontFamily: 'KimJeongCheolGothic' }}
              >
                <span className="relative z-10">
                  <span className="font-bold">포항</span>
                  <span style={{ fontWeight: 400 }}>수정</span>
                  <span className="font-bold">교회</span>
                </span>
                <div className="absolute bottom-0 left-0 w-full h-3 bg-blue-200 opacity-30 -z-0"></div>
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation - Right Side */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.submenu ? (
                  <button className="text-gray-700 hover:text-blue-900 transition text-base font-bold">
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-blue-900 transition text-base font-bold"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.submenu && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.label}
                        href={subitem.href}
                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 text-sm border-b border-gray-100 last:border-b-0 first:rounded-t-lg last:rounded-b-lg transition"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {menuItems.map((item) => (
              <div key={item.label}>
                {item.submenu ? (
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition font-bold"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition font-bold"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Mobile Submenu */}
                {openDropdown === item.label && item.submenu && (
                  <div className="pl-4 space-y-1">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.label}
                        href={subitem.href}
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm transition"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Mobile Auth Links */}
            <div className="px-4 py-2 space-y-2 border-t border-gray-200 mt-4 pt-4">
              {isLoggedIn ? (
                <>
                  {isAdmin && (
                    <Link href="/admin" className="block text-gray-700 hover:text-blue-900 text-sm font-medium">
                      관리자 페이지
                    </Link>
                  )}
                  <div className="text-gray-700 text-sm font-medium py-2">{user?.name}님</div>
                  <button
                    onClick={logout}
                    className="block w-full text-left text-gray-700 hover:text-blue-900 text-sm font-medium"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block text-gray-700 hover:text-blue-900 text-sm font-medium">
                    로그인
                  </Link>
                  <Link href="/signup" className="block text-gray-700 hover:text-blue-900 text-sm font-medium">
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
