'use client'

import { Typography, List, Card, Button, Space, Modal } from 'antd'
import { DownloadOutlined, FileTextOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function MyPurchasesPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: purchases, isLoading } = Api.transaction.findMany.useQuery({
    where: { userId: user?.id },
    include: { purchaseItems: { include: { template: true } } },
  })

  const handleDownload = (templateUrl: string | undefined) => {
    if (templateUrl) {
      window.open(templateUrl, '_blank')
    } else {
      enqueueSnackbar('Template URL not available', { variant: 'error' })
    }
  }

  const showInvoice = (transaction: any) => {
    Modal.info({
      title: 'Purchase Details',
      content: (
        <div>
          <p>Transaction ID: {transaction.id}</p>
          <p>Date: {dayjs(transaction.dateCreated).format('MMMM D, YYYY')}</p>
          <p>Amount: ${transaction.amount?.toFixed(2)}</p>
          <p>Payment Method: {transaction.paymentMethod}</p>
          <h4>Purchased Items:</h4>
          <ul>
            {transaction.purchaseItems?.map((item: any) => (
              <li key={item.id}>
                {item.template?.name} - ${item.price?.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ),
      width: 500,
    })
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>My Purchases</Title>
      <Text>View and manage all the templates you've purchased.</Text>

      <List
        loading={isLoading}
        dataSource={purchases}
        renderItem={(transaction: any) => (
          <List.Item>
            <Card
              title={`Purchase on ${dayjs(transaction.dateCreated).format('MMMM D, YYYY')}`}
              extra={
                <Button
                  icon={<FileTextOutlined />}
                  onClick={() => showInvoice(transaction)}
                >
                  View Invoice
                </Button>
              }
              style={{ width: '100%' }}
            >
              <List
                dataSource={transaction.purchaseItems}
                renderItem={(item: any) => (
                  <List.Item>
                    <Space direction="vertical">
                      <Text strong>{item.template?.name}</Text>
                      <Text>Price: ${item.price?.toFixed(2)}</Text>
                      <Button
                        icon={<DownloadOutlined />}
                        onClick={() =>
                          handleDownload(item.template?.screenshotsUrl)
                        }
                      >
                        Download Template
                      </Button>
                    </Space>
                  </List.Item>
                )}
              />
            </Card>
          </List.Item>
        )}
      />
    </PageLayout>
  )
}
