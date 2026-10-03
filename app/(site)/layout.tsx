import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SearchModal } from '@/components/search-modal'
import { MiniCart } from '@/components/mini-cart'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer />
      <SearchModal />
      <MiniCart />
    </>
  )
}
