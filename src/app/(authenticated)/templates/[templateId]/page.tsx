'use client'

import { Typography, Card, Image, Rate, Button, Space, List, Spin } from 'antd'
import { ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function TemplateDetailsPage() {
  const router = useRouter()
  const params = useParams<{ templateId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: template, isLoading } = Api.template.findUnique.useQuery({
    where: { id: params.templateId },
    include: { category: true, reviews: { include: { user: true } } },
  })

  const { mutateAsync: addToCart } = Api.cartItem.create.useMutation()

  const handleAddToCart = async () => {
    if (!user) {
      enqueueSnackbar('Please log in to add items to your cart', {
        variant: 'info',
      })
      return
    }
    try {
      await addToCart({
        data: {
          userId: user.id,
          templateId: template!.id,
        },
      })
      enqueueSnackbar('Template added to cart', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to add template to cart', { variant: 'error' })
    }
  }

  const handleBuyNow = () => {
    if (!user) {
      enqueueSnackbar('Please log in to make a purchase', { variant: 'info' })
      return
    }
    router.push('/checkout')
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!template) {
    return (
      <PageLayout layout="narrow">
        <Title level={2}>Template not found</Title>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Template Details</Title>
      <Paragraph>
        View detailed information about this template and make a purchase
        decision.
      </Paragraph>

      <Card>
        <Image
          src={template.screenshotsUrl || 'https://placeholder.com/800x400'}
          alt={template.name || 'Template screenshot'}
          style={{ width: '100%', maxHeight: 400, objectFit: 'cover' }}
        />
        <Title level={3}>{template.name}</Title>
        <Paragraph>{template.description}</Paragraph>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Text strong>Category: {template.category?.name}</Text>
          <Text strong>Price: ${template.price?.toFixed(2)}</Text>
          <Text strong>Premium: {template.isPremium ? 'Yes' : 'No'}</Text>
          <Text strong>Featured: {template.featured ? 'Yes' : 'No'}</Text>
          <Space>
            <Button icon={<ShoppingCartOutlined />} onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button
              icon={<DollarOutlined />}
              type="primary"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </Space>
        </Space>
      </Card>

      <Title level={3} style={{ marginTop: 24 }}>
        Reviews
      </Title>
      <List
        itemLayout="vertical"
        dataSource={template.reviews}
        renderItem={review => (
          <List.Item>
            <List.Item.Meta
              title={<Rate disabled defaultValue={review.rating || 0} />}
              description={
                <Text>
                  By {review.user?.name} on{' '}
                  {dayjs(review.dateCreated).format('MMMM D, YYYY')}
                </Text>
              }
            />
            <Paragraph>{review.comment}</Paragraph>
          </List.Item>
        )}
      />
    </PageLayout>
  )
}
