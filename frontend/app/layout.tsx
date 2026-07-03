import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { Inter } from "next/font/google"
import { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Box, CssBaseline, NoSsr, Toolbar } from '@mui/material';
import SideBarNav from '@/components/SideBarNav';
import Header from '@/components/Header';
import Providers from './providers';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  "authors": { name: "Dayo Adebanjo", url: "https://dayo.dev" },
  "manifest": "/site.webmanifest",
  "title": "DevUtils",
  "description": "A Swiss army knife for developers",
}

export const viewport: Viewport = {
  "width": "device-width",
  'initialScale': 1,
  'viewportFit': "cover",
}

export default function RootLayout(props: any) {
  const { children } = props;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme} >
            <InitColorSchemeScript attribute="class" />
            <CssBaseline />
            <Providers>
              <Header />
              <main>
                <Box sx={{ display: 'flex' }}>
                  <NoSsr>
                  <SideBarNav />
                  </NoSsr>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    minHeight: '100vh'
                  }}>
                    <Toolbar />
                    <Box sx={{ flexGrow: 1 }}>
                        {children}
                    </Box>
                  </Box>
                </Box>
              </main>
            </Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
        <Analytics />
      </body>
    </html>
  );
}
