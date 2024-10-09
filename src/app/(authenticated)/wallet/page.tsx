'use client'

import { Typography, Card, Button, Space, Table, Input, Form } from 'antd'
import {
  WalletOutlined,
  ReloadOutlined,
  HistoryOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function WalletPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [topUpAmount, setTopUpAmount] = useState<number | null>(null)

  const { data: walletData, refetch: refetchWallet } =
    Api.user.findUnique.useQuery({
      where: { id: user?.id },
      select: { walletBalance: true },
    })

  const { data: transactions, refetch: refetchTransactions } =
    Api.transaction.findMany.useQuery({
      where: { userId: user?.id },
      orderBy: { dateCreated: 'desc' },
    })

  const { mutateAsync: topUpWallet } = Api.user.update.useMutation()
  const { mutateAsync: createTransaction } =
    Api.transaction.create.useMutation()

  const handleTopUp = async () => {
    if (!topUpAmount || topUpAmount <= 0) {
      enqueueSnackbar('Please enter a valid amount', { variant: 'error' })
      return
    }

    try {
      await topUpWallet({
        where: { id: user?.id },
        data: { walletBalance: { increment: topUpAmount } },
      })

      await createTransaction({
        data: {
          amount: topUpAmount,
          transactionType: 'TOP_UP',
          paymentMethod: 'CRYPTO',
          userId: user?.id,
        },
      })

      enqueueSnackbar('Wallet topped up successfully', { variant: 'success' })
      refetchWallet()
      refetchTransactions()
      setTopUpAmount(null)
    } catch (error) {
      enqueueSnackbar('Failed to top up wallet', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>My Wallet</Title>
        <Card>
          <Space direction="vertical" size="middle">
            <Space align="center">
              <WalletOutlined style={{ fontSize: '24px' }} />
              <Title level={4} style={{ margin: 0 }}>
                Current Balance
              </Title>
            </Space>
            <Text strong style={{ fontSize: '24px' }}>
              ${walletData?.walletBalance.toFixed(2)}
            </Text>
          </Space>
        </Card>

        <Card
          title={
            <Space>
              <ReloadOutlined /> Top Up Wallet
            </Space>
          }
        >
          <Form layout="inline" onFinish={handleTopUp}>
            <Form.Item label="Amount">
              <Input
                type="number"
                prefix="$"
                value={topUpAmount?.toString() || ''}
                onChange={e => setTopUpAmount(parseFloat(e.target.value))}
                style={{ width: '200px' }}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleTopUp}>
                Top Up
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card
          title={
            <Space>
              <HistoryOutlined /> Transaction History
            </Space>
          }
        >
          <Table
            columns={columns}
            dataSource={transactions}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </Space>
    </PageLayout>
  )
}
