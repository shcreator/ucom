import { useUserContext } from '@/core/context'
import { Flex } from 'antd'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Mobilebar } from './components/Mobilebar'
import { Topbar } from './components/Topbar'
import { NavigationItem } from './types'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()
  const params: Record<string, string> = useParams()

  const goTo = (url: string) => {
    router.push(url)
  }

  const items: NavigationItem[] = [
    {
      key: '/home',
      label: 'Home',
      position: 'topbar',

      onClick: () => goTo('/home'),
    },

    {
      key: '/cart',
      label: 'Cart',
      position: 'topbar',

      onClick: () => goTo('/cart'),
    },

    {
      key: '/checkout',
      label: 'Checkout',
      position: 'topbar',

      onClick: () => goTo('/checkout'),
    },

    {
      key: '/purchase-confirmation',
      label: 'Purchase Confirmation',
      position: 'topbar',

      onClick: () => goTo('/purchase-confirmation'),
    },

    {
      key: '/wallet',
      label: 'Wallet',
      position: 'topbar',

      onClick: () => goTo('/wallet'),
    },

    {
      key: '/my-purchases',
      label: 'My Purchases',
      position: 'topbar',

      onClick: () => goTo('/my-purchases'),
    },

    {
      key: '/blog',
      label: 'Blog',
      position: 'topbar',

      onClick: () => goTo('/blog'),
    },

    {
      key: '/search',
      label: 'Search Results',
      position: 'topbar',

      onClick: () => goTo('/search'),
    },
  ]

  const itemsVisible = items
    .filter(item => item.isVisible !== false)
    .map(item => ({
      key: item.key,
      label: item.label,
      position: item.position,
      onClick: item.onClick,
    }))

  const itemsTopbar = itemsVisible.filter(item => item.position === 'topbar')

  const itemsLeftbar = itemsVisible.filter(item => item.position === 'leftbar')

  const itemsLeftbottom = itemsVisible.filter(
    item => item.position === 'leftbar-bottom',
  )

  const itemsMobile = itemsVisible

  let keySelected = pathname

  Object.entries(params).forEach(([key, value]) => {
    keySelected = keySelected.replace(`/${value}`, `/:${key}`)
  })

  return (
    <>
      <Topbar keySelected={keySelected} items={itemsTopbar} />

      <Mobilebar keySelected={keySelected} items={itemsMobile} />

      <Flex flex={1} style={{ overflowY: 'hidden' }}>
        <Leftbar
          keySelected={keySelected}
          items={itemsLeftbar}
          itemsBottom={itemsLeftbottom}
        />

        <Flex flex={1} vertical style={{ overflowY: 'hidden' }}>
          {children}
        </Flex>
      </Flex>
    </>
  )
}
