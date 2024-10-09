'use client'

import { useState, useEffect } from 'react'
import {
  Typography,
  Radio,
  Input,
  Button,
  Space,
  Card,
  List,
  Divider,
} from 'antd'
import { WalletOutlined, DollarOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CheckoutPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [paymentMethod, setPaymentMethod] = useState('wallet')
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const { data: cartItems, isLoading } = Api.cartItem.findMany.useQuery({
    where: { userId: user?.id },
    include: { template: true },
  })

  const { mutateAsync: createTransaction } =
    Api.transaction.create.useMutation()
  const { mutateAsync: createPurchaseItem } =
    Api.purchaseItem.create.useMutation()
  const { mutateAsync: deleteCartItem } = Api.cartItem.delete.useMutation()
  const { mutateAsync: updateUser } = Api.user.update.useMutation()

  const subtotal =
    cartItems?.reduce((acc, item) => acc + (item.template?.price || 0), 0) || 0
  const total = subtotal - discount

  useEffect(() => {
    if (promoCode === 'DISCOUNT10') {
      setDiscount(subtotal * 0.1)
    } else {
      setDiscount(0)
    }
  }, [promoCode, subtotal])

  const handleConfirmPurchase = async () => {
    if (!user) {
      enqueueSnackbar('Please log in to complete the purchase', {
        variant: 'error',
      })
      return
    }

    try {
      if (paymentMethod === 'wallet' && (user.walletBalance || 0) < total) {
        enqueueSnackbar('Insufficient wallet balance', { variant: 'error' })
        return
      }

      const transaction = await createTransaction({
        data: {
          amount: total,
          transactionType: 'PURCHASE',
          paymentMethod: paymentMethod.toUpperCase(),
          userId: user.id,
        },
      })

      for (const item of cartItems || []) {
        await createPurchaseItem({
          data: {
            price: item.template?.price || 0,
            transactionId: transaction.id,
            templateId: item.templateId,
          },
        })
        await deleteCartItem({ where: { id: item.id } })
      }

      if (paymentMethod === 'wallet') {
        await updateUser({
          where: { id: user.id },
          data: { walletBalance: (user.walletBalance || 0) - total },
        })
      }

      enqueueSnackbar('Purchase completed successfully', { variant: 'success' })
      router.push('/purchase-confirmation')
    } catch (error) {
      enqueueSnackbar('Error processing purchase', { variant: 'error' })
    }
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Text>Loading...</Text>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Checkout</Title>
        <Card title="Order Summary">
          <List
            dataSource={cartItems}
            renderItem={item => (
              <List.Item>
                <Text>{item.template?.name}</Text>
                <Text>${item.template?.price?.toFixed(2)}</Text>
              </List.Item>
            )}
          />
          <Divider />
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
            <Text>Discount: ${discount.toFixed(2)}</Text>
            <Text strong>Total: ${total.toFixed(2)}</Text>
          </Space>
        </Card>
        <Card title="Payment Method">
          <Radio.Group
            onChange={e => setPaymentMethod(e.target.value)}
            value={paymentMethod}
          >
            <Space direction="vertical">
              <Radio value="wallet">
                <Space>
                  <WalletOutlined />
                  Wallet Balance (${user?.walletBalance?.toFixed(2)})
                </Space>
              </Radio>
              <Radio value="crypto">
                <Space>
                  <DollarOutlined />
                  Cryptocurrency
                </Space>
              </Radio>
            </Space>
          </Radio.Group>
        </Card>
        <Card title="Promo Code">
          <Space>
            <Input
              placeholder="Enter promo code"
              value={promoCode}
              onChange={e => setPromoCode(e.target.value)}
            />
            <Button onClick={() => setPromoCode('')}>Clear</Button>
          </Space>
        </Card>
        <Button
          type="primary"
          size="large"
          onClick={handleConfirmPurchase}
          block
        >
          Confirm Purchase
        </Button>
      </Space>
    </PageLayout>
  )
}
