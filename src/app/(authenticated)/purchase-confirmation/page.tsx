'use client'

import { Typography, Card, List, Button, Space } from 'antd'
import {
  DownloadOutlined,
  CheckCircleOutlined,
  MailOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function PurchaseConfirmationPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: transaction, isLoading } = Api.transaction.findFirst.useQuery({
    where: { id: params.transactionId },
    include: { purchaseItems: { include: { template: true } } },
  })

  const handleDownload = (templateId: string) => {
    // Implement download logic here
    enqueueSnackbar('Download started', { variant: 'success' })
  }

  if (isLoading) {
    return <PageLayout layout="narrow">Loading...</PageLayout>
  }

  if (!transaction) {
    return <PageLayout layout="narrow">Transaction not found</PageLayout>
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>
          <CheckCircleOutlined style={{ color: '#52c41a' }} /> Purchase
          Confirmation
        </Title>
        <Paragraph>
          Thank you for your purchase! Your order details and download links are
          below.
        </Paragraph>

        <Card title="Order Details">
          <Paragraph>
            <Text strong>Transaction ID:</Text> {transaction.id}
          </Paragraph>
          <Paragraph>
            <Text strong>Date:</Text>{' '}
            {dayjs(transaction.dateCreated).format('MMMM D, YYYY h:mm A')}
          </Paragraph>
          <Paragraph>
            <Text strong>Total Amount:</Text> ${transaction.amount?.toFixed(2)}
          </Paragraph>
        </Card>

        <Card title="Purchased Templates">
          <List
            dataSource={transaction.purchaseItems}
            renderItem={item => (
              <List.Item
                actions={[
                  <Button
                    key="download"
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={() => handleDownload(item.templateId)}
                  >
                    Download
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.template?.name}
                  description={`Price: $${item.price?.toFixed(2)}`}
                />
              </List.Item>
            )}
          />
        </Card>

        <Paragraph>
          <MailOutlined /> An email with the download links has been sent to
          your registered email address.
        </Paragraph>

        <Button type="primary" onClick={() => router.push('/my-purchases')}>
          View My Purchases
        </Button>
      </Space>
    </PageLayout>
  )
}
