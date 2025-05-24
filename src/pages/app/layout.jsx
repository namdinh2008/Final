import "bootstrap/dist/css/bootstrap.min.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "JobHive - Find Your Dream Job",
  description: "JobHive helps you find the perfect job matching your skills and preferences",
    generator: 'v0.dev'
}

export default function RootLayout({
  children
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
