import './globals.css'
import Header from '@/components/Header/Header'
import { Providers } from '@/contexts/providers'
import SplashSreen from '@/components/animations/splashScreens'
import TopLoaderBar from '@/components/TopLoaderbar'
import { AddCurrentLocation } from '@/repositories/user_repository/clientUserRepository'
import { RequestNotificationService } from '@/repositories/user_repository/notificationRepository'

export const metadata = {
  title: 'Rent Rocks',
  description: 'Rent Rocks',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
        <script
          type="application/javascript"
          crossOrigin="anonymous"
          src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_MID}.js`}
        />
      </head>
      <body>
        <Providers>
            <div>
              <RequestNotificationService />
              <AddCurrentLocation />
              <TopLoaderBar />
              <SplashSreen />
              <Header />
              {children}
            </div>
        </Providers>
      </body>
    </html >

  )
}
