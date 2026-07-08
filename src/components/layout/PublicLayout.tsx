import Header from './Header'
import Footer from './Footer'
import GeometricBackground from './GeometricBackground'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GeometricBackground />
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  )
}
