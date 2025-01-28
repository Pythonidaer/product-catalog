import "./globals.css";

export const metadata = {
  title: "Product Catalog",
  description: "Created by Jonathan Hammond",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
