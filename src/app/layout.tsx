import Link from "next/link";
import "../styles/globals.css";
import { Poppins } from "next/font/google";
import { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Blackjack",
  description:
    "Take up the challenge now and find out if you're lucky at blackjack!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="flex min-h-screen flex-col items-center justify-between bg-[#FEE6DB] py-4 md:py-16">
        <h1 className="text-center text-xl font-extrabold leading-5 text-red-500">
          Black <br />
          Jack
        </h1>

        {children}

        <footer>
          <p className="text-red-500">
            Crafted by{" "}
            <Link
              className="underline"
              href="https://www.maxencewolff.com/"
              target="_blank"
              rel="noreferrer"
            >
              Maxence
            </Link>{" "}
            with ❤️
          </p>
        </footer>
      </body>
    </html>
  );
}
