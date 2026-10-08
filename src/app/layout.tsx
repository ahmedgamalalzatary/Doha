import type { Metadata } from "next";
import { Alexandria, Aref_Ruqaa, Readex_Pro, Reem_Kufi, Tajawal } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const alexandria = Alexandria({ variable: "--font-alexandria", subsets: ["arabic", "latin"], weight: "variable" });
const ruqaa = Aref_Ruqaa({ variable: "--font-ruqaa", subsets: ["arabic", "latin"], weight: ["400", "700"] });
const reemKufi = Reem_Kufi({ variable: "--font-kufi", subsets: ["arabic", "latin"], weight: "variable" });
const readex = Readex_Pro({ variable: "--font-readex", subsets: ["arabic", "latin"], weight: "variable" });
const tajawal = Tajawal({ variable: "--font-tajawal", subsets: ["arabic", "latin"], weight: ["400", "500", "700", "800"] });

export const metadata: Metadata = {
  title: "دوحه موتورز | AUTO DOHA",
  description: "مملكة كسر الزيرو الحقيقي. عربيات زيرو بجد في الفيوم، صيانة توكيل، تقسيط، وبدّل عربيتك.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${alexandria.variable} ${ruqaa.variable} ${reemKufi.variable} ${readex.variable} ${tajawal.variable} antialiased`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
