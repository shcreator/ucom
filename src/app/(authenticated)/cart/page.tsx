'use client'

import { Typography, List, Button, Space, Card, Row, Col } from 'antd'
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CartPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const {
    data: cartItems,
    isLoading,
    refetch,
  } = Api.cartItem.findMany.useQuery({
    where: { userId: user?.id },
    include: { template: true },
  })

  const { mutateAsync: removeFromCart } = Api.cartItem.delete.useMutation()

  const handleRemoveFromCart = async (cartItemId: string) => {
    try {
      await removeFromCart({ where: { id: cartItemId } })
      enqueueSnackbar('Item removed from cart', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to remove item from cart', { variant: 'error' })
    }
  }

  const handleProceedToCheckout = () => {
    router.push('/checkout')
  }

  const totalPrice =
    cartItems?.reduce((sum, item) => sum + (item.template?.price || 0), 0) || 0

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Your Cart</Title>
        <Text>Review your selections before purchasing.</Text>

        {isLoading ? (
          <Text>Loading cart items...</Text>
        ) : cartItems && cartItems.length > 0 ? (
          <List
            dataSource={cartItems}
            renderItem={item => (
              <List.Item>
                <Card style={{ width: '100%' }}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Text strong>{item.template?.name}</Text>
                      <br />
                      <Text>${item.template?.price?.toFixed(2)}</Text>
                    </Col>
                    <Col>
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <Text>Your cart is empty.</Text>
        )}

        {cartItems && cartItems.length > 0 && (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card>
              <Row justify="space-between">
                <Col>
                  <Text strong>Total:</Text>
                </Col>
                <Col>
                  <Text strong>${totalPrice.toFixed(2)}</Text>
                </Col>
              </Row>
            </Card>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="large"
              block
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </Button>
          </Space>
        )}
      </Space>
    </PageLayout>
  )
}
