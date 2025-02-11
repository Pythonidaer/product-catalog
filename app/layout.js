import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "Product Catalog",
  description: "Created by Jonathan Hammond",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header></Header>
        {children}
      </body>
    </html>
  );
}
